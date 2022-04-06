<template>
  <div class="pt-12">
    <table class="w-full max-w-[600px] table-auto mx-auto">
      <thead class="bg-cyan-700">
        <th class="w-[30px] text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="w-[150px] text-left">Token</th>
        <th class="w-[60px]">CORS</th>
        <th class="w-[100px]">Actions</th>
      </thead>
      <tbody>
        <tr class="border-b-[1px]" v-for="token in tokens" :key="token.token">
          <td>{{ token.appId }}</td>
          <td>{{ token.subappName }}</td>
          <td class="flex items-center" v-if="token.new">
            <div class="grow">
              {{ `${token.token.substring(0, 5)}...` }}
            </div>
            <font-awesome-icon
              class="text-sky-300 hover:text-sky-500 mx-1 cursor-pointer"
              :icon="['fa', 'copy']"
              @click="copy(token.token)"
            />
          </td>
          <td v-else>{{ token.token }}</td>
          <td class="text-center">{{ token.permitCors }}</td>
          <td class="text-center">
            <font-awesome-icon
              :icon="['fa', 'edit']"
              class="text-sky-300 hover:text-sky-500 mx-1 cursor-pointer"
              @click="$emit('config', token.appId)"
            />
            <font-awesome-icon
              :icon="['fa', 'trash-can']"
              class="text-red-300 hover:text-red-500 mx-1 cursor-pointer"
              @click="$emit('delete', token.appId)"
            />
            <font-awesome-icon
              :icon="['fa', 'rotate-right']"
              class="text-green-300 hover:text-green-500 mx-1 cursor-pointer"
              @click="$emit('regen', token.appId)"
            />
          </td>
        </tr>
        <tr class="border-b-[1px]">
          <td></td>
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

function copy(text: string) {
  navigator.clipboard.writeText(text);
}
</script>
