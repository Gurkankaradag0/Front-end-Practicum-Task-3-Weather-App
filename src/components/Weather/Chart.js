import classNames from "classnames";
import { useMemo, useRef, useEffect } from "react"
import { useWeather } from "src/context/Weather";
import { useDimensions } from "webrix/hooks"

const Line = ({path, color, startPoint}) => {
    const dx = 100 / (path.slice(startPoint, startPoint + 8).length - 1)
    const d = `M0,${path[startPoint]} ${path.slice(startPoint + 1, startPoint + 8).map((p, i) => (
        `C${dx*i + dx/2},${path[i + startPoint]} `+
        `${dx*(i+1) - dx/2},${path[i + 1 + startPoint]} `+
        `${dx*(i+1)},${path[i + 1 + startPoint]} `
    )).join(' ')}`
    return (
        <>
            <path 
                stroke={color} 
                d={d} 
                fill='none' 
                className='stroke'
            />
            <path d={d+` V-25 H0 Z`} fill={`url(#gradient-${color})`} className='pointer-events-none'/>
            <defs>
                <linearGradient id={`gradient-${color}`} x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor={color} stopOpacity={0}/>
                    <stop offset='100%' stopColor={color} stopOpacity={0.15}/>
                </linearGradient>
            </defs>
        </>
    );
}

const Points = ({data, width, height, setPoint, range}) => {
    const dr = Math.abs(range[1] - range[0])
    const dr_ = range[0] < 0 ? Math.abs(0 - range[0]) : 0

    return (
        <div className='absolute top-0'>
            {
                data.map((y, i) => (
                    <div 
                        key={i}
                        style={{
                            left: `${i * (width - 48) / (data.length - 1) + 24}px`, 
                            top: `${height - (y + dr_) * (height / dr)}px`
                        }} 
                        onClick={() => setPoint(i)} 
                        className={`absolute w-12 h-12 -translate-x-6 -translate-y-6 cursor-pointer`}
                    />
                ))
            }
        </div>
    );
}

const Marker = ({data, point, width, height, range, type}) => {
    const dr = Math.abs(range[1] - range[0])
    const dr_ = range[0] < 0 ? Math.abs(0 - range[0]) : 0
    
    return (
        <>
            {
                data.map((item, i) => (
                    <div 
                        key={i}
                        className={`absolute bottom-0 z-[2] flex flex-col items-center pointer-events-none -translate-x-1/2`}
                        style={{
                            top: `${height - (item + dr_) * (height / dr)}px`,
                            left: `${i * (width - 48) / (data.length - 1) + 24}px`,
                        }}
                    >
                        <span className={classNames({
                            "absolute translate-y-[calc(-100%_-_0.5rem)] text-sm": true,
                            "text-info": point !== i
                        })}>{item.toString()}{type === 'temp' || type === 'feels_like' ? '°C' : type === 'humidity' ? '%' : 'km/s'}</span>
                        <div 
                            className="absolte top-0 shrink-0 w-1 h-1 rounded-full border-solid border-8 border-white -translate-y-1/2 bg-white"
                            style={{
                                opacity: point === i ? 1 : 0
                            }}
                        />
                    </div>
                ))
            }
        </>
    )
}

const Chart = () => {
    const graph = useRef()
    // The height and width of the "Graph" element are obtained.
    const { width, height } = useDimensions(graph)
    const { weather, type, key, setKey, types, point, setPoint, startPoint } = useWeather()

    // Separate minimum and maximum values for the temperature, 
    // feels-like temperature, humidity, and wind are determined for the graph.
    const range = useMemo(() => {
        if (type === 'temp') return [-25, 75]
        if (type === 'feels_like') return [-25, 75]
        if (type === 'humidity') return [-25, 125]
        if (type === 'wind') return [-25, 150]
    }, [type])

    // Due to the missing data from the past hours of the first day in the data received from the API, 
    //      the graph of the first day includes data from the next day. 
    //      (This is done for consistency in the appearance of all graphs.) 
    // If the data for the next day is present in the graph of the first day and it is clicked, 
    //      the day to which that data belongs is determined.
    useEffect(() => {
        if (key > 1 || point === -1) return
        let days = Object.keys(weather.days)
        if (key === 1 && weather.days[days[key]].startPoint === startPoint) return
        if (key === 0 && weather.days[days[key]].data.length === 8) return
        if (key === 0 && weather.days[days[key + 1]].startPoint <= point) setKey(key + 1)
        if (key === 1 && weather.days[days[key]].startPoint > point) setKey(key - 1)
        // eslint-disable-next-line
    }, [point])
    
    return (
        <div className="w-full">
            <div className='relative m-4 max-sm:mx-2 max-sm:my-0.5 h-[400px] rounded-[10px]' ref={graph}>
                <Marker data={weather[type].slice(startPoint, startPoint + 8)} point={point} width={width} height={height} range={range} type={type}/>
                <svg 
                    viewBox={`0 ${range[0]} 100 ${range[0] < 0 ? Math.abs(range[1] - range[0]) : range[1]}`} 
                    preserveAspectRatio='none'
                    className="w-full h-full scale-y-[-1] px-6"
                >
                    <Line path={weather[type]} color={types.find((it) => it.id === type).color} startPoint={startPoint}/>
                </svg>
                <div className='flex w-full absolute justify-between left-0 bottom-0'>
                    {
                        weather.labels.slice(startPoint, startPoint + 8).map(label => (
                            <div 
                                key={label}
                                className="text-info max-sm:text-xs"
                            >{label}</div>
                        ))
                    }
                </div>
                <Points data={weather[type].slice(startPoint, startPoint + 8)} width={width} height={height} setPoint={setPoint} range={range}/>
            </div>
        </div>
    )
}

export default Chart