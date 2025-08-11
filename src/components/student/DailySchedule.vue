<script setup lang="ts">
import { computed, ref } from 'vue'
import CalendarEventForm from './CalendarEventForm.vue'
import { useCalendarStore } from '../../stores/calendarStore'
import { useAuthStore } from '../../stores/authStore'

const props = defineProps<{ date: Date }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const calendarStore = useCalendarStore()
const auth = useAuthStore()

const showForm = ref(false)

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

const events = computed(() =>
  calendarStore
    .getEventByDate(formatDate(props.date))
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
)

const formatTime = (datetime?: string | null): string =>
  !datetime ? '' : new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const onAdd = () => {
  if (!auth.isAuthenticated) { alert('請先登入'); return }
  showForm.value = true
}

const onDelete = async (id: number) => {
  const r = await calendarStore.deleteEvent(id)
  if (!r.success) alert(`刪除失敗：${r.message}（注意：只有超級用戶可刪除）`)
}

const onImport = async () => {
  const r = await calendarStore.importWorkhours()
  alert(r.success ? r.message : `匯入失敗：${r.message}（注意：只有超級用戶可觸發）`)
}

const handleCreated = async () => {
  await calendarStore.loadEvents()
}
</script>

<template>
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>{{ formatDate(date) }} 行程</h2>

      <div class="actions" v-if="auth.isAuthenticated">
        <button class="btn btn-primary" @click="onAdd">＋ 新增</button>
        <button v-if="auth.isSuperuser" class="btn btn-secondary" @click="onImport">⇪ 匯入工時</button>
      </div>

      <button class="close-button" @click="emit('close')">✕</button>
    </div>

    <div class="schedule-content">
      <div v-if="calendarStore.loading" class="loading">載入中...</div>
      <div v-else-if="events.length === 0" class="no-events">該日無行程</div>

      <ul v-else class="event-list">
        <li v-for="event in events" :key="event.id" class="event-item">
          <div class="event-main">
            <span class="event-time">
              {{ formatTime(event.datetime) }}
              <template v-if="event.end_datetime"> - {{ formatTime(event.end_datetime) }}</template>
            </span>
            <span class="event-title">📘 {{ event.title }}</span>
          </div>

          <div class="event-extra">
            <span v-if="event.place" class="event-place">📍 {{ event.place }}</span>
            <span v-if="event.student_name" class="event-student">👤 {{ event.student_name }}</span>
            <span v-if="event.event_type" class="event-type">#{{ event.event_type }}</span>
          </div>

          <p v-if="event.description" class="event-description">{{ event.description }}</p>

          <div v-if="auth.isSuperuser" class="event-actions">
            <button class="btn btn-danger btn-sm" @click="onDelete(event.id)">刪除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Modal -->
  <CalendarEventForm
    v-model:open="showForm"
    :defaultDate="date"
    @created="handleCreated"
  />
</template>

<style scoped>
.loading { color: #555; text-align: center; font-size: 1rem; }
.schedule-container { background-color: #ffffff; border-radius: 10px; padding: 1.5rem; width: calc(100% - 20px); margin: 1rem 7px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
.schedule-header { display: flex; align-items: center; margin-bottom: 1rem; gap: 10px; }
.schedule-header h2 { margin: 0; font-size: 1.5rem; color: #333; flex: 1; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.close-button { background-color: #008080; color: #fff; border: none; border-radius: 5px; padding: 0.3rem 0.6rem; font-size: 1rem; cursor: pointer; transition: background-color 0.3s ease; }
.close-button:hover { background-color: #006666; }
.schedule-content { max-height: 300px; overflow-y: auto; }
.no-events { color: #555; text-align: center; font-size: 1rem; }
.event-list { list-style: none; padding: 0; margin: 0; }
.event-item { padding: 0.5rem 0; border-bottom: 1px solid #eee; }
.event-main { display: flex; justify-content: space-between; font-weight: bold; color: #008080; }
.event-title { color: #333; }
.event-extra { display: flex; gap: 10px; font-size: 0.85rem; color: #666; margin-top: 2px; flex-wrap: wrap; }
.event-description { font-size: 0.85rem; color: #444; margin-top: 4px; }
.event-actions { margin-top: 6px; }
.btn { display: inline-block; padding: 0.4rem 0.8rem; border: none; border-radius: 5px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: background-color 0.25s ease, transform 0.1s ease, opacity 0.2s ease; user-select: none; }
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); opacity: 0.9; }
.btn-sm { padding: 0.25rem 0.6rem; font-size: 0.85rem; }
.btn-primary { background-color: #008080; color: #fff; }
.btn-primary:hover { background-color: #006666; }
.btn-secondary { background-color: #f0ad4e; color: #fff; }
.btn-secondary:hover { background-color: #ec971f; }
.btn-danger { background-color: #d9534f; color: #fff; }
.btn-danger:hover { background-color: #c9302c; }
@media (max-width: 768px) {
  .schedule-container { padding: 1rem; margin: 0.5rem 7px; }
  .schedule-header h2 { font-size: 1.2rem; }
  .event-item { font-size: 0.9rem; }
  .btn { padding: 0.3rem 0.6rem; font-size: 0.85rem; }
}
</style>

