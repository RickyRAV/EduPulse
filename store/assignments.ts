import { defineStore } from 'pinia';
import type {AssignmentsResponse, StudentsPerformanceResponse} from "~/types";

export const useAssignmentsStore = defineStore('assignments', () => {
    const assignment = ref();
    const studentsPerformance = ref();
    const token = useCookie('sb-access-token');

    const loadAssignmentsPerformance = async(id: string) => {
        try {
            const assignmentResponse = await $fetch<AssignmentsResponse>(`/api/v1/assignments/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            });
            const studentsPerformanceResponse = await $fetch<StudentsPerformanceResponse>(`/api/v1/student-performance/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            });
            assignment.value = assignmentResponse.data;
            studentsPerformance.value = studentsPerformanceResponse.data;
        } catch (error) {
            console.error('Failed to load:', error);
            throw error;
        }
    }

    return {assignment, studentsPerformance, loadAssignmentsPerformance}
});