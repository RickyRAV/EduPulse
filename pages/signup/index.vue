<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {Github, School} from 'lucide-vue-next';
</script>

<template>
  <div>
    <Tabs default-value="singup" class="w-auto sm:w-[450px]">
      <TabsList class="grid w-full grid-cols-2 rounded-lg border-none">
        <TabsTrigger value="signup" class="data-[state=active]:bg-primary data-[state=active]:text-accent">Sign Up</TabsTrigger>
        <TabsTrigger value="signin" class="data-[state=active]:bg-primary data-[state=active]:text-accent">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card class="w-auto rounded-lg p-4 sm:w-[450px]">
          <CardHeader class="pb-5">
            <CardTitle class="text-3xl text-center">
              <School class="mx-auto" :size="48"/>
              EduPulse
            </CardTitle>
            <CardDescription className='pb-2 pt-1 text-gray-500 dark:text-gray-400'>
              Sign in to access your courses and assignments.
            </CardDescription>
            <Button class="p-5 hover:bg-[#fafafa]/90 active:bg-[#fafafa]/80">
              <div class='place-content-center text-3xl'>
                <Github/>
              </div>
            </Button>
            <div class='border-b-[0.5px] border-white border-opacity-70 pb-1 pt-1'></div>
          </CardHeader>
          <CardContent>
            <form>
              <div>
                <div class="mb-5">
                  <div class="mb-1.5">
                    <Label for="email" class="font-thin">Email</Label>
                  </div>
                  <Input
                      type="email"
                      id="email"
                      placeholder="Enter your Email Address"
                      class="border-2 font-medium placeholder:text-white placeholder:opacity-70"/>
                </div>
                <div class="relative mb-5">
                  <div class="mb-1.5">
                    <Label for="password" class="font-thin">
                      Password
                    </Label>
                  </div>
                  <Input
                      type="password"
                      id="password"
                      placeholder="Enter your Password"
                      class="border-2 pr-8 font-medium placeholder:text-white placeholder:opacity-70"
                  />
                  <Button type="button" class="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost">
                    <span class='sr-only'>
                      Toggle password visibility
                    </span>
                  </Button>
                </div>
              </div>
              <Button type="submit" class="w-full p-5 text-center text-xl font-[550] active:bg-primary/80">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>