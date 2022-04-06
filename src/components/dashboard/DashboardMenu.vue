<template>
  <div class="flex flex-col h-full">
    <div class="grow-0">
      <router-link
        class="text-center block text-2xl my-2 mx-auto text-emerald-200 hover:text-emerald-400 font-bold"
        to="/dashboard"
      >
        Violet App
      </router-link>
    </div>
    <div class="grow">
      <div class="h-px w-[90%] bg-emerald-50 mx-auto my-3"></div>
      <AppItem
        v-for="app in apps"
        :key="app.id"
        class="mx-7 text-sky-300"
        :id="app.id"
        :name="app.name"
      />
    </div>
    <div class="grow-0">
      <button class="my-1 mx-auto block">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { App } from "@/api/violet";
import AppItem from "../app/AppItem.vue";

defineProps<{
  apps: App[];
}>();
</script>
