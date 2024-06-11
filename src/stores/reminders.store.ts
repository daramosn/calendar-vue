import type { Reminder, RemindersCalendar } from '@/interfaces/reminder.interface'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useRemindersStore = defineStore('reminders', () => {
  const remindersCalendar = reactive<RemindersCalendar>({})

  function createReminder(year: number, month: number, date: number, rem: Reminder) {
    if (!remindersCalendar[year]) {
      remindersCalendar[year] = {}
    }
    if (!remindersCalendar[year][month]) {
      remindersCalendar[year][month] = {}
    }
    if (!remindersCalendar[year][month][date]) {
      remindersCalendar[year][month][date] = []
    }
    remindersCalendar[year][month][date].push(rem)
  }

  return {
    remindersCalendar,

    createReminder
  }
})
