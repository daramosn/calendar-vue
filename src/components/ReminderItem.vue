<template>
  <li
    draggable="true"
    class="reminder"
    :style="{ backgroundColor: `${reminder.color}` }"
    @dragstart="dragReminderHandler($event, reminder)"
    @click.stop="reminderClickedHandler"
  >
    {{ reminder.text }}
  </li>

  <!-- Reminder view -->
  <CardModal :is-open="openEditForm" @backdrop-clicked="toggleEditForm">
    <ReminderCard :reminder="reminder" @saved-reminder="toggleEditForm" />
  </CardModal>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { defineProps, ref } from 'vue'
import CardModal from './CardModal.vue'
import ReminderCard from './ReminderCard.vue'

interface Props {
  reminder: Reminder
}

const { reminder } = defineProps<Props>()
const openEditForm = ref(false)

const toggleEditForm = () => {
  openEditForm.value = !openEditForm.value
}
const reminderClickedHandler = () => {
  openEditForm.value = true
}

const dragReminderHandler = (event: DragEvent, rem: Reminder) => {
  event.dataTransfer?.setData('dragged-reminder', JSON.stringify(rem))
}
</script>

<style>
.reminder {
  color: white;
  margin-bottom: 4px;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s ease-out;
  &:hover {
    transform: translateX(2px);
  }
}
</style>
