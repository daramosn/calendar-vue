<template>
  <form @submit.prevent="" class="new-reminder">
    <h1 v-if="editMode">Edit reminder</h1>
    <h1 v-else>Add new reminder</h1>

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
    <input id="date" type="date" v-model="dateInput" required />

    <label for="time"> Time </label>
    <input id="time" type="time" v-model="timeInput" required />

    <label for="city"> City </label>
    <input id="city" type="text" v-model="cityInput" required placeholder="New york" />

    <label for="color"> Pick a color </label>
    <input id="color" type="color" v-model="colorInput" required />

    <div v-if="editMode" class="actions">
      <button :disabled="reminderInput.length > 29" type="submit" @click="saveChangesHandler">
        Save changes
      </button>
      <button @click="$emit('onClose')" type="button">Cancel</button>
    </div>
    <button v-else :disabled="reminderInput.length > 29" @click="addNewReminderHandler">
      Create reminder
    </button>
  </form>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { useRemindersStore } from '@/stores/reminders.store'
import { ref } from 'vue'

interface Props {
  reminder: Reminder
  editMode?: boolean
}

const { reminder, editMode = false } = defineProps<Props>()
const emit = defineEmits(['onClose'])

const dateInput = ref<string>(reminder.date)
const reminderInput = ref<string>(reminder.text)
const cityInput = ref<string>(reminder.city)
const colorInput = ref<string>(reminder.color)
const timeInput = ref<string>(reminder.time)

const remindersStore = useRemindersStore()

const addNewReminderHandler = () => {
  if (!reminder.date) return

  remindersStore.createReminder({
    date: reminder.date,
    id: crypto.randomUUID(),
    text: reminderInput.value,
    city: cityInput.value,
    color: colorInput.value,
    time: timeInput.value
  })

  reminderInput.value = ''
  dateInput.value = ''
  cityInput.value = ''
  timeInput.value = ''
  emit('onClose')
}

const saveChangesHandler = () => {
  const newReminder: Reminder = {
    date: dateInput.value,
    id: reminder.id,
    text: reminderInput.value,
    city: cityInput.value,
    color: colorInput.value,
    time: timeInput.value
  }
  if (newReminder.date !== reminder.date) {
    remindersStore.createReminder(newReminder)
    remindersStore.deleteReminder(reminder)
  } else {
    remindersStore.editReminder(newReminder)
  }
  emit('onClose')
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

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
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
