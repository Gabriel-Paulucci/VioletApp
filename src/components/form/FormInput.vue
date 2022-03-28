<template>
  <input
    :value="modelValue"
    class="mt-2 px-2 mb-0 rounded border-2"
    v-bind:class="{ 'border-red-700': error }"
    v-bind:placeholder="placeholder"
    v-bind:type="type"
    @input="updateModelValue"
  />
  <span class="text-sm" v-if="error != ''">{{ error }}</span>
</template>

<script setup lang="ts">
type InputType = "text" | "email" | "password";

defineProps<{
  modelValue: string;
  placeholder: string;
  type: InputType;
  error?: string;
}>();

const emits = defineEmits(["update:modelValue"]);

function updateModelValue(value: Event) {
  emits("update:modelValue", (value.target as HTMLInputElement).value);
}
</script>
