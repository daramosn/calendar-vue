<template>
  <section class="month">
    <DayItem v-for="date in monthArray" :key="date" :month="month" :year="year" :date="date" />
  </section>
  <ReminderForm />
</template>

<script lang="ts" setup>
import DayItem from './DayItem.vue'
import ReminderForm from './ReminderForm.vue'
interface Props {
  year: number
  month: number
}

const { month, year } = defineProps<Props>()

// const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const daysNumber = new Date(year, month, 0).getDate()
const monthArray = Array.from({ length: daysNumber }, (_, i) => i + 1)
</script>

<style>
.month {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
</style>
