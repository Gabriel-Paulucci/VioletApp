<template>
  <h1 class="text-teal-800">{{ text }}</h1>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
