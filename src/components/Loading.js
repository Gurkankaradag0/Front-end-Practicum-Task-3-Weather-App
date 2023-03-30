import { useLoading } from 'src/context/Loading'
import { MagnifyingGlass } from  'react-loader-spinner'

const Loading = () => {
    const { loading } = useLoading()

    // if (!loading) return (<></>)

    return (
        <MagnifyingGlass
            visible={loading}
            height="100"
            width="100"
            glassColor = '#A29EAA'
            color = '#463181'
        />
    )
}

export default Loading