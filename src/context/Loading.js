import { createContext, useContext, useState } from "react"

const LoadingContext = createContext()

export const LoadingProvider = ({children}) => {

    const [loading, setLoading] = useState(true)

    const values = {
        loading,
        setLoading
    }

    return (
        <LoadingContext.Provider value={values}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext)