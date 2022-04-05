<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="w-[200px] bg-emerald-700">
      <DashboardMenu :apps="apps" @edit="edit" />
    </div>
    <div class="grow bg-teal-50">
      <DashboardContainer>
        <slot></slot>
      </DashboardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { App, VioletApi } from "@/api/violet";
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import DashboardContainer from "@/components/dashboard/DashboardContainer.vue";
import { useMainStore } from "@/store/mainStore";
import { inject, onMounted, ref } from "vue";

const violetApi = inject<VioletApi>("violetApi");
const apps = ref<App[]>([]);
const store = useMainStore();

async function edit(id: number) {
  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }
  try {
    const appTokens = await violetApi.getAppTokens(id);
    console.log(appTokens);
  } catch (error) {
    console.log(error);
  }
}

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
