import axiosInstance from "../utils/axios";

export async function getCourse(id){
    return axiosInstance.get(`courses/${id}`).then(res =>{
        return res.data.data
    });
}