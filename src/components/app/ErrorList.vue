<template>
  <div class="pt-12 px-8">
    <table class="w-full table-auto mx-auto">
      <thead class="bg-cyan-700">
        <th>Id</th>
        <th>Error Level</th>
        <th>Message</th>
        <th>Stack Trace</th>
        <th>Created At</th>
        <th>Subapp Name</th>
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
