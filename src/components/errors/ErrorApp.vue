<template>
  <div class="group flex">
    <span class="grow"> {{ name }} </span>
    <div>
      <font-awesome-icon
        class="text-sm invisible group-hover:visible hover:text-cyan-500 cursor-pointer"
        :icon="['fa', 'gear']"
        @click="$emit('edit', id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
}>();
defineEmits<{
  (event: "edit", id: number): void;
}>();
</script>
