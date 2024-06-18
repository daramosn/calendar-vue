<template>
  <article
    class="day"
    @click="dateClickedHandler"
    @dragover.prevent
    @drop.prevent="dropReminderHandler"
    :data-fade="notCurrentMonth"
  >
    <span class="date">
      <small>{{ date }}</small>
    </span>

    <RemindersList :year="year" :month="month" :date="date" />
  </article>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { useRemindersStore } from '@/stores/reminders.store'
import RemindersList from './RemindersList.vue'

const remindersStore = useRemindersStore()

interface Props {
  date: number
  month: number
  year: number
  notCurrentMonth: boolean
}

const { date, month, year, notCurrentMonth } = defineProps<Props>()
const emit = defineEmits(['dateClicked'])

const dateClickedHandler = () => {
  const dateString = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
  emit('dateClicked', dateString)
}

const dropReminderHandler = (event: DragEvent) => {
  const stringReminder = event.dataTransfer?.getData('dragged-reminder')
  if (!stringReminder) return
  const reminder: Reminder = JSON.parse(stringReminder)

  remindersStore.deleteReminder(reminder)
  remindersStore.createReminder({
    ...reminder,
    date: `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
  })
}
</script>

<style>
.day {
  height: 100%;
  background-color: #e6f3ff;
  padding: 8px;
  color: black;
  display: flex;
  flex-direction: column;

  &[data-fade='true'] {
    background-color: #c5d7e8;
  }
  .date {
    font-size: 14px;
    font-weight: 700;
    align-self: flex-start;
    background: #8cbbe99a;
    padding: 0 4px;
    border-radius: 4px;
    margin-bottom: 8px;
    [data-fade='true'] & {
      background: #edc1c19a;
      color: rgba(0, 0, 0, 0.596);
    }
  }

  > *:nth-child(2) {
    flex: 1 1 0;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #6f6f6f;
  }
}
</style>
