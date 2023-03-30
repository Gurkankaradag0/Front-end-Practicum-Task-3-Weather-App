import classNames from "classnames"
import { WeatherIcon } from "weather-react-icons"

const Icon = ({id, night}) => {
    return (
        <WeatherIcon 
            name="owm" 
            iconId={id}
            night={night}
            className={classNames({
                "text-5xl my-4 max-sm:text-3xl": true,
                "text-yellow-300": id === 800,
                "text-blue-300": id === 500,
                "text-red-300": id === 801,
                "text-red-400": id === 802,
                "text-blue-400": id === 803,
                "text-indigo-400": id === 804,
                "text-info": id === 600,
                "text-secondary": id === 601,
            })}
        />
    )
}

Icon.defaultProps = {
    night: false
}

export default Icon