<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="w-[200px] bg-emerald-700">
      <DashboardMenu :apps="apps" @app-added="(app) => apps.push(app)" />
    </div>
    <div class="grow bg-teal-50 overflow-y-scroll">
      <DashboardContainer>
        <TokenList :tokens="appTokens" @new="newAppToken" />
      </DashboardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { App, AppToken, VioletApi } from "@/api/violet";
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import DashboardContainer from "@/components/dashboard/DashboardContainer.vue";
import { useMainStore } from "@/store/mainStore";
import { inject, onMounted, ref, watch } from "vue";
import TokenList from "@/components/app/TokenList.vue";
import { useRoute } from "vue-router";

const violetApi = inject<VioletApi>("violetApi");
const apps = ref<App[]>([]);
const appTokens = ref<AppToken[]>([]);
const store = useMainStore();
const route = useRoute();

async function newAppToken(name: string, cors: boolean) {
  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    const res = await violetApi.createAppToken(
      Number(route.params.id),
      name,
      cors
    );
    appTokens.value.push(res);
  } catch (error) {
    console.log(error);
  }
}

async function fetchAppTokens(id: number) {
  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    const res = await violetApi.getAppTokens(id);
    appTokens.value = res;
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

    await fetchAppTokens(newId);
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

  await fetchAppTokens(newId);
});
</script>
