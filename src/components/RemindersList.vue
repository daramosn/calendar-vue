<template>
  <ul v-if="remindersList" class="reminders-list">
    <ReminderItem v-for="reminder in remindersList" :key="reminder.id" :reminder="reminder" />
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import ReminderItem from './ReminderItem.vue'
import { useRemindersStore } from '@/stores/reminders.store'

interface Props {
  date: number
  month: number
  year: number
}

const { date, month, year } = defineProps<Props>()
const remindersStore = useRemindersStore()

const remindersList = computed(() => remindersStore.remindersCalendar?.[year]?.[month]?.[date])
</script>

<style>
.reminders-list {
  overflow-y: scroll;
  padding: 0 4px 0 0;
  margin: 0;
  list-style: none;
}
</style>
