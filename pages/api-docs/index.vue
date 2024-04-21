<script setup lang="ts">
import { onMounted } from 'vue';
import SwaggerUI from 'swagger-ui-dist/swagger-ui-bundle.js';
import 'swagger-ui-dist/swagger-ui.css';

onMounted(() => {
  SwaggerUI({
    dom_id: '#swagger-ui',
    url: '/openapi.yaml'
  });
});
</script>

<template>
  <div>
    <div id="swagger-ui"></div>
  </div>
</template>

<style scoped>

</style>