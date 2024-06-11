export interface Reminder {
  id: string
  text: string
  date: string
  time: string
  city: string
  color: string
}

export interface RemindersCalendar {
  [year: number]: {
    [month: number]: {
      [day: number]: Reminder[]
    }
  }
}
