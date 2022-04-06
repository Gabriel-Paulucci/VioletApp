<template>
  <div class="pt-12">
    <table class="w-full max-w-[600px] table-auto mx-auto">
      <thead class="bg-cyan-700">
        <th class="text-left">Name</th>
        <th class="w-[150px] text-left">Token</th>
        <th class="w-[60px]">CORS</th>
        <th class="w-[100px]">Actions</th>
      </thead>
      <tbody>
        <TokenItem
          v-for="(token, i) in tokens"
          :key="i"
          v-bind="token"
          @config="(id) => $emit('config', id)"
          @delete="(id) => $emit('delete', id)"
          @regen="(id) => $emit('regen', id)"
        />
        <tr class="border-b-[1px]">
          <td>
            <div
              class="px-4 rounded-lg"
              :class="{ 'bg-teal-100': !error, 'bg-red-100': error }"
            >
              <input
                class="w-full bg-transparent"
                type="text"
                placeholder="Name"
                v-model="name"
              />
            </div>
          </td>
          <td></td>
          <td class="text-center">
            <input type="checkbox" v-model="cors" />
          </td>
          <td class="text-center">
            <font-awesome-icon
              :icon="['fa', 'plus']"
              class="text-green-300 hover:text-green-500 mx-1 cursor-pointer"
              @click="newToken"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { AppToken } from "@/api/violet";
import { ref } from "vue";
import TokenItem from "./TokenItem.vue";

defineProps<{
  tokens: AppToken[];
}>();
const emit = defineEmits<{
  (event: "config", id: number): void;
  (event: "delete", id: number): void;
  (event: "regen", id: number): void;
  (event: "new", name: string, cors: boolean): void;
}>();

const name = ref("");
const cors = ref(false);
const error = ref(false);

function newToken() {
  if (name.value.length > 255) {
    error.value = true;
    return;
  }
  emit("new", name.value, cors.value);
  error.value = false;
  name.value = "";
  cors.value = false;
}
</script>
