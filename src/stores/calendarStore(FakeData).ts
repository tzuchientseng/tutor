import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface CalendarEvent {
  title: string
  student_name: string
  datetime: string // 格式為 "YYYY-MM-DDTHH:mm:ss+08:00"
  description?: string
  place: string
}

export const useCalendarStore = defineStore('calendar', () => {
  const events = ref<CalendarEvent[]>([])

  /** 工具：格式化日期為 YYYY-MM-DD（本地時區） */
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  }

  /** 取得指定日期的活動（根據本地時間） */
  const getEventByDate = (date: string): CalendarEvent[] => {
    return events.value.filter(e => {
      const d = new Date(e.datetime)
      return formatDate(d) === date
    })
  }

  /** 假資料載入（未來可改為 API 載入） */
  const loadEvents = async () => {
    events.value = [
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-06T13:00:00+08:00',
        description: 'Worked 6 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-12T13:00:00+08:00',
        description: 'Worked 5 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-13T13:00:00+08:00',
        description: 'Worked 6 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-16T14:00:00+08:00',
        description: 'Worked 7.5 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-19T11:00:00+08:00',
        description: 'Worked 6 hours',
        place: 'Office'
      },
      {
        title: 'Math Lesson',
        student_name: 'Sunny',
        datetime: '2025-08-20T14:00:00+08:00',
        description: 'Chapter 5',
        place: 'Room A'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-20T13:00:00+08:00',
        description: 'Worked 6 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-23T14:00:00+08:00',
        description: 'Worked 7.5 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-26T13:00:00+08:00',
        description: 'Worked 5 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-27T13:00:00+08:00',
        description: 'Worked 6 hours',
        place: 'Office'
      },
      {
        title: 'Work Shift',
        student_name: 'Sunny',
        datetime: '2025-08-30T14:00:00+08:00',
        description: 'Worked 7.5 hours',
        place: 'Office'
      }
    ]
  }

  return {
    events,
    getEventByDate,
    loadEvents
  }
})

