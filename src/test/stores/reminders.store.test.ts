import type { Reminder } from '@/interfaces/reminder.interface'
import { useRemindersStore } from '@/stores/reminders.store'
import { createPinia, setActivePinia } from 'pinia'

describe('useRemindersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  test('should return default values', () => {
    const { remindersCalendar, createReminder, editReminder, deleteReminder } = useRemindersStore()

    expect(remindersCalendar).toEqual({})
    expect(createReminder).toBeInstanceOf(Function)
    expect(editReminder).toBeInstanceOf(Function)
    expect(deleteReminder).toBeInstanceOf(Function)
  })

  test('should add a new reminder with text max 30 char', () => {
    const remindersStore = useRemindersStore()

    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      date: '2024-06-10',
      city: 'California',
      color: '#b1b1b1',
      text: 'Buy apples',
      time: '10:00'
    }

    remindersStore.createReminder(newReminder)
    const date = {
      year: Number(newReminder.date?.split('-')[0]),
      month: Number(newReminder.date?.split('-')[1]),
      date: Number(newReminder.date?.split('-')[2])
    }

    const addedReminder = remindersStore.remindersCalendar[date.year][date.month][date.date][0]

    expect(addedReminder).toEqual(newReminder)
    expect(addedReminder.text.length).toBeLessThanOrEqual(30)
  })

  test('should not add a reminder with text longer than 30 characters', () => {
    const remindersStore = useRemindersStore()

    const longTextReminder: Reminder = {
      id: crypto.randomUUID(),
      date: '2024-08-22',
      city: 'London',
      color: '#b1b1f1',
      text: 'This is just aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa longer test',
      time: '10:00'
    }

    expect(() => remindersStore.createReminder(longTextReminder)).toThrowError()
  })
})
