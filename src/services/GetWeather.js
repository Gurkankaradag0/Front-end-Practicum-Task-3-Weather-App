import axios from "axios"
import mode from "src/utils/Mode"

const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]

const GetWeather = async (lat, lon) => {    
    try {
        // Requests are made to the free 3-hourly 5-day APIs of "OpenWeatherMap". 
        // The response returned from the request is parsed according to the application.
        const { data:main } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&lang=tr&units=metric`)
        
        const data = {}
        data['temp'] = []
        data['feels_like'] = []
        data['humidity'] = []
        data['wind'] = []
        data['labels'] = []
        data['icon_ids'] = []
        data['descs'] = []
        data['days'] = {}
        
        // The data received every 3 hours is divided into days.
        main.list.forEach((element, i) => {
            const date = new Date(element.dt * 1000)
            const day = days[date.getDay()]
            const keys = Object.keys(data.days)
            if (keys.length === 5 && day !== keys[keys.length - 1]) return
            if (!keys.some((item) => item === day)) {
                data.days[day] = {}
                data.days[day]['startPoint'] = i
                data.days[day]['data'] = []
            }
            data.temp.push(Math.floor(element.main.temp))
            data.feels_like.push(Math.floor(element.main.feels_like))
            data.humidity.push(element.main.humidity)
            
            // The conversion of wind speed from meters per second to kilometers per hour is being performed.
            data.wind.push(Math.floor(element.wind.speed * 3.6))
            
            data.icon_ids.push(element.weather[0].id)
            data.descs.push(element.weather[0].description)

            const hour = date.getHours().toString()
            const label = hour.length === 1 ? `0${hour}:00` : `${hour}:00`
            data.labels.push(label)
            data.days[day].data.push(element)
        })
        
        // The data divided into days is used to calculate the minimum temperature,
        // maximum temperature, icon ID, and weather description.
        Object.entries(data.days).forEach(([key, value]) => {
            let temp_min = 0, 
                temp_max = 0,
                icon_ids = [],
                descs = []
            value.data.forEach(element => {
                temp_min = element.main.temp_min < temp_min ? element.main.temp_min : temp_min
                temp_max = element.main.temp_max > temp_max ? element.main.temp_max : temp_max
                icon_ids.push(element.weather[0].id)
                descs.push(element.weather[0].description)
            })
            
            data.days[key]['temp_min'] = Math.floor(temp_min)
            data.days[key]['temp_max'] = Math.floor(temp_max)
            data.days[key]['icon_id'] = mode(icon_ids)
            data.days[key]['desc'] = mode(descs)
        })

        return data

    } catch {
        return false
    }

    
}

export default GetWeather