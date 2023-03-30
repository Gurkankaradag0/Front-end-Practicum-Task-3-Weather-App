import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'weather-react-icons/lib/css/weather-icons.css'
import App from './App'
import { LocationProvider } from './context/Location'
import { LoadingProvider } from './context/Loading'
import { WeatherProvider } from './context/Weather'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LocationProvider>
    <LoadingProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </LoadingProvider>
  </LocationProvider>
)