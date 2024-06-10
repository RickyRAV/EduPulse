import { defineStore } from 'pinia';
import type {AssignmentsResponse} from "~/types";

export const useAssignmentsStore = defineStore('assignments', () => {
    const assignment = ref();
    const token = useCookie('sb-access-token');

    const loadAssignments = async(id: string) => {
        try {

            const assignmentResponse = await $fetch<AssignmentsResponse>(`/api/v1/assignments/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            });
            assignment.value = assignmentResponse.data;
        } catch (error) {
            console.error('Failed to load assignments:', error);
            throw error;
        }
    }

    return {assignment, loadAssignments}
});