<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {useAssignmentsStore} from "~/store/assignments";
import {BarChart} from "~/components/ui/chart-bar";

const assignmentsStore = useAssignmentsStore();
const route = useRoute();

onMounted(async () => {
  await assignmentsStore.loadAssignments(route.params.id as string);
});
console.log(assignmentsStore.assignment);
</script>

<template>
  <NuxtLayout>
    <div class="hidden md:block">
      <div class="bg-background">
        <div class="grid">
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
                <Table>
                  <TableCaption>A list of your assignments.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        Assignment
                      </TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Time (hrs)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="item in assignmentsStore.assignment" :key="item.id">
                      <TableCell class="font-medium">
                        {{ item.title }}
                      </TableCell>
                      <TableCell>{{ item.difficulty }}</TableCell>
                      <TableCell>{{ item.max_hours }}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="analytics" class="space-y-4">
                <BarChart :data="assignmentsStore.assignment" index="title" :categories="['', 'max_hours']" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>