import {create} from "zustand";
import {getToken, setToken} from "../services/TokenService";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "@/utils/axios";

export const useAuthStore = create((set) => ({
    user: {},
    setUser: (user) => set({user}),
    logout: () => set({user: null}),
    token: null,
    isLoading: true,
    signIn: async (credentials) => {
        await axiosInstance.post('/login', credentials).then(res => {
            setToken(res.data.data);
            set({ token: res.data.data, isLoading: false });
        }).catch(e => {
            console.log('error', e);
            throw e;
        });
    },
    signOut: async () => {
        await SecureStore.deleteItemAsync('token');
        set({ token: null, isLoading: false });
    },
    checkAuth: async () => {
        const token = await getToken()
        set({ token, isLoading: false });
    },
}));