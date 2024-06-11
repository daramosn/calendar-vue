<template>
  <div class="reminder-card" @click.stop>
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
      <button>Edit</button>
      <button @click="deleteReminderHandler">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Reminder } from '@/interfaces/reminder.interface'
import { useRemindersStore } from '@/stores/reminders.store'

interface Props {
  reminder: Reminder
}

const { reminder } = defineProps<Props>()
const remindersStore = useRemindersStore()

const deleteReminderHandler = () => {
  remindersStore.deleteReminder(reminder)
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
</style>
