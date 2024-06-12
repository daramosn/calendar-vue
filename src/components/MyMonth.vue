<template>
  <section class="month">
    <span class="dayname" v-for="(name, index) in dayName" :key="index">{{ name }}</span>
    <DayItem
      v-for="date in days"
      :key="`${year}-${month}-${date}`"
      :month="month"
      :year="year"
      :date="date"
      @date-clicked="dateClickedHandler"
    />
  </section>

  <CardModal :is-open="openForm" @backdrop-clicked="openFormToggle">
    <ReminderForm :date-clicked="dateClickedString" @reminder-created="openFormToggle" />
  </CardModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CardModal from './CardModal.vue'
import DayItem from './DayItem.vue'
import ReminderForm from './ReminderForm.vue'

interface Props {
  year: number
  month: number
  days: number
}

const { month, year, days } = defineProps<Props>()
const openForm = ref<boolean>(false)
const dateClickedString = ref<string>('')

const dateClickedHandler = (dateClicked: string) => {
  openFormToggle()
  dateClickedString.value = dateClicked
}

const openFormToggle = () => {
  openForm.value = !openForm.value
}

const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
</script>

<style>
.month {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 50px auto;
  gap: 2px;

  .dayname {
    padding: 16px 0;
  }
}
</style>
