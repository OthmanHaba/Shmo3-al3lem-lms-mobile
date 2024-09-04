import axiosInstance from "../utils/axios";


export default function getAllCourses() {
    return axiosInstance.get('/courses').then(res => {
        return res.data;
    })
}