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

  const buildHeaders = (additional: Record<string, string> = {}): HeadersInit => {
    const headers: Record<string, string> = { Accept: 'application/json', ...additional }
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
      const res = await fetch(API_URL, { method: 'GET', headers: buildHeaders() })
      if (!res.ok) throw new Error('Failed to load event data')
      events.value = await res.json()
    } catch (err) {
      console.error('An error occurred while loading calendar events:', err)
    } finally {
      loading.value = false
    }
  }

  const createEvent = async (payload: Partial<CalendarEvent>) => {
    try {
      // 後端會用 request.user 綁 user，不要傳 user_id
      const { user_id, ...safe } = payload as any
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: buildHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(safe),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || 'Create failed')
      }
      const created = await res.json()
      events.value.unshift(created)
      return { success: true, data: created }
    } catch (e: any) {
      return { success: false, message: e?.message || 'Create failed' }
    }
  }

  const deleteEvent = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: buildHeaders(),
      })
      if (res.status !== 204 && !res.ok) {
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
        headers: buildHeaders(),
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

