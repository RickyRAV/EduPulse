<script setup lang="ts">

import {useCoursesStore} from "~/store/courses";
import Sidebar from "~/components/sidebar.vue";

const coursesStore = useCoursesStore();

onMounted(async () => {
  await coursesStore.loadCourses();
})
</script>

<template>
  <div class="flex h-screen">
    <aside>
      <Sidebar :courses="coursesStore.course" class="hidden lg:block border-r"/>
    </aside>
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>



<style scoped>

</style>