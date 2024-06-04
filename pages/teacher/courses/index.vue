<script setup lang="ts">
import {useCoursesStore} from "~/store/courses";
import Sidebar from "~/components/sidebar.vue";

const coursesStore = useCoursesStore();

onMounted(async () => {
  await coursesStore.loadCourses();
})
</script>

<template>
  <div class="hidden md:block">
    <div class="bg-background">
      <div class="grid lg:grid-cols-6">
        <Sidebar :courses="coursesStore.course" class="hidden lg:block border-r"/>
        <div class="flex-1 space-y-4 p-8 pt-6">
          <div class="flex items-center justify-between space-y-2">
            <h2 class="text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
          </div>
          <Tabs default-value="assignments" class="space-y-4">
            <TabsList>
              <TabsTrigger value="assignments">
                Assignments
              </TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assignments" class="space-y-4">
<!--              TODO MAKE IT LOOK LIKE GOOGLE CLASSROOM ALMOST WITH THE ROUTER ID AND SHIT-->
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>