import type { Reminder, RemindersCalendar } from '@/interfaces/reminder.interface'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRemindersStore = defineStore('reminders', () => {
  const remindersCalendar = reactive<RemindersCalendar>({})

  function getDateParsed(rem: Reminder) {
    return {
      year: Number(rem.date?.split('-')[0]),
      month: Number(rem.date?.split('-')[1]),
      date: Number(rem.date?.split('-')[2])
    }
  }
  function sortRemindersArray(list: Reminder[]) {
    list.sort((a, b) => +a.time.replace(':', '') - +b.time.replace(':', ''))
  }

  function createReminder(rem: Reminder) {
    const { date, month, year } = getDateParsed(rem)

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
    sortRemindersArray(remindersCalendar[year][month][date])
  }

  function deleteReminder(rem: Reminder) {
    const { date, month, year } = getDateParsed(rem)
    const remindersList = remindersCalendar[year][month][date]
    const index = remindersList.findIndex((reminder) => reminder.id === rem.id)
    remindersList.splice(index, 1)
  }

  function editReminder(rem: Reminder) {
    const { date, month, year } = getDateParsed(rem)
    const remindersList = remindersCalendar[year][month][date]
    const index = remindersList.findIndex((reminder) => reminder.id === rem.id)
    remindersList[index] = { ...remindersList[index], ...rem }
    sortRemindersArray(remindersCalendar[year][month][date])
  }

  return {
    remindersCalendar,

    createReminder,
    editReminder,
    deleteReminder
  }
})
