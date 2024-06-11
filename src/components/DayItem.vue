<template>
  <article class="day" @click="dayClickedHandler">
    <span>
      <small>{{ date }}</small>
    </span>

    <RemindersList :year="year" :month="month" :date="date" />
  </article>
</template>

<script lang="ts" setup>
import { useUIStore } from '@/stores/ui.store'
import RemindersList from './RemindersList.vue'

interface Props {
  date: number
  month: number
  year: number
}

const { date, month, year } = defineProps<Props>()
const uiStore = useUIStore()

const dayClickedHandler = () => {
  uiStore.toggleFormModal()
  uiStore.updateDateClicked(
    `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
  )
}
</script>

<style>
.day {
  height: 100%;
  background-color: aliceblue;
  border-radius: 4px;
  padding: 8px;
  color: black;
  display: flex;
  flex-direction: column;
  span {
    font-size: 14px;
    font-weight: 700;
    align-self: flex-start;
    background: #8cbbe99a;
    padding: 0 4px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  ul {
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
