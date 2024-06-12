<template>
  <section class="month">
    <span class="dayname" v-for="(name, index) in dayName" :key="index">{{ name }}</span>

    <div v-for="index in firstDay" :key="'empty-' + index"></div>

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

@media (width<768px) {
  .month {
    grid-template-rows: auto;
  }
  .dayname {
    display: none;
  }
}
</style>
