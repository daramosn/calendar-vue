<template>
  <div class="layout">
    <header>
      <span>Calendapp</span>
      <input type="month" v-model="dateInput" />
    </header>
    <main>
      <MyMonth :daysList="daysList" :currentMonth="currentMonth" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import MyMonth from './components/MyMonth.vue'

const dateInput = ref<string>(
  `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
)

const currentMonth = computed(() => +dateInput.value.split('-')[1])

const daysList = computed(() => {
  let list = []
  const year = +dateInput.value.split('-')[0]
  const month = +dateInput.value.split('-')[1]
  const days = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()

  for (let i = 1; i <= firstDay; i++) {
    list.push({
      year: year,
      month: month - 1,
      date: new Date(year, month - 1, 0).getDate() - firstDay + i
    })
  }
  for (let i = 1; i <= days; i++) {
    list.push({
      year: year,
      month: month,
      date: i
    })
  }

  const maxDaysInMonth = Math.ceil(list.length / 7) * 7
  for (let i = 1; list.length < maxDaysInMonth; i++) {
    list.push({
      year: year,
      month: month + 1,
      date: i
    })
  }
  return list
})
</script>

<style>
.layout {
  padding: 32px max(16px, calc((100% - var(--body)) / 2));
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
