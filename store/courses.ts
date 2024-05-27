import { defineStore } from 'pinia';
import type {CoursesResponse} from "~/types";

export const useCoursesStore = defineStore('courses', () => {
    const course = ref();
    const token = useCookie('sb-access-token');

    const loadCourses = async() => {
        try{
            const courseResponse = await $fetch<CoursesResponse>('/api/v1/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            });
            course.value = courseResponse.data;
        } catch (error) {
            console.error('Failed to load specializations:', error);
            throw error;
        }
    }

    return {course, loadCourses}
});