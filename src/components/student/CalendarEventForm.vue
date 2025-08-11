<script setup lang="ts">
import { reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue'
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
      const pad = (n: number) => n.toString().padStart(2, '0')
      form.start_local = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
      form.end_local = ''
    }
  }
)

const onSubmit = async () => {
  if (!auth.token) {
    Swal.fire({
      title: '請先登入',
      text: '需要 JWT 才能新增事件',
      icon: 'warning',
      buttonsStyling: false,
      customClass: {
        popup: 'sw-popup',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      }
    })
    return
  }
  if (!form.title || !form.student_name || !form.place || !form.start_local) {
    Swal.fire({
      title: '欄位不可空白',
      text: '請至少填標題、學生、地點與開始時間',
      icon: 'info',
      buttonsStyling: false,
      customClass: {
        popup: 'sw-popup',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      }
    })
    return
  }

  const payload = {
    title: form.title.trim(),
    student_name: form.student_name.trim(),
    place: form.place.trim(),
    description: form.description.trim() || undefined,
    event_type: form.event_type.trim() || undefined,
    datetime: toIsoPlus8(form.start_local),
    end_datetime: form.end_local ? toIsoPlus8(form.end_local) : undefined,
  }

  try {
    loading.value = true
    const r = await calendar.createEvent(payload as any)
    if (!r.success) throw new Error(r.message)
    await Swal.fire({
      title: '新增成功',
      text: '事件已建立',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        popup: 'sw-popup',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      }
    })
    emit('created')
    emit('update:open', false)
  } catch (e: any) {
    Swal.fire({
      title: '新增失敗',
      text: e?.message ?? 'Unknown error',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        popup: 'sw-popup',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      }
    })
  } finally {
    loading.value = false
  }
}

const onClose = () => emit('update:open', false)

/* 只在 open 時允許 Esc 關閉 */
function handleEsc(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') onClose()
}
onMounted(() => window.addEventListener('keydown', handleEsc))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEsc))
</script>

<template>
  <teleport to="body">
    <!-- 移除 @click.self：避免誤觸背景關閉 -->
    <div v-if="open" class="modal-backdrop">
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
/* ==== Modal Backdrop ==== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  display: grid;
  place-items: center;
  z-index: 1000;
  overflow: auto; /* 小螢幕可內捲 */
}

/* ==== Modal Card ==== */
.modal-card {
  width: min(680px, 92vw);
  max-height: 92dvh;
  background: #243447;
  color: #f1f5f9;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
  overflow: hidden;
}

/* ==== Header / Footer ==== */
.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .9rem 1rem;
  background: #2d3e50; 
}

/* ==== Body ==== */
.modal-body {
  padding: 1rem;
}

.row {
  display: grid;
  gap: .4rem;
  margin-bottom: .75rem;
}

label {
  font-size: 1rem;
}

/* ==== Input & Textarea ==== */
input,
textarea {
  padding: .6rem .75rem;
  border-radius: 10px;
  border: 1px solid #4b5d73;
  background: #36485a;
  color: #f1f5f9;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #4dd0e1;
}

/* ==== Buttons ==== */
.icon-btn {
  background: transparent;
  border: 0;
  color: #f1f5f9;
  font-size: 1.1rem;
  cursor: pointer;
}

.btn {
  padding: .6rem .9rem;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

.btn-primary {
  background: #4dd0e1;
  color: #002b36;
}

.btn-secondary {
  background: #55697e; 
  color: #f1f5f9;
}

.btn[disabled] {
  opacity: .7;
  cursor: not-allowed;
}

/* ==== 小螢幕 RWD（≤ 480px）==== */
@media (max-width: 480px) {
  .modal-backdrop {
    padding: 0 env(safe-area-inset-right) max(12px, env(safe-area-inset-bottom)) env(safe-area-inset-left);
  }

  .modal-card {
    width: 100%;
    max-width: none;
    height: auto;
    max-height: 92dvh;
    margin: 0;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  .modal-header, .modal-footer {
    padding: .7rem .8rem;
  }

  .modal-header h3 {
    font-size: clamp(1rem, 4vw, 1.1rem);
  }

  .modal-body {
    padding: .8rem;
    overflow: auto;
  }

  .row {
    gap: .35rem;
    margin-bottom: .6rem;
  }

  label {
    font-size: .9rem;
    opacity: .9;
  }

  input, textarea {
    font-size: 16px; /* 避免 iOS 放大 */
    padding: .6rem .7rem;
  }

  input[type="datetime-local"] {
    min-width: 0;
  }

  .modal-footer {
    flex-direction: column;
    gap: .5rem;
  }

  .btn {
    width: 100%;
  }
}

/* ==== 超小螢幕（≤ 360px）==== */
@media (max-width: 360px) {
  .modal-card { border-radius: 10px; }
  .modal-header, .modal-footer { padding: .6rem .7rem; }
  .modal-body { padding: .7rem; }
  input, textarea { padding: .55rem .65rem; }
}

/* ==== 低高度（例如橫向手機）==== */
@media (max-height: 540px) {
  .modal-card {
    max-height: 92dvh;
    display: flex;
    flex-direction: column;
  }
  .modal-body {
    overflow: auto;
  }
}
</style>

<!-- Swal 樣式不要 scoped：採用同一組較淺深色系 -->
<style>
.sw-popup {
  background: #243447;
  color: #f1f5f9;
  border-radius: 16px;
  border: 1px solid #4b5d73;
}
.sw-popup .swal2-title {
  color: #f1f5f9;
}
.sw-popup .swal2-html-container {
  color: #d0d6dc;
}

/* iOS 安全區支援 */
@supports (padding: max(0px)) {
  .modal-backdrop {
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
}

/* 減少動畫（偏好減少動畫的使用者） */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
</style>

