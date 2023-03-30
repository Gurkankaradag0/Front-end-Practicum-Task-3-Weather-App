import axios from "axios"

const GetLocation = async (lat, lon) => {
    try {
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
        if (data?.address?.province) return data.address.province
        else return false
    } catch {
        return false
    }
}

export default GetLocation