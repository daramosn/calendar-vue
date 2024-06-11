<template>
  <section class="month">
    <DayItem v-for="date in monthArray" :key="date" :month="month" :year="year" :date="date" />
  </section>

  <CardModal :is-open="uiStore.openFormModal" @backdrop-clicked="uiStore.toggleFormModal">
    <ReminderForm />
  </CardModal>
</template>

<script lang="ts" setup>
import { useUIStore } from '@/stores/ui.store'
import CardModal from './CardModal.vue'
import DayItem from './DayItem.vue'
import ReminderForm from './ReminderForm.vue'
interface Props {
  year: number
  month: number
}

const { month, year } = defineProps<Props>()
const uiStore = useUIStore()

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
