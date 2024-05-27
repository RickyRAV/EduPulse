<script setup lang="ts">
import {School} from 'lucide-vue-next';
import {useCoursesStore} from "~/store/courses";
import {courses} from "../../../drizzle/schema";

const coursesStore = useCoursesStore();

onMounted(async () => {
  await coursesStore.loadCourses();
})
</script>

<template>
  <p>{{coursesStore.course}}</p>
  <div>
    <nav class="w-64 bg-gray-800 text-white p-6">
      <div class="flex items-center mb-8">
        <School :size="24"/>
        <span class="ml-2 text-xl font-semibold">EduPulse</span>
      </div>
      <ul>
        <li v-for="course in coursesStore.course" :key="course.id" class="flex items-center mb-2">
          <span class="ml-2">{{ course.name }} ({{ course.class }} {{ course.year }})</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

</style>