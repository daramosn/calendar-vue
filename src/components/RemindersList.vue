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
  list-style-type: none;
  padding: 0;
}
</style>
