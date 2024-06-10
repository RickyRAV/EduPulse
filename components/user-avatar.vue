<script setup lang="ts">
const supabase = useSupabaseClient()
import {CircleUserRound, LogOut} from 'lucide-vue-next';

const currentUser = useSupabaseUser();
// console.log(currentUser.value)
const handleSignOut = async () => {
  try {
    const {error} = await supabase.auth.signOut();
    navigateTo('/signup')
  } catch (error: unknown) {
    alert(error)
  }
}
</script>

<template>
  <Avatar v-if="currentUser">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class='relative aspect-square h-full w-full'>
          <NuxtImg
              v-if="currentUser?.user_metadata.avatar_url"
              priority
              :src="currentUser.user_metadata.avatar_url"
              fill
              alt='user'
              referrerPolicy='no-referrer'
          />
          <CircleUserRound v-else class='h-full w-full' :size="38"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel v-if="currentUser.user_metadata.name">{{currentUser.user_metadata.name}}</DropdownMenuLabel>
        <DropdownMenuLabel>{{currentUser.email}}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
            @click="handleSignOut"
            class="gap-2"
        >
          Sign out
          <LogOut :size="18"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Avatar>
</template>

<style scoped>

</style>