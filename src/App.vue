<template>
  <div class="layout">
    <header>
      <span @click="counter++">Calendar app</span>
      <input type="month" v-model="dateInput" />
    </header>
    <main>
      <MyMonth :year="date.year" :month="date.month" :days="date.days" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import MyMonth from './components/MyMonth.vue'

const dateInput = ref<string>('2024-02')
const counter = ref<number>(0)

const date = computed(() => {
  return {
    year: +dateInput.value.split('-')[0],
    month: +dateInput.value.split('-')[1],
    days: new Date(+dateInput.value.split('-')[0], +dateInput.value.split('-')[1], 0).getDate()
  }
})
</script>

<style>
.layout {
  padding: 32px max(32px, calc((100% - var(--body)) / 2));
  min-height: 100svh;
  height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr;
  header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    input {
      padding: 2px 8px;
      border-radius: 4px;
      font-family: inherit;
    }
  }
}
</style>
