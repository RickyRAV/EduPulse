<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'
import {Eye, EyeOff, Github, School} from 'lucide-vue-next';
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {useToast} from '@/components/ui/toast/use-toast'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

const supabase = useSupabaseClient();

const isANewUser = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const emailRef = ref('');
const passwordRef = ref('');
const confirmPasswordRef = ref('');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const {toast} = useToast();
const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
  confirmPassword: z.string().optional()
}));
const {handleSubmit} = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const email = emailRef?.value!;
    const password = passwordRef?.value!;
    const confirmPassword = confirmPasswordRef?.value!;
    if (!email || !password || (isANewUser && !confirmPassword)) {
      toast({
        title: 'Please fill out all the fields',
        variant: 'destructive'
      });
      return;
    }
    if (isANewUser) {
      if (password !== confirmPassword) {
        toast({
          title: 'Your Passwords do not match',
          variant: 'destructive'
        });
        return;
      } else {
        try {
          try {
            const {data: {user}, error} = await supabase.auth.signUp({
              email, password
            });
            showToast(
                'success',
                'Account Created',
                'Your account has been created! Please check your inbox for a confirmation email.',
            );
            if (error) {
              toast({
                title: error.message,
                variant: 'destructive'
              });
            }
            // refresh router
            // reloadNuxtApp();
          } catch (error) {
            toast({
              title: error as string,
              variant: 'destructive'
            })
            console.error(error);
          }
        } catch (error) {
          toast({
            title: 'Error signing up. Please try again.'
          });
        }
      }
    } else {
      try {
        const {data: {user}, error} = await supabase.auth.signInWithPassword({
          email, password
        });
        if (error) {
          toast({
            title: error.message,
            variant: 'destructive'
          });
        }
        reloadNuxtApp();
      } catch (error) {
        toast({
          title: error as string,
          variant: 'destructive'
        })
        console.error(error);
      }
    }
  } catch (error) {
    alert(error)
  }
});

const session = (await supabase.auth.getSession()).data.session;
if(session) {
  navigateTo('/')
}
</script>

<template>
  <div>
    <Tabs default-value="signup" class="w-auto sm:w-[450px]">
      <TabsList class="grid w-full grid-cols-2 rounded-lg border-none">
        <TabsTrigger value="signup" class="data-[state=active]:bg-primary data-[state=active]:text-accent">Sign Up
        </TabsTrigger>
        <TabsTrigger value="signin" class="data-[state=active]:bg-primary data-[state=active]:text-accent">Sign In
        </TabsTrigger>
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
            <form @submit.prevent="onSubmit">
              <FormField class="mb-5" v-slot="{componentField}" name="email">
                <FormItem v-auto-animate>
                  <FormLabel for="email" class="mb-1.5 font-thin">Email</FormLabel>
                  <FormControl>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter your Email Address"
                        class="border-2 font-medium placeholder:text-white placeholder:opacity-70"
                        v-model="emailRef"
                        v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <FormField v-slot="{componentField}" name="password">
                <FormItem class="relative mb-5" v-auto-animate>
                  <FormLabel for="password" class="font-thin mb-1.5">
                    Password
                  </FormLabel>
                  <div class="relative w-full max-w-sm items-center">
                    <FormControl>
                      <Input
                          id="password"
                          placeholder="Enter your Password"
                          class="border-2 pr-8 font-medium placeholder:text-white placeholder:opacity-70"
                          :type="showPassword ? 'text' : 'password'"
                          v-model="passwordRef"
                          v-bind="componentField"
                      />
                      <Button type="button" @click="togglePasswordVisibility"
                              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 hover:bg-neutral-500/15"
                              size="icon" variant="ghost">
                        <Eye v-if="showPassword"/>
                        <EyeOff v-else/>
                        <span class='sr-only'>
                            Toggle password visibility
                          </span>
                      </Button>
                    </FormControl>
                  </div>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <Button type="submit" class="w-full p-5 text-center text-xl font-[550] active:bg-primary/80">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
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
            <form @submit.prevent="onSubmit">
              <FormField class="mb-5" v-slot="{componentField}" name="email">
                <FormItem v-auto-animate>
                  <FormLabel for="email" class="mb-1.5 font-thin">Email</FormLabel>
                  <FormControl>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter your Email Address"
                        class="border-2 font-medium placeholder:text-white placeholder:opacity-70"
                        v-model="emailRef"
                        v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <FormField v-slot="{componentField}" name="password">
                <FormItem class="relative mb-5" v-auto-animate>
                  <FormLabel for="password" class="font-thin mb-1.5">
                    Password
                  </FormLabel>
                  <div class="relative w-full max-w-sm items-center">
                    <FormControl>
                      <Input
                          id="password"
                          placeholder="Enter your Password"
                          class="border-2 pr-8 font-medium placeholder:text-white placeholder:opacity-70"
                          :type="showPassword ? 'text' : 'password'"
                          v-model="passwordRef"
                          v-bind="componentField"
                      />
                      <Button type="button" @click="togglePasswordVisibility"
                              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 hover:bg-neutral-500/15"
                              size="icon" variant="ghost">
                        <Eye v-if="showPassword"/>
                        <EyeOff v-else/>
                        <span class='sr-only'>
                            Toggle password visibility
                          </span>
                      </Button>
                    </FormControl>
                  </div>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <FormField v-slot="{componentField}" name="confirmPassword">
                <FormItem class="relative mb-5" v-auto-animate>
                  <FormLabel for="confirmPassword" class="font-thin mb-1.5">
                    Confirm Password
                  </FormLabel>
                  <div class="relative w-full max-w-sm items-center">
                    <FormControl>
                      <Input
                          id="confirmPassword"
                          placeholder="Confirm your Password"
                          class="border-2 pr-8 font-medium placeholder:text-white placeholder:opacity-70"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          v-model="confirmPasswordRef"
                          v-bind="componentField"
                      />
                      <Button type="button" @click="toggleConfirmPasswordVisibility"
                              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 hover:bg-neutral-500/15"
                              size="icon" variant="ghost">
                        <Eye v-if="showConfirmPassword"/>
                        <EyeOff v-else/>
                        <span class='sr-only'>
                            Toggle password visibility
                          </span>
                      </Button>
                    </FormControl>
                  </div>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <Button type="submit" class="w-full p-5 text-center text-xl font-[550] active:bg-primary/80">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
