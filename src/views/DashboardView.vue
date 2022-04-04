<template>
  <DashboardTemplate :apps="apps">a</DashboardTemplate>
</template>

<script setup lang="ts">
import { App, VioletApi } from "@/api/violet";
import DashboardTemplate from "@/components/dashboard/DashboardTemplate.vue";
import { useMainStore } from "@/store/mainStore";
import { inject, onMounted, ref } from "vue";

const violetApi = inject<VioletApi>("violetApi");
const apps = ref<App[]>([]);
const store = useMainStore();

onMounted(async () => {
  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    const res = await violetApi.getApps();
    store.apps = res;
    apps.value = store.apps;
  } catch (error) {
    console.log(error);
  }
});
</script>
