<template>
  <div>
    <h1>Vue 3 + Vite</h1>
    <Button label="AAAAAA" />
    <Steps: model="items" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Steps from 'primevue/steps';


const items = ref([
    {
        label: 'Personal Info'
    },
    {
        label: 'Reservation'
    },
    {
        label: 'Review'
    }
]);
</script>
