<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="w-[200px] bg-emerald-700">
      <DashboardMenu @my-apps="myApps" :apps="apps" />
    </div>
    <div class="grow bg-teal-50">
      <DashboardContainer>
        <slot></slot>
      </DashboardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import DashboardContainer from "@/components/dashboard/DashboardContainer.vue";
import { useRouter } from "vue-router";
import { App } from "@/api/violet";

const router = useRouter();

defineProps<{
  apps: App[];
}>();

function myApps() {
  router.push("/dashboard");
}
</script>
