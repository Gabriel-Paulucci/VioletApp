<template>
  <div class="group flex">
    <span class="grow"> {{ name }} </span>
    <div>
      <router-link :to="`/submodules/${id}`">
        <font-awesome-icon
          class="text-sm invisible group-hover:visible hover:text-cyan-500 cursor-pointer"
          :icon="['fa', 'gear']"
          @click="$emit('config', id)"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
}>();
</script>
