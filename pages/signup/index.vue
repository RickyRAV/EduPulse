<script setup lang="ts">
import SignUpCard from "~/components/sign-up-card.vue";
import type {JwtPayload} from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  user_role: string;
}

const supabase = useSupabaseClient();
const session = (await supabase.auth.getSession()).data.session;

if (session) {
  const {user_role} = jwtDecode<CustomJwtPayload>(session.access_token);
  if (user_role === 'student') {
    navigateTo('/student')
  } else if (user_role === 'teacher') {
    navigateTo('/teacher')
  }
}
</script>

<template>
  <div>
    <SignUpCard/>
  </div>
</template>