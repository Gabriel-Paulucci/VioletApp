<template>
  <tr class="border-b-[1px]">
    <td v-if="subappName">
      {{ subappName }}
    </td>
    <td class="text-gray-500" v-else>[NULL]</td>
    <td class="flex items-center" v-if="newToken">
      <div class="grow">
        {{ `${token.substring(0, 5)}...` }}
      </div>
      <font-awesome-icon
        class="text-sky-300 hover:text-sky-500 mx-1 cursor-pointer"
        :icon="['fa', 'copy']"
        @click="copy(token)"
      />
    </td>
    <td v-else>{{ token }}</td>
    <td class="text-center">{{ permitCors }}</td>
    <td class="text-center">
      <font-awesome-icon
        :icon="['fa', 'edit']"
        class="text-sky-300 hover:text-sky-500 mx-1 cursor-pointer"
        @click="$emit('config', appId)"
      />
      <font-awesome-icon
        :icon="['fa', 'trash-can']"
        class="text-red-300 hover:text-red-500 mx-1 cursor-pointer"
        @click="$emit('delete', appId)"
      />
      <font-awesome-icon
        :icon="['fa', 'rotate-right']"
        class="text-green-300 hover:text-green-500 mx-1 cursor-pointer"
        @click="$emit('regen', appId)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  token: string;
  appId: number;
  permitCors: boolean;
  subappName: string | null;
  newToken: boolean;
}>();
defineEmits<{
  (event: "config", id: number): void;
  (event: "delete", id: number): void;
  (event: "regen", id: number): void;
}>();

function copy(text: string) {
  navigator.clipboard.writeText(text);
}
</script>
