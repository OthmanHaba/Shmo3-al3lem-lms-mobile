import axiosInstance from "../utils/axios";
import { getUserId, setToken } from "./TokenService";
import categoryItem from "../components/CategoryItem";

class AuthService {
    async login(credentials) {
        try {
            const response = await axiosInstance.post('/client/login', credentials);
            const token = response.data.token;
            await setToken(token);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async getUser() {
        try {
            const response = await axiosInstance.get('client/user');
            return response.data;
        }catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async register(credentials) {
        try {
            const response = await axiosInstance.post('/register/step/1', credentials);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async confirmOTP(data) {
        try {
            const response = await axiosInstance.post('/register/step/2', data);
            return response.data;
        } catch (error) {
            console.error('Error confirming OTP:', error);
            throw error;
        }
    }
}

export default new AuthService();