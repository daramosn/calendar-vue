<template>
  <section class="month">
    <div class="daynames">
      <span v-for="(name, index) in dayName" :key="index">{{ name }}</span>
    </div>

    <div class="days">
      <div v-for="index in firstDay" :key="'empty-' + index"></div>

      <DayItem
        v-for="date in days"
        :key="`${year}-${month}-${date}`"
        :month="month"
        :year="year"
        :date="date"
        @date-clicked="dateClickedHandler"
      />
    </div>
  </section>

  <CardModal :is-open="openForm" @backdrop-clicked="openFormToggle">
    <CustomForm
      :reminder="draftReminder"
      :edit-mode="false"
      @on-close="openFormToggle"
    ></CustomForm>
  </CardModal>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { reactive, ref } from 'vue'
import CardModal from './CardModal.vue'
import CustomForm from './CustomForm.vue'
import DayItem from './DayItem.vue'

interface Props {
  year: number
  month: number
  days: number
  firstDay: number
}

const { month, year, days, firstDay } = defineProps<Props>()
const openForm = ref<boolean>(false)
const draftReminder = reactive<Reminder>({
  date: '',
  id: '',
  text: '',
  city: '',
  color: '#6c99de',
  time: ''
})

const dateClickedHandler = (dateClicked: string) => {
  draftReminder.date = dateClicked
  openFormToggle()
}

const openFormToggle = () => {
  openForm.value = !openForm.value
}

const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<style>
.month {
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
  gap: 4px;

  .daynames {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: clamp(0.875rem, 0.3512rem + 2.1488vw, 2.5rem);
    opacity: 0.8;
  }
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
    gap: 2px;
  }
}

@media (width<768px) {
}
</style>
