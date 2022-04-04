<template>
  <div class="flex flex-col h-full">
    <div class="grow-0">
      <span class="text-center block text-2xl my-2 text-emerald-200 font-bold"
        >Violet App</span
      >
    </div>
    <div class="grow">
      <button
        class="my-1 mx-auto block text-teal-100 hover:text-emerald-400"
        @click="$emit('myApps')"
      >
        My Apps
      </button>
      <div class="h-px w-[90%] bg-emerald-50 mx-auto my-3"></div>
      <div v-for="app in apps" :key="app.id" class="ml-7 text-sky-300">
        {{ app.name }}
      </div>
    </div>
    <div class="grow-0">
      <button class="my-1 mx-auto block">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { App } from "@/api/violet";

defineEmits<{
  (event: "myApps"): void;
}>();
defineProps<{
  apps: App[];
}>();
</script>
