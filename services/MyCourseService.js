import axiosInstance from "../utils/axios";

export async function getMyCourses() {
    const response = await axiosInstance.get('/panel/webinars/purchases');
    return response.data;
}