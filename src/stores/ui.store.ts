import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const openFormModal = ref(false)
  const dateClicked = ref<string | null>(null)

  const openEditReminderForm = ref(false)
  const reminderSelected = ref<string | null>(null)

  function toggleFormModal(): void {
    openFormModal.value = !openFormModal.value
  }
  function updateDateClicked(newValue: string | null) {
    dateClicked.value = newValue
  }

  function toggleEditFormModal(isOpen: boolean): void {
    openEditReminderForm.value = isOpen
  }
  function selectReminder(id: string | null): void {
    reminderSelected.value = id
  }

  return {
    openFormModal,
    dateClicked,
    openEditReminderForm,
    reminderSelected,
    toggleFormModal,
    toggleEditFormModal,
    selectReminder,
    updateDateClicked
  }
})
