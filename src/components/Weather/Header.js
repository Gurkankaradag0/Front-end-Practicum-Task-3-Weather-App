import { useLocation } from "src/context/Location"
import classNames from "classnames"
import Icon from "./Icon"
import { useWeather } from "src/context/Weather"
import { useMemo, memo } from "react"

const Header = () => {
    const { location } = useLocation()
    const { weather, type, setType, key, types, point, startPoint } = useWeather()

    // The weather data to be displayed to the user is converted into a dictionary structure for printing on the screen, 
    // depending on whether the user has chosen the Day or Hour option to display the data.
    const headerData = useMemo(() => {
        const data = {}
        const day = Object.keys(weather.days)[key]
        data['icon_id'] = point !== -1 ? weather.icon_ids[point + startPoint] || 800 : weather.days[day].icon_id
        data['temp'] = point !== -1 ? weather.temp[point + startPoint] || 0 : weather.days[day].temp_max
        data['hour'] = point !== -1 ? weather.labels[point + startPoint] : ""
        data['day'] = day
        const desc = point !== -1 ? weather.descs[point + startPoint] || "" : weather.days[day].desc
        data['desc'] = desc ? desc[0].toUpperCase() + desc.slice(1) : desc
        return data
    }, [key, point, weather, startPoint])
    
    return (
        <div className="flex justify-between w-full px-10 max-sm:px-4">
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-x-4 text-4xl max-sm:text-xl">
                    <Icon 
                        id={headerData.icon_id}
                        night={
                            headerData.hour
                            ? ['21:00', '00:00', '03:00'].includes(headerData.hour)
                                ? true : false
                            : (key === 0 && ['21:00', '00:00', '03:00'].includes(weather.labels[startPoint]))
                                ? true : false
                        }
                    />
                    {headerData.temp}°C
                </div>
                <div className="text-xl text-info max-sm:text-sm flex gap-x-2 max-sm:gap-x-0.5">
                    {
                        types.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setType(item.id)}
                                className={classNames({
                                    "border-b-4 border-solid border-b-secondary": type === item.id,
                                    "cursor-pointer": true
                                })}
                            >{item.name}</div>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-end gap-y-4 max-sm:gap-y-1">
                <div className="font-bold text-4xl max-sm:text-2xl">
                    {location.name}
                </div>
                <div className="flex flex-col items-end text-info text-sm max-sm:text-xs">
                    <span>{headerData.hour ? `${headerData.day} - ${headerData.hour}` : headerData.day}</span>
                    <span>{headerData.desc}</span>
                </div>
            </div>
        </div>
    )
}

export default memo(Header)