import classNames from "classnames"
import Icon from "./Icon"
import { useWeather } from "src/context/Weather"

const Tabs = () => {
    const { weather, key, setKey, startPoint, setPoint, setStartPoint } = useWeather()

    return (
        <div className="flex justify-between items-center mt-8 w-full px-4 max-sm:mt-2">
            {
                Object.keys(weather.days).map((item, i) => (
                    <div 
                        key={i}
                        className={classNames({
                            "flex flex-col justify-center items-center w-full py-2 rounded-2xl cursor-pointer": true,
                            "bg-white/20": i === key
                        })}
                        onClick={() => {
                            if (key !== i) {
                                setKey(i)
                                setPoint(-1)
                                setStartPoint(weather.days[item].startPoint)
                            }
                        }}
                    >
                        <div className="max-sm:text-sm">{item}</div>
                        <Icon 
                            id={weather.days[item].icon_id}
                            night={
                                i === 0
                                ? ['21:00', '00:00', '03:00'].includes(weather.labels[startPoint])
                                    ? true : false
                                : false
                            }
                        />
                        <div className="flex justify-center items-center gap-x-2 max-sm:text-xs">
                            <span>{weather.days[item].temp_max}°C</span>
                            <span className="text-info">{weather.days[item].temp_min}°C</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs