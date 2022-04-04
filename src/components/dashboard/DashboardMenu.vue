<template>
  <div class="flex flex-col h-full">
    <div class="grow-0">
      <span class="text-center block text-2xl my-2 text-emerald-200 font-bold"
        >Violet App</span
      >
    </div>
    <div class="grow">
      <button class="my-1 mx-auto block" @click="$emit('myApps')">
        My App
      </button>
    </div>
    <div class="grow-0">
      <button class="my-1 mx-auto block">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (event: "myApps"): void;
}>();
</script>
