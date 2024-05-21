<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useSpecializationsStore} from "~/store/specializations";
import {ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot} from 'radix-vue'
import {CommandEmpty, CommandGroup, CommandItem, CommandList} from '@/components/ui/command'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import {CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {School} from "lucide-vue-next";
import {toast} from "~/components/ui/toast";

const specializationsStore = useSpecializationsStore();

onMounted(async () => {
  await specializationsStore.fetchSpecializations();
  console.log(specializationsStore.specializations)
})

const supabase = useSupabaseClient();
const modelValue = ref<string[]>([])
const open = ref(false);
const searchTerm = ref('')

const filteredSpecializations = computed(() => specializationsStore.specializations.filter((i: {
  name: string
}) => !modelValue.value.includes(i.name)))

const handleContinue = async () => {
  try {
    const {data: {user}} = await supabase.auth.getUser(specializationsStore.token!);
    const specializationIds = modelValue.value.map(name => {
      const found = specializationsStore.specializations.find(spec => spec.name === name);
      return found ? found.id : '';
    }).filter(id => id !== '');
    // Use correct field names expected by the backend
    const body = {
      teacher: user?.id!,  // Backend expects 'teacher', not 'teacherId'
      specializations: specializationIds  // Backend expects 'specializations', not 'specializationIds'
    }
    await specializationsStore.submitSpecializations(body);
  } catch (error) {
    toast({
      title: 'Something went wrong!',
      description: `${error}`,
      variant: 'destructive'
    })
  }
};
</script>

<template>
  <Card class="w-auto rounded-lg p-4 sm:w-[450px]">
    <CardHeader class="pb-5">
      <CardTitle class="text-3xl text-center">
        <School class="mx-auto" :size="48"/>
        EduPulse
      </CardTitle>
      <CardDescription className='pb-2 pt-1 text-gray-500 dark:text-gray-400 text-center'>
        Please select your specialization(s).
      </CardDescription>
      <div class='border-b-[0.5px] border-white border-opacity-70 pb-1 pt-1'></div>
    </CardHeader>
    <CardContent>
      <TagsInput class="px-0 gap-0 w-100 mb-5" :model-value="modelValue">
        <div class="flex gap-2 flex-wrap items-center px-3">
          <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
            <TagsInputItemText/>
            <TagsInputItemDelete/>
          </TagsInputItem>
        </div>

        <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
          <ComboboxAnchor as-child>
            <ComboboxInput placeholder="Specialization..." as-child>
              <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent/>
            </ComboboxInput>
          </ComboboxAnchor>

          <ComboboxPortal>
            <CommandList
                position="popper"
                class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            >
              <CommandEmpty/>
              <CommandGroup>
                <CommandItem
                    v-for="specialization in filteredSpecializations" :key="specialization.id"
                    :value="specialization.name"
                    @select.prevent="(ev) => {
                      if (typeof ev.detail.value === 'string') {
                        searchTerm = ''
                        modelValue.push(ev.detail.value)
                      }

                      if (filteredSpecializations.length < 5) {
                        open = false
                      }
                    }"
                >
                  {{ specialization.name }}

                </CommandItem>
              </CommandGroup>
            </CommandList>
          </ComboboxPortal>
        </ComboboxRoot>
      </TagsInput>
      <Button class="w-full p-5 text-center text-xl font-[550] active:bg-primary/80" @click="handleContinue">Continue
      </Button>
    </CardContent>
  </Card>
</template>