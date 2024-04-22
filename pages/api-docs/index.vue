<script setup lang="ts">
import {onMounted} from 'vue';
import {SwaggerUIBundle} from 'swagger-ui-dist'
import 'swagger-ui-dist/swagger-ui.css';

onMounted(() => {
  SwaggerUIBundle({
    dom_id: '#swagger-ui',
    url: '/openapi.yaml'
  });
});
</script>

<template>
  <div id="swagger-ui">
    <!-- Swagger UI will be mounted here -->
  </div>
</template>

<style scoped>
* {
  background: white;
}
</style>