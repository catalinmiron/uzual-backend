export interface User {
  id: string
  email: string
  name: string
}
export interface Mood {
  id: string
  date: string
}
export interface Habit {
  id: string
  title: string
  description: string | null
  starred: boolean | null
}
export interface DayHabit {
  id: string
  done: boolean
  date: string
}
export interface AuthPayload {
  token: string
}
export interface Post {
  id: string
  published: boolean
  title: string
  content: string
}