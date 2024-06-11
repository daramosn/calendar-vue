<template>
  <div v-if="isOpen" class="modal">
    <div class="backdrop" @click="$emit('backdropClicked')"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  isOpen: boolean
}
const { isOpen } = defineProps<Props>()
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  z-index: 10;

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px);
    background-color: rgb(0, 0, 0, 0.3);
  }

  & > *:nth-child(2) {
    z-index: 11;
  }
}
</style>
