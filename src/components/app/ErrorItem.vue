<template>
  <tr class="border-b-[1px]">
    <td class="text-center">{{ id }}</td>
    <td class="text-center" v-if="subappName">{{ subappName }}</td>
    <td class="text-center" v-else>[NULL]</td>
    <td class="text-center">{{ errorLevel }}</td>
    <td>{{ message }}</td>
    <td v-if="stackTrace">{{ stackTrace }}</td>
    <td v-else>[NULL]</td>
    <td>{{ createdAt.toFormat("dd/mm/yyyy HH:mm") }}</td>
  </tr>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";

defineProps<{
  id: number;
  appId: number;
  errorLevel: string;
  message: string;
  stackTrace: string | null;
  createdAt: DateTime;
  subappName: string | null;
}>();
</script>
