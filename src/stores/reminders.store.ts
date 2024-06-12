import type { Reminder, RemindersCalendar } from '@/interfaces/reminder.interface'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRemindersStore = defineStore('reminders', () => {
  const remindersCalendar = reactive<RemindersCalendar>({})

  function createReminder(rem: Reminder) {
    const draft = {
      year: Number(rem.date?.split('-')[0]),
      month: Number(rem.date?.split('-')[1]),
      date: Number(rem.date?.split('-')[2])
    }
    const { date, month, year } = draft

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
    remindersCalendar[year][month][date].sort(
      (a, b) => +a.time.replace(':', '') - +b.time.replace(':', '')
    )
  }

  function deleteReminder(rem: Reminder) {
    const draft = {
      year: Number(rem.date?.split('-')[0]),
      month: Number(rem.date?.split('-')[1]),
      date: Number(rem.date?.split('-')[2])
    }
    const { date, month, year } = draft
    const remindersList = remindersCalendar[year][month][date]
    const index = remindersList.findIndex((reminder) => reminder.id === rem.id)
    remindersList.splice(index, 1)
  }

  return {
    remindersCalendar,

    createReminder,
    deleteReminder
  }
})
