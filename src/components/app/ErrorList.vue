<template>
  <div class="pt-12 px-8">
    <table class="w-full table-auto mx-auto">
      <thead class="bg-cyan-700">
        <th class="w-[25px]">Id</th>
        <th class="w-[90px]">Sub App</th>
        <th class="w-[65px]">Level</th>
        <th class="text-left">Message</th>
        <th class="text-left">Stack Trace</th>
        <th class="w-[130px]">Created At</th>
      </thead>
      <tbody>
        <ErrorItem v-for="(error, i) in errors" :key="i" v-bind="error" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { AppError } from "@/api/violet";
import ErrorItem from "./ErrorItem.vue";

defineProps<{
  errors: AppError[];
}>();
</script>
