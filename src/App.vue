<template>
  <div class="layout">
    <header>
      <h1>Calendar app</h1>
    </header>
    <main>
      <MyMonth :year="2024" :month="2" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import MyMonth from './components/MyMonth.vue'
</script>

<style>
.layout {
  padding: 32px max(32px, calc((100% - var(--body)) / 2));
  min-height: 100svh;
  height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
