<template>
  <div class="flex flex-col h-full">
    <div class="grow-0">
      <router-link
        class="text-center block text-2xl my-2 mx-auto text-emerald-200 hover:text-emerald-400 font-bold"
        to="/dashboard"
      >
        Violet App
      </router-link>
    </div>
    <div class="grow">
      <div class="h-px w-[90%] bg-emerald-50 mx-auto my-3"></div>
      <AppItem
        v-for="app in apps"
        :key="app.id"
        class="mx-7 text-sky-300"
        :id="app.id"
        :name="app.name"
      />
      <div class="mx-7 flex items-center">
        <div class="px-2 mr-2 bg-emerald-300 rounded-lg">
          <input
            class="w-full bg-transparent"
            type="text"
            placeholder="Name"
            v-model="name"
          />
        </div>
        <font-awesome-icon
          class="text-green-300 cursor-pointer"
          :icon="['fas', 'plus']"
          @click="add"
        />
      </div>
    </div>
    <div class="grow-0">
      <button class="my-1 mx-auto block">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { App, VioletApi } from "@/api/violet";
import { inject, ref } from "vue";
import AppItem from "../app/AppItem.vue";

const name = ref("");
const violetApi = inject<VioletApi>("violetApi");

defineProps<{
  apps: App[];
}>();
const emit = defineEmits<{
  (event: "app-added", app: App): void;
}>();

async function add() {
  if (!violetApi) {
    console.error("violetApi is not injected");
    return;
  }

  if (!name.value) {
    return;
  }

  try {
    const app = await violetApi.newApp(name.value);
    emit("app-added", app);
  } catch (error) {
    console.error(error);
  } finally {
    name.value = "";
  }
}
</script>
