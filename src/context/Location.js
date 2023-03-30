import { createContext, useContext, useState } from "react"
import cities from 'src/data/cities.json'

const LocationContext = createContext()

// The "Context API" where the location is stored.
export const LocationProvider = ({children}) => {

    const [location, setLocation] = useState(cities.find(item => item.id === 58))

    const values = {
        location,
        setLocation
    }

    return (
        <LocationContext.Provider value={values}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => useContext(LocationContext)