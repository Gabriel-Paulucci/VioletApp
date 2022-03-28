<template>
  <form class="flex flex-col items-center bg-emerald-400 rounded p-4">
    <FormTitle :text="title" />
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import FormTitle from "./FormTitle.vue";
defineProps<{
  title: string;
}>();
</script>
