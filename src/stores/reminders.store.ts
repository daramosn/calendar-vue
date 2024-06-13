import type { Reminder, RemindersCalendar } from '@/interfaces/reminder.interface'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useRemindersStore = defineStore('reminders', () => {
  let remindersCalendar = reactive<RemindersCalendar>({})

  const persistedData = useLocalStorage('reminders', {} as RemindersCalendar)
  watch(
    persistedData,
    (newValue) => {
      remindersCalendar = newValue // Update reactive state with persisted data
    },
    { immediate: true }
  )

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
    if (rem.text.length > 30) throw new Error('Reminder text exceeds 30 characters')
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
