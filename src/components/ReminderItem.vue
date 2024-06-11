<template>
  <li
    class="reminder"
    :style="{ backgroundColor: `${reminder.color}` }"
    @click.stop="reminderClicked"
  >
    {{ reminder.text }}
  </li>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { defineProps } from 'vue'

interface Props {
  reminder: Reminder
}

const { reminder } = defineProps<Props>()

const reminderClicked = () => {
  console.log('reminder clicked!', reminder)
}
</script>

<style scoped>
.reminder {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 14px;
}
</style>
