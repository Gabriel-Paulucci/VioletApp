<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="w-[200px] bg-emerald-700">
      <DashboardMenu :apps="apps" />
    </div>
    <div class="grow bg-teal-50 overflow-y-scroll">
      <DashboardContainer> a </DashboardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import DashboardContainer from "@/components/dashboard/DashboardContainer.vue";
import { App, VioletApi } from "@/api/violet";
import { inject, onMounted, ref } from "vue";
import { useMainStore } from "@/store/mainStore";

const violetApi = inject<VioletApi>("violetApi");
const apps = ref<App[]>([]);
const store = useMainStore();

onMounted(async () => {
  if (!store.apps) {
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
  } else {
    apps.value = store.apps;
  }
});
</script>
