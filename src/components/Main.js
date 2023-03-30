import { useEffect } from 'react'
import cities from 'src/data/cities.json'

import GetWeather from 'src/services/GetWeather'
import GetLocation from 'src/services/GetLocation'
import { useLocation } from 'src/context/Location'
import { useLoading } from 'src/context/Loading'
import { useWeather } from 'src/context/Weather'

import Header from './Weather/Header'
import Chart from './Weather/Chart'
import Tabs from './Weather/Tabs'
import Loading from './Loading'

const Main = () => {
    const { location, setLocation } = useLocation()
    const { loading, setLoading } = useLoading()
    const { setWeather } = useWeather()

    // The user is asked for permission for location information. 
    // If granted, the user's location data is sent to the "Location Context API".
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                const provinceName = await GetLocation(coords.latitude, coords.longitude)
                if (provinceName) {
                    const province = cities.find((item) => item.name === provinceName)
                    province && setLocation(province)
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    // A request is made to the "OpenWeatherMap" every time the location changes.
    // A loading component is displayed to the user until the response to the request is received.
    useEffect(() => {
        if (location) {
            setLoading(true)
            GetWeather(location.latitude, location.longitude)
                .then(result => {
                    setWeather(result)
                    setLoading(false)
                })
        }
        // eslint-disable-next-line
    }, [location])

    return (
        <div className='flex-1 flex flex-col w-full mt-4 items-center'>
            {
                loading 
                    ? 
                <Loading /> 
                    :
                <>
                    <Header />
                    <Chart />
                    <Tabs />
                </>
            }
        </div>
    )
}

export default Main