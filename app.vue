<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

// DRY Don't Repeat Yourself
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
    maxVideoPreview: -1,
    maxImagePreview: 'large',
    maxSnippet: -1,
  },
})
</script>
