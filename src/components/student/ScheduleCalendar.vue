<script setup lang="ts">
import { ref, computed } from 'vue'

// 今天的日期
const today: Date = new Date()
const currentDate = ref<Date>(new Date())

// 年與月
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

// 星期名稱
const weekDays: string[] = ['日', '一', '二', '三', '四', '五', '六']

// 每月日期格子陣列（含 null 占位）
const daysInMonth = computed<(Date | null)[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: (Date | null)[] = []

  // 加入空格（第一天前的占位）
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }

  // 加入每一天
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  return days
})

// 判斷是否為今天
const isToday = (day: Date | null): boolean => {
  if (!day) return false
  return (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  )
}

// 上一個月
const prevMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

// 下一個月
const nextMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

// 點選日期
const selectDate = (day: Date) => {
  alert(`Day：${day.toLocaleDateString()}`)
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
        <span v-if="day">{{ day.getDate() }}</span>
        <span v-else>&nbsp;</span>
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
  height: 70px;
  text-align: center;
  line-height: 70px;
  background-color: #eaf4f4;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;
  color: #333;
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
    height: 50px;
    line-height: 50px;
    font-size: 0.9rem;
  }

  .day-name {
    font-size: 0.9rem;
  }
}
</style>

