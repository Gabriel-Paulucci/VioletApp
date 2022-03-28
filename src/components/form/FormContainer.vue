<template>
  <form class="flex flex-col items-center bg-emerald-400 rounded p-4">
    <FormTitle :text="title" />
    <span class="text-red-700" v-if="error">{{ error }}</span>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import FormTitle from "./FormTitle.vue";
defineProps<{
  title: string;
  error?: string;
}>();
</script>
