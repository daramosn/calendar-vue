<template>
  <div @click.stop>
    <div v-if="!openEdit" @click.stop class="reminder-card">
      <h1 class="title">Reminder</h1>
      <section class="info">
        <article>
          <label for="">Reminder text</label>
          <p>{{ reminder.text }}</p>
        </article>
        <article>
          <label for="">Date</label>
          <p>{{ reminder.date }}</p>
        </article>
        <article>
          <label for="">City</label>
          <p>{{ reminder.city }}</p>
        </article>
        <article>
          <label for="">Time</label>
          <p>{{ reminder.time }}</p>
        </article>
        <article>
          <label for="">Color</label>
          <div :style="{ backgroundColor: reminder.color }" class="color"></div>
        </article>
      </section>

      <div class="actions">
        <button @click.stop="openEditToggle">Edit</button>
        <button @click.stop="deleteReminderHandler">Delete</button>
      </div>
    </div>

    <form v-else @submit.prevent="" class="edit-reminder">
      <h1>Edit reminder</h1>

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

      <div class="actions">
        <button :disabled="reminderInput.length > 29" @click="saveChangesHandler">Save</button>
        <button @click="$emit('savedReminder')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { useRemindersStore } from '@/stores/reminders.store'
import { ref } from 'vue'

interface Props {
  reminder: Reminder
}

const { reminder } = defineProps<Props>()
const emit = defineEmits(['savedReminder'])
const openEdit = ref<boolean>(false)
const reminderInput = ref<string>('')
const colorInput = ref<string>('')
const cityInput = ref<string>('')
const timeInput = ref<string>('')
const dateInput = ref<string>('')
const remindersStore = useRemindersStore()

const openEditToggle = () => {
  openEdit.value = !openEdit.value

  reminderInput.value = reminder.text
  colorInput.value = reminder.color
  cityInput.value = reminder.city
  timeInput.value = reminder.time
  dateInput.value = reminder.date
}

const deleteReminderHandler = () => {
  remindersStore.deleteReminder(reminder)
}

const saveChangesHandler = () => {
  const newReminder: Reminder = {
    id: reminder.id,
    text: reminderInput.value,
    color: colorInput.value,
    city: cityInput.value,
    time: timeInput.value,
    date: dateInput.value
  }
  if (newReminder.date !== reminder.date) {
    remindersStore.createReminder(newReminder)
    remindersStore.deleteReminder(reminder)
  } else {
    remindersStore.editReminder(newReminder)
  }
  emit('savedReminder')
}
</script>

<style>
.reminder-card {
  background-color: white;
  padding: 20px;
  min-width: 350px;
  border-radius: 8px;
  .title {
    margin-top: 0;
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 32px;
    row-gap: 16px;
    margin-bottom: 32px;

    label {
      opacity: 0.8;
      font-size: 14px;
      margin: 32px 0;
    }
    p {
      margin: 0;
    }
    .color {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }

    & > :first-child {
      grid-column: 1 / 3;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
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
}
.edit-reminder {
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
}
</style>
