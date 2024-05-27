<script setup lang="ts">
import {School} from 'lucide-vue-next';
import {useCoursesStore} from "~/store/courses";
import { Separator } from '@/components/ui/separator'
import {cn} from "~/lib/utils";
import Sidebar from "~/components/sidebar.vue";

const coursesStore = useCoursesStore();

onMounted(async () => {
  await coursesStore.loadCourses();
})
</script>

<template>
  <div>
    <Sidebar :courses="coursesStore.course" />
  </div>
</template>

<style scoped>

</style>