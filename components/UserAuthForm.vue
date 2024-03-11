<script setup lang="ts">
//import { h } from 'vue';
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {FormField,} from '@/components/ui/form';
import {showToast} from "~/utils/show-toast";
import { Resend } from 'resend';

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
}));

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const resend = new Resend('RESEND_API_KEY');
const createContact = async(mail: string) => {
  await resend.contacts.create({
    email: mail,
    unsubscribed: false,
    audienceId: 'RESEND_AUDIENCE_ID'
  })
}

const onSubmit = handleSubmit((values) => {
  showToast(
      'success',
      'Email Submitted Successfully',
      'Thank you for signing up!'
  )
  resetForm();
  //createContact(values.email);
});
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label class="sr-only" for="email">
              Email
            </Label>
            <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                auto-capitalize="none"
                auto-complete="email"
                auto-correct="off"
                v-bind="componentField"
            />
          </div>
          <Button type="submit">
            Sign Up with Email
          </Button>
        </div>
      </FormField>
    </form>
<!--    <div class="relative">-->
<!--      <div class="absolute inset-0 flex items-center">-->
<!--        <span class="w-full border-t" />-->
<!--      </div>-->
<!--      <div class="relative flex justify-center text-xs uppercase">-->
<!--        <span class="bg-background px-2 text-muted-foreground">-->
<!--          Or continue with-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <Button variant="outline" type="button">-->
<!--      <GithubLogoIcon class="mr-2 h-4 w-4" />-->
<!--      GitHub-->
<!--    </Button>-->
  </div>
</template>

<style scoped>

</style>