<template>
  <div class="group flex">
    <router-link class="grow" :to="`/erros/${id}`">
      {{ name }}
    </router-link>
    <router-link :to="`/tokens/${id}`">
      <font-awesome-icon
        class="text-sm invisible group-hover:visible hover:text-cyan-500 cursor-pointer"
        :icon="['fa', 'gear']"
        @click="$emit('config', id)"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
}>();
</script>
