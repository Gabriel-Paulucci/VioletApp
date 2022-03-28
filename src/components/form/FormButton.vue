<template>
  <button
    class="rounded px-2 py-1 my-2 bg-emerald-700 text-white w-fit mx-auto"
    type="submit"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
