import cities from 'src/data/cities.json'
import { useLocation } from 'src/context/Location'

const Select = () => {
    const { location, setLocation } = useLocation()
    return (
        <select
            className='max-[300px]:w-full max-[512px]:w-1/2 max-[720px]:w-1/3 w-1/4 p-0.5 px-2 text-white border-2 rounded-md outline-none appearance-none border-primary bg-backdrop '
            value={location.id}
            onChange={(e) => setLocation(cities.find((item) => item.id === parseInt(e.target.value)))}
        >
            {
                cities.map((item, index) => (
                    <option 
                        key={index}
                        value={item.id}
                    >
                        {item.name}
                    </option>
                ))
            }
        </select>
    )
}

export default Select