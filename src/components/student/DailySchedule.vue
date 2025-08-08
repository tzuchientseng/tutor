<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useCalendarStore } from '../../stores/calendarStore'

const props = defineProps<{
  date: Date
}>()

const calendarStore = useCalendarStore()

// 格式化日期
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 使用 computed 確保響應式更新
// const events = computed(() => calendarStore.getEventByDate(formatDate(props.date)))
const events = computed(() => {
  return calendarStore
    .getEventByDate(formatDate(props.date))
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
})

// 格式化時間（確保能處理 null）
const formatTime = (datetime?: string | null): string => {
  if (!datetime) return ''
  return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const emit = defineEmits(['close'])
</script>

<template>
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>{{ formatDate(date) }} 行程</h2>
      <button class="close-button" @click="$emit('close')">✕</button>
    </div>
    <div class="schedule-content">
      <div v-if="calendarStore.loading" class="loading">載入中...</div>
      <div v-else-if="events.length === 0" class="no-events">該日無行程</div>
      <ul v-else class="event-list">
        <li v-for="(event, index) in events" :key="index" class="event-item">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.loading {
  color: #555;
  text-align: center;
  font-size: 1rem;
}

.schedule-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  width: calc(100% - 20px);
  margin: 1rem 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.schedule-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-button {
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #006666;
}

.schedule-content {
  max-height: 300px;
  overflow-y: auto;
}

.no-events {
  color: #555;
  text-align: center;
  font-size: 1rem;
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.event-main {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #008080;
}

.event-title {
  color: #333;
}

.event-extra {
  display: flex;
  gap: 10px;
  font-size: 0.85rem;
  color: #666;
  margin-top: 2px;
}

.event-description {
  font-size: 0.85rem;
  color: #444;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .schedule-container {
    padding: 1rem;
    margin: 0.5rem 7px;
  }

  .schedule-header h2 {
    font-size: 1.2rem;
  }

  .event-item {
    font-size: 0.9rem;
  }
}
</style>

