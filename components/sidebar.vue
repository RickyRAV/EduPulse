<script setup lang="ts">
import {cn} from "~/lib/utils";
import type {Class} from "~/types";

const props = defineProps<{
  courses: Class[]
}>();

</script>

<template>
  <div>
    <div :class="cn('pb-12', $attrs.class ?? '')" v-if="courses">
      <div class="space-y-4 py-4">
        <div class="px-3 py-2" v-for="group in props.courses" :key="group.name">
          <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
            {{ group.name }} {{ group.year }}
          </h2>
          <div v-for="course in group.course_details" :key="course.id" class="space-y-1">
            <Button class="w-full justify-start">
              {{ course.name }}
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-3" v-else>
      <Skeleton class="h-[125px] w-[250px] rounded-xl"/>
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]"/>
        <Skeleton class="h-4 w-[200px]"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>