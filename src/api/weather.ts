const API_KEY = '25aef12c226147e1a23224620241206'

export interface WeatherData {
  ok: boolean
  description: string | null
  temperature: number | null
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`
    )
    const data = await response.json()
    return {
      ok: true,
      description: data.forecast.forecastday[0].day.condition.text,
      temperature: data.forecast.forecastday[0].day.avgtemp_c
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return {
      ok: false,
      description: null,
      temperature: null
    }
  }
}
