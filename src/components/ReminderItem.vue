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
  color: white;
  margin-bottom: 4px;
  padding: 4px;

  border-radius: 4px;
  font-size: 12px;
}
</style>
