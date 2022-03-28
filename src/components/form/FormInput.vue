<template>
  <input
    :value="modelValue"
    class="my-2 px-2 rounded border-2"
    v-bind:class="{ 'border-red-700': error }"
    v-bind:placeholder="placeholder"
    v-bind:type="type"
    @input="updateModelValue"
  />
</template>

<script setup lang="ts">
type InputType = "text" | "email" | "password";

defineProps<{
  modelValue: string;
  placeholder: string;
  type: InputType;
  error?: boolean;
}>();

const emits = defineEmits(["update:modelValue"]);

function updateModelValue(value: Event) {
  emits("update:modelValue", (value.target as HTMLInputElement).value);
}
</script>
