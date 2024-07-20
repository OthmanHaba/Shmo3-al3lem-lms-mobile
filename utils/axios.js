import axios from 'axios'
import {getToken} from '../services/TokenService'

const API_BASE_URL = 'http://206.189.56.49:8081/api/development';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.log('Error fetching token from SecureStore', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/*
// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized error, redirect to login
            Alert.alert('Session Expired', 'Please log in again.');
            navigate('Auth', { screen: 'Login' }); // Adjust based on your navigation setup
        } else if (error.response) {
            // Other server errors
            const message = error.response.data?.message || 'An error occurred';
            Alert.alert('Error', message);
        } else {
            Alert.alert('Error', 'Network error');
        }
        return Promise.reject(error);
    }
);
*/


export default axiosInstance