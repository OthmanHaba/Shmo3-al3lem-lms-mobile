import axiosInstance from "../utils/axios";
import {getUserId, setToken} from "./TokenService"

export async function login(credentials) {
    await axiosInstance.post('/login', credentials).then(res => {
        setToken(res.data.data);
    }).catch(e => {
        console.log('error', e);
        throw e;
    });
}


export async function loadUser() {
    try {
        const id = await getUserId();
        if (!id) {
            console.warn('User ID not found');
            throw new Error('User is null');
        }

        const response = await axiosInstance.get('/panel/profile-setting');

        if (response.status === 200 && response.data && response.data.data) {
            return response.data.data;
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        throw error;
    }
}