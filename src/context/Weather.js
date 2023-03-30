import { createContext, useContext, useState } from "react"

const WeatherContext = createContext()

export const WeatherProvider = ({children}) => {
    const [weather, setWeather] = useState(false)
    const [type, setType] = useState('temp')
    const [key, setKey] = useState(0)
    const [point, setPoint] = useState(-1)
    const [startPoint, setStartPoint] = useState(0)

    const types = [
        {
            id: 'temp',
            name: 'Sıcaklık',
            color: '#ca8a04'
        },
        {
            id: 'feels_like',
            name: 'Hissedilen',
            color: '#ca8a04'
        },
        {
            id: 'humidity',
            name: 'Nem',
            color: '#ffffff'
        },
        {
            id: 'wind',
            name: 'Rüzgar',
            color: '#93c5fd'
        },
    ]

    const values = {
        weather,
        setWeather,
        type,
        setType,
        key,
        setKey,
        types,
        point,
        setPoint,
        startPoint,
        setStartPoint
    }

    return (
        <WeatherContext.Provider value={values}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => useContext(WeatherContext)