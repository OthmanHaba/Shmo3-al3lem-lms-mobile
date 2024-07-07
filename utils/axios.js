import axios from 'axios'
import { getToken } from '../services/TokenService'
axios.create({
    baseURL: 'localehost:8000/api',
    headers: {
        Accept: 'application/json'
    }
})

axios.interceptors.request.use(async (req) => {
    const token = await getToken()
    if (token !== null) {
        req.headers["Authorization"] = `Bearer ${token}`;
    }
})

export default axios