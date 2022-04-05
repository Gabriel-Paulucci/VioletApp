<template>
  <div class="pt-12">
    <table class="w-full max-w-[600px] table-auto mx-auto">
      <thead class="bg-cyan-700">
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="text-left">Token</th>
        <th class="text-left">CORS</th>
        <th class="w-[100px]">Actions</th>
      </thead>
      <tbody>
        <tr v-for="token in tokens" :key="token.appId">
          <td>{{ token.appId }}</td>
          <td>{{ token.subappName }}</td>
          <td>{{ token.token }}</td>
          <td>{{ token.permitCors }}</td>
          <td class="text-center">
            <font-awesome-icon
              :icon="['fa', 'edit']"
              class="text-sky-300 hover:text-sky-500 mx-1 cursor-pointer"
              @click="$emit('edit', token.appId)"
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
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { AppToken } from "@/api/violet";

defineProps<{
  tokens: AppToken[];
}>();
defineEmits<{
  (event: "edit", id: number): void;
  (event: "delete", id: number): void;
  (event: "regen", id: number): void;
}>();
</script>
