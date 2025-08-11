<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'

const props = defineProps<{ open: boolean; defaultDate?: Date }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void; (e: 'created'): void }>()

const auth = useAuthStore()
const calendar = useCalendarStore()
const loading = ref(false)

const toIsoPlus8 = (local: string) => {
  if (!local) return ''
  const s = local.length === 16 ? `${local}:00` : local
  return `${s}+08:00`
}

const form = reactive({
  title: '',
  student_name: '',
  place: '',
  description: '',
  event_type: '',
  start_local: '',
  end_local: '',
})

watch(
  () => props.open,
  (v) => {
    if (!v) return
    form.student_name = auth.getUserName || ''
    form.place = 'Office'
    form.title = 'Custom Event'
    form.event_type = 'custom'
    if (props.defaultDate) {
      const d = new Date(props.defaultDate)
      d.setHours(9, 0, 0, 0)
      const pad = (n:number)=>n.toString().padStart(2,'0')
      form.start_local = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
      form.end_local = ''
    }
  }
)

const onSubmit = async () => {
  if (!auth.token) { Swal.fire('請先登入','需要 JWT 才能新增事件','warning'); return }
  if (!form.title || !form.student_name || !form.place || !form.start_local) {
    Swal.fire('欄位不可空白','請至少填標題、學生、地點與開始時間','info'); return
  }

  const payload = {
    title: form.title.trim(),
    student_name: form.student_name.trim(),
    place: form.place.trim(),
    description: form.description.trim() || undefined,
    event_type: form.event_type.trim() || undefined,
    datetime: toIsoPlus8(form.start_local),
    end_datetime: form.end_local ? toIsoPlus8(form.end_local) : undefined,
    // ❌ 不要帶 user_id，後端會用 request.user
  }

  try {
    loading.value = true
    const r = await calendar.createEvent(payload as any)
    if (!r.success) throw new Error(r.message)
    await Swal.fire('新增成功','事件已建立','success')
    emit('created')
    emit('update:open', false)
  } catch (e:any) {
    Swal.fire('新增失敗', e?.message ?? 'Unknown error', 'error')
  } finally {
    loading.value = false
  }
}

const onClose = () => emit('update:open', false)
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="modal-backdrop" @click.self="onClose">
      <div class="modal-card" role="dialog" aria-modal="true">
        <header class="modal-header">
          <h3>新增行事曆事件</h3>
          <button class="icon-btn" @click="onClose" aria-label="Close">✕</button>
        </header>

        <div class="modal-body">
          <div class="row">
            <label>標題</label>
            <input v-model="form.title" placeholder="標題" required />
          </div>
          <div class="row">
            <label>學生姓名</label>
            <input v-model="form.student_name" placeholder="學生姓名" required />
          </div>
          <div class="row">
            <label>開始時間</label>
            <input v-model="form.start_local" type="datetime-local" required />
          </div>
          <div class="row">
            <label>結束時間（可選）</label>
            <input v-model="form.end_local" type="datetime-local" />
          </div>
          <div class="row">
            <label>地點</label>
            <input v-model="form.place" placeholder="地點" required />
          </div>
          <div class="row">
            <label>類型（可選）</label>
            <input v-model="form.event_type" placeholder="custom / lesson / ..." />
          </div>
          <div class="row">
            <label>備註（可選）</label>
            <textarea v-model="form.description" rows="3" placeholder="備註"></textarea>
          </div>
        </div>

        <footer class="modal-footer">
          <button class="btn btn-secondary" @click="onClose">取消</button>
          <button class="btn btn-primary" :disabled="loading" @click="onSubmit">
            {{ loading ? '送出中…' : '新增事件' }}
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-backdrop{ position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; z-index: 1000; }
.modal-card{ width: min(680px, 92vw); background: #0d1b2a; color: #e0e1dd; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.3); overflow: hidden; }
.modal-header, .modal-footer{ display: flex; align-items: center; justify-content: space-between; padding: .9rem 1rem; background: #0b1320; }
.modal-body{ padding: 1rem; }
.row{ display: grid; gap: .4rem; margin-bottom: .75rem; }
input, textarea{ padding: .6rem .75rem; border-radius: 10px; border: 1px solid #1b263b; background: #1b263b; color: #e0e1dd; outline: none; }
input:focus, textarea:focus{ border-color: #36cfc9; }
.icon-btn{ background: transparent; border: 0; color: #e0e1dd; font-size: 1.1rem; cursor: pointer; }
.btn{ padding: .6rem .9rem; border:0; border-radius: 10px; cursor: pointer; font-weight: 700; }
.btn-primary{ background:#36cfc9; color:#002b36; }
.btn-secondary{ background:#334155; color:#e2e8f0; }
.btn[disabled]{ opacity:.7; cursor:not-allowed; }
</style>

