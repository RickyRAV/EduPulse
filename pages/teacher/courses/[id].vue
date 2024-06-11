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
import {DonutChart} from "~/components/ui/chart-donut";
import type {Assignment, StudentsPerformance} from "~/types";

const assignmentsStore = useAssignmentsStore();
const route = useRoute();

type ChartData = Assignment & StudentsPerformance;

let chartData: ChartData[] = [] as ChartData[];
//did not really question chat gpt about it, just copy pasted it
let chartCategories: (keyof Assignment | keyof StudentsPerformance)[] = ['avg_student_hours', 'max_hours'] as (keyof Assignment | keyof StudentsPerformance)[];
//

onMounted(async () => {
  await assignmentsStore.loadAssignmentsPerformance(route.params.id as string);

  chartData = assignmentsStore.assignment.map((item: Assignment, index: number) => {
    return {
      ...item,
      avg_student_hours: assignmentsStore.studentsPerformance[index]?.avg_student_hours,
      avg_student_difficulty: assignmentsStore.studentsPerformance[index]?.avg_student_difficulty
    };
  });
});
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
                <BarChart :data="chartData" index="title" :categories="chartCategories" />
                <DonutChart index="title" :category="'difficulty'" :data="assignmentsStore.assignment"/>
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