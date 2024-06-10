<script setup lang="ts">
import {cn} from "~/lib/utils";
import type {Class} from "~/types";
import {School} from "lucide-vue-next";

const props = defineProps<{
  courses: Class[]
}>();

</script>

<template>
  <nav class="h-screen">
    <div class="flex items-center mt-4 px-7">
      <UserAvatar />
      <span class="ml-2 text-2xl font-semibold">EduPulse</span>
    </div>
    <div v-if="courses">
      <div class="space-y-4 py-4">
        <div class="px-3" v-for="group in props.courses" :key="group.name">
          <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
            {{ group.name }} {{ group.year }}
          </h2>
          <div v-for="course in group.course_details" :key="course.id" class="space-y-1">
            <NuxtLink :to="`/teacher/courses/${course.id}`">
              <Button class="w-full justify-start text-sm" variant="ghost">
                {{ course.name }}
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class='flex flex-col px-3 py-2' v-else>
      <Skeleton class='mb-5 flex h-9 w-40 rounded-full' />
      <Skeleton class='mb-5 flex h-5 w-20 rounded-full' />
    </div>
  </nav>
</template>

<style scoped>

</style>