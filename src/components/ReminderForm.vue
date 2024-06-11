<template>
  <form @submit.prevent="addReminder" class="new-reminder">
    <h1>Add new reminder</h1>

    <label for="text"> Reminder text</label>
    <textarea
      id="text"
      type="text"
      required
      v-model.trim="reminderInput"
      placeholder="30 characters max..."
      :data-length="reminderInput.length > 29"
    ></textarea>

    <label for="date"> Date </label>
    <input id="date" type="date" v-model="uiStore.dateClicked" required />

    <label for="time"> Time </label>
    <input id="time" type="time" v-model="timeInput" required />

    <label for="city"> City </label>
    <input id="city" type="text" v-model="cityInput" required placeholder="New york" />

    <label for="color"> Pick a color </label>
    <input id="color" type="color" v-model="colorInput" required />

    <button :disabled="reminderInput.length > 29">Save reminder</button>
  </form>
</template>

<script lang="ts" setup>
import { useRemindersStore } from '@/stores/reminders.store'
import { useUIStore } from '@/stores/ui.store'
import { ref } from 'vue'

const reminderInput = ref<string>('')
const colorInput = ref<string>('#6c99de')
const cityInput = ref<string>('')
const timeInput = ref<string>('')
const remindersStore = useRemindersStore()
const uiStore = useUIStore()

const addReminder = () => {
  if (!uiStore.dateClicked) return
  const draft = {
    year: Number(uiStore.dateClicked?.split('-')[0]),
    month: Number(uiStore.dateClicked?.split('-')[1]),
    date: Number(uiStore.dateClicked?.split('-')[2])
  }
  remindersStore.createReminder(draft.year, draft.month, draft.date, {
    city: cityInput.value,
    color: colorInput.value,
    text: reminderInput.value,
    time: timeInput.value,
    id: crypto.randomUUID(),
    date: uiStore.dateClicked
  })

  reminderInput.value = ''
  cityInput.value = ''
  timeInput.value = ''
  uiStore.updateDateClicked('')
  uiStore.toggleFormModal()
}
</script>

<style>
.new-reminder {
  color: #000000;
  background-color: white;
  border-radius: 8px;
  display: grid;
  padding: 64px;

  h1 {
    font-weight: 500;
    margin: 0 0 64px 0;
  }
  textarea {
    width: 360px;
    font-family: inherit;
    padding: 8px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 0.5px solid rgba(0, 0, 0, 0.3);
    &[data-length='true'] {
      background-color: rgb(218, 133, 133);
    }
  }
  label {
    font-size: 14px;
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.8);
  }
  input {
    border: 0.5px solid rgba(0, 0, 0, 0.3);
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  input[type='color'] {
    aspect-ratio: 2/1;
    width: 64px;
    padding: 0;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
  }

  button {
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    background: #18181b;
    transition: all 0.2 ease-out;
    &:disabled {
      opacity: 0.4;
    }
  }
}
</style>
