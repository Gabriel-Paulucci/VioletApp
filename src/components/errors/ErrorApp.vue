<template>
  <div class="group flex">
    <span class="grow"> {{ name }} </span>
    <div>
      <font-awesome-icon
        class="text-xs invisible group-hover:visible cursor-pointer"
        :icon="['fa', 'gear']"
        @click="$emit('edit', id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineProps<{
  id: number;
  name: string;
}>();
defineEmits<{
  (event: "edit", id: number): void;
}>();
</script>
