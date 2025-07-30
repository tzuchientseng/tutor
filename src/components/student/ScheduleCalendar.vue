<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCalendarStore } from '../../stores/CalendarStore'

const calendarStore = useCalendarStore()

onMounted(() => {
  calendarStore.loadEvents()
})

const today: Date = new Date()
const currentDate = ref<Date>(new Date())

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const weekDays: string[] = ['日', '一', '二', '三', '四', '五', '六']

// 工具函式：將 Date 格式化為 YYYY-MM-DD
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 取得當月所有日期（含空格）
const daysInMonth = computed<(Date | null)[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days: (Date | null)[] = []

  for (let i = 0; i < firstDay.getDay(); i++) days.push(null)
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  return days
})

const isToday = (day: Date | null): boolean => {
  if (!day) return false
  return (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  )
}

// 判斷該天是否有事件
const hasEvent = (day: Date | null): boolean => {
  if (!day) return false
  const dateStr = formatDate(day)
  return calendarStore.getEventByDate(dateStr).length > 0
}

// 上個月
const prevMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

// 下個月
const nextMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

// 點選日期時的事件彈窗
const selectDate = (day: Date) => {
  const dateStr = formatDate(day)
  const events = calendarStore.getEventByDate(dateStr)
  if (events.length === 0) {
    alert(`${dateStr} 沒有排定事件`)
  } else {
    const message = events
      .map(e => {
        const time = new Date(e.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        return `📘 ${e.title} @ ${time}`
      })
      .join('\n')
    alert(`${dateStr} 有 ${events.length} 筆事件：\n${message}`)
  }
}
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="prevMonth">‹</button>
      <h2>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</h2>
      <button @click="nextMonth">›</button>
    </div>

    <div class="calendar-grid">
      <div class="day-name" v-for="day in weekDays" :key="day">{{ day }}</div>

      <div
        class="day-cell"
        v-for="(day, index) in daysInMonth"
        :key="index"
        :class="{ today: isToday(day) }"
        @click="day && selectDate(day)"
      >
        <div v-if="day">
          <div>{{ day.getDate() }}</div>
          <div v-if="hasEvent(day)">☑️</div>
        </div>
        <div v-else>&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow-x: auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.calendar-header button {
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calendar-header button:hover {
  background-color: #006666;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.day-name {
  font-weight: bold;
  text-align: center;
  color: #555;
  padding: 0.5rem 0;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.day-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #eaf4f4;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;
  color: #333;
  padding: 4px 0;
}

.day-cell div {
  line-height: 1.2;
}

.day-cell:hover {
  background-color: #d0eeee;
}

.day-cell.today {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 0 2px #388e3c inset;
}

/* RWD（手機版） */
@media (max-width: 768px) {
  .calendar-header h2 {
    font-size: 1.2rem;
  }

  .calendar-header button {
    font-size: 1rem;
    padding: 0.3rem 0.6rem;
  }

  .day-cell {
    height: 40px;
    font-size: 0.7rem;
  }

  .day-name {
    font-size: 0.9rem;
  }
}
</style>

