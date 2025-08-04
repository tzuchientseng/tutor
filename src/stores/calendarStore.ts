import { ref } from 'vue'
import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/tutor/calendar/' // `npm run deploy`
const API_URL = 'api/tutor/calendar/'

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

  /** 從 API 載入事件資料 */
  const loadEvents = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to load event data')

      const data = await response.json()
      events.value = data as CalendarEvent[]
    } catch (error) {
      console.error('An error occurred while loading calendar events:', error)
    }
  }

  return {
    events,
    getEventByDate,
    loadEvents
  }
})

