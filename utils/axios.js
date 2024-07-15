import axios from 'axios'
import { getToken } from '../services/TokenService'


axios.create({
    baseURL: 'http://192.168.157.248:8000/api/development',
    headers: {
        Accept: 'application/json'
    }
})

axios.interceptors.request.use(async (req) => {
    const token = await getToken()
    if (token !== null) {
        req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
})

export default axios