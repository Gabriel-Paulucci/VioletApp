import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/tailwind.css";
import { createPinia } from "pinia";
import "@/config";
import { VioletApi } from "@/api/violet";
import { Config } from "@/config";

const app = createApp(App);

app.use(router);
app.use(createPinia());

const config = new Config();

app.provide("violetApi", new VioletApi(config));
app.provide("config", config);

app.mount("#app");
