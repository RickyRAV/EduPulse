import { defineStore } from 'pinia';
import type {ApiResponse, SpecializationRequestBody, SpecializationsResponse} from "~/types";

export const useSpecializationsStore = defineStore('specializations', () => {
    const specializations = ref();
    const userSpecs = ref();
    const token = useCookie('sb-access-token');
    // console.log(token)
    const loadSpecializations = async () => {
        try {
            // First, fetch user specializations
            const userResponse = await $fetch<ApiResponse>('/api/v1/user-specializations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            });
            userSpecs.value = userResponse.data;

            // Fetch all specializations if user has none selected
            if (userSpecs.value.length === 0) {
                const allSpecsResponse = await $fetch<ApiResponse>('/api/v1/specializations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.value}`
                    }
                });
                specializations.value = allSpecsResponse.data;
            }
        } catch (error) {
            console.error('Failed to load specializations:', error);
            throw error;
        }
    }

    const submitSpecializations = async(body: SpecializationRequestBody) => {
        try {
            const { data } = await $fetch<SpecializationsResponse>('/api/v1/specializations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                },
                body: JSON.stringify(body)
            });
            console.log('Submission successful:', data);
        } catch (error) {
            console.error('Failed to submit specializations:', error);
            throw error;
        }
    }

    return {specializations, token, userSpecs, submitSpecializations, loadSpecializations};
});