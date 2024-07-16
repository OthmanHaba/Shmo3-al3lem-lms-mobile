import axiosInstance from "../utils/axios";
import {getUserId, setToken} from "./TokenService"
import {useAuthStore} from "../stores/authStore";

export async function login(credentials) {
    await axiosInstance.post('/login', credentials).then(res => {
        setToken(res.data.data);
    }).catch(e => {
        console.log('error', e);
        throw e;
    });

}


export async function loadUser(setUser) {
    try {
        const id = await getUserId();
        if (!id) {
            console.warn('User ID not found');
            throw new DOMException('User is null');
        }

        const response = await axiosInstance.get(`/users/${id}/profile`);
        if (response.status === 200 && response.data && response.data.data) {
            const user = response.data.data;
            setUser(user); // Use the setUser function passed as a parameter
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        throw error;
    }
}