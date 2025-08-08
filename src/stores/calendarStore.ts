import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore.ts'

// const API_URL = 'https://home.sunnytseng.com/api/tutor/calendar/' // 部署時用
// const IMPORT_URL = 'https://home.sunnytseng.com/api/tutor/import-workhours/' // 部署時用
const API_URL = 'api/tutor/calendar/'
const IMPORT_URL = 'api/tutor/import-workhours/'

export interface CalendarEvent {
  id: number
  user_id: number | null
  student_name: string
  datetime: string
  end_datetime?: string | null
  description?: string
  place: string
  title: string
  event_type?: string
  is_auto?: boolean
  created_at: string
}

export const useCalendarStore = defineStore('calendar', () => {
  const events = ref<CalendarEvent[]>([])
  const loading = ref(false)
  const auth = useAuthStore()

  // ✅ 這個函式專門產生穩定的 Headers（避免 union 展開）
  const buildHeaders = (additional: Record<string, string> = {}): HeadersInit => {
    const headers: Record<string, string> = { ...additional }
    if (auth.token) headers['Authorization'] = `Bearer ${auth.token}`
    return headers
  }

  const formatDate = (date: Date): string =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  const getEventByDate = (date: string): CalendarEvent[] =>
    events.value.filter(e => formatDate(new Date(e.datetime)) === date)

  const loadEvents = async () => {
    loading.value = true
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to load event data')
      const data = await response.json()
      events.value = data as CalendarEvent[]
    } catch (error) {
      console.error('An error occurred while loading calendar events:', error)
    } finally {
      loading.value = false
    }
  }

  // ===== 下面這些都需要權限（目前後端：只有 superuser 才能成功） =====
  const createEvent = async (payload: Partial<CalendarEvent>) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: buildHeaders({ 'Content-Type': 'application/json' }), // ✅ 修正
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || 'Create failed')
      }
      const created = await res.json()
      events.value.unshift(created)
      return { success: true, data: created }
    } catch (e:any) {
      return { success: false, message: e?.message || 'Create failed' }
    }
  }

  const deleteEvent = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: buildHeaders(), // ✅ 修正
      })
      if (!res.ok && res.status !== 204) {
        const msg = await res.text()
        throw new Error(msg || 'Delete failed')
      }
      events.value = events.value.filter(e => e.id !== id)
      return { success: true }
    } catch (e:any) {
      return { success: false, message: e?.message || 'Delete failed' }
    }
  }

  const importWorkhours = async () => {
    try {
      const res = await fetch(IMPORT_URL, {
        method: 'POST',
        headers: buildHeaders(), // ✅ 修正
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || data?.message || 'Import failed')
      await loadEvents()
      return { success: true, message: data?.message || 'Imported' }
    } catch (e:any) {
      return { success: false, message: e?.message || 'Import failed' }
    }
  }

  return { events, loading, getEventByDate, loadEvents, createEvent, deleteEvent, importWorkhours }
})

