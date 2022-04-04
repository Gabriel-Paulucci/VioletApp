<template>
  <!-- <nav>
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<script setup lang="ts">
import { inject } from "vue";
import { VioletApi } from "./api/violet";
import { useMainStore } from "./store/mainStore";

const violetApi = inject<VioletApi>("violetApi");
const store = useMainStore();

if (violetApi) {
  const token = localStorage.getItem("token");

  if (token) {
    store.token = token;
    violetApi.setToken(token);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
}
</style>
