import {create} from "zustand";

export const useCoursesStore = create((set) => ({
    courses:{},
    setCourses:(courses) => set({courses})
}));
