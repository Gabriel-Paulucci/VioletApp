<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="w-[200px] bg-emerald-700">
      <DashboardMenu :apps="apps" />
    </div>
    <div class="grow bg-teal-50 overflow-y-scroll">
      <DashboardContainer>
        <ErrorList :errors="errors" />
      </DashboardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import DashboardContainer from "@/components/dashboard/DashboardContainer.vue";
import { App, AppError, VioletApi } from "@/api/violet";
import { inject, onMounted, ref, watch } from "vue";
import { useMainStore } from "@/store/mainStore";
import { useRoute } from "vue-router";
import ErrorList from "@/components/app/ErrorList.vue";

const violetApi = inject<VioletApi>("violetApi");
const apps = ref<App[]>([]);
const errors = ref<AppError[]>([]);
const store = useMainStore();
const route = useRoute();

async function fetchAppErrors(id: number) {
  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    const res = await violetApi.getAppErrors(id);
    errors.value = res;
  } catch (error) {
    console.log(error);
  }
}

watch(
  () => route.params.id,
  async (id) => {
    const newId = Number(id);

    if (isNaN(newId)) {
      return;
    }

    await fetchAppErrors(newId);
  }
);

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

  const newId = Number(route.params.id);

  if (isNaN(newId)) {
    return;
  }

  await fetchAppErrors(newId);
});
</script>
