<script setup lang="ts">
import { ref } from 'vue'
import HamburgerNav from '../components/HamburgerButton.vue'
import ScheduleCalendar from '../components/student/ScheduleCalendar.vue'
import DailySchedule from '../components/student/DailySchedule.vue'

const selectedDate = ref<Date | null>(null)

// Handle date selection with toggle behavior
const handleDateSelect = (date: Date) => {
  // If the same date is clicked, toggle off (hide DailySchedule)
  if (selectedDate.value && 
      selectedDate.value.getFullYear() === date.getFullYear() &&
      selectedDate.value.getMonth() === date.getMonth() &&
      selectedDate.value.getDate() === date.getDate()) {
    selectedDate.value = null
  } else {
    // Otherwise, switch to the new date
    selectedDate.value = date
  }
}

// Handle closing the daily schedule
const closeSchedule = () => {
  selectedDate.value = null
}
</script>

<template>
  <!-- 導覽列區塊 -->
  <HamburgerNav />

  <!-- 時間預約時段區塊 -->
  <section class="main-content schedule-section">
    <div id="BannerWrapper">
      <h1 class="title">預約時段</h1>
    </div>
    <ScheduleCalendar @select-date="handleDateSelect" />
    <DailySchedule v-if="selectedDate" :date="selectedDate" @close="closeSchedule" />
  </section>
</template>

<style scoped>
.nav-links {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #004d4d;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #00ffff;
}

.main-content {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

/* 時間預約時段樣式 */
.schedule-section {
  background-color: #0e2a38;
  min-height: calc(50vh - 35px);
}

#BannerWrapper {
  height: 70px;
  border-radius: 12px;
  background-color: #008080;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px;
  width: calc(100% - 20px);
}

.title {
  font-weight: bold;
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
}
</style>

