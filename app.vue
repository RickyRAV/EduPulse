<template>
  <Toaster/>
  <div
      class="container relative flex h-svh flex-col items-center justify-center md:justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900"/>
      <div class="gap-2 relative z-20 flex items-center text-lg font-medium">
        <School/>
        EduPulse
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;Making an UI for OLLAMA is not enough&rdquo;
          </p>
          <footer class="text-sm">
            Robert Baumgartner
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Sign Up for Launch
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to sign up for the launch
          </p>
        </div>
        <UserAuthForm/>
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking Sign Up, you agree to selling your soul.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserAuthForm from './components/UserAuthForm.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import {School} from 'lucide-vue-next';

useSeoMeta({
  title: 'EduPulse',
  description: 'EduPulse is a revolutionary platform designed to manage and balance academic workload between teachers and pupils. It helps in monitoring student workload, offering insights into their efforts and study time, thereby promoting a healthier educational environment.',

  ogUrl: 'www.edupulse.rickyraveanu.com',
  ogTitle: 'EduPulse',
  ogDescription: 'EduPulse is a revolutionary platform designed to manage and balance academic workload between teachers and pupils. It helps in monitoring student workload, offering insights into their efforts and study time, thereby promoting a healthier educational environment.',
  ogSiteName: 'EduPulse',
  ogImage: 'https://edupulse.rickyraveanu.com/edupulse_og.png',
  ogLocale: 'en_US',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'EduPulse',

  robots: {
    index: true,
    follow: true,
    noarchive: true,
  },
})
</script>
