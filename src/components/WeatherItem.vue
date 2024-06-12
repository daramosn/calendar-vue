<template>
  <div class="weather-item">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="weatherData">
      <p>{{ weatherData.description }}</p>
      <p>{{ weatherData.temperature }} °C</p>
    </div>
    <div v-else>Error loading weather data</div>
  </div>
</template>

<script lang="ts" setup>
import { fetchWeather, type WeatherData } from '@/api/weather'
import { onMounted, reactive, ref } from 'vue'

interface Props {
  city: string
}

const { city } = defineProps<Props>()
let weatherData = reactive<Partial<WeatherData>>({})
const isLoading = ref<boolean>(true)

onMounted(async () => {
  isLoading.value = true
  const response = await fetchWeather(city)
  if (!response.ok) return
  weatherData.description = response.description
  weatherData.temperature = response.temperature
  isLoading.value = false
})
</script>

<style></style>
