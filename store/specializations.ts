import { defineStore } from 'pinia';
import type {ApiResponse, DataItem, SpecializationRequestBody, SpecializationsResponse} from "~/types";

export const useSpecializationsStore = defineStore('specializations', () => {
    const specializations = ref();
    const token = useCookie('sb-access-token');
    // console.log(token)
    const fetchSpecializations = async() => {
        try{
            const {data} = await $fetch<ApiResponse>('/api/v1/specializations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.value}`
                }
            })
            specializations.value = data;
        } catch(error) {
            console.error(error)
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

    return {specializations, token, fetchSpecializations, submitSpecializations};
});