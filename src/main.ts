import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/tailwind.css";
import { createPinia } from "pinia";
import "@/config";
import { VioletApi } from "@/api/violet";
import { Config } from "@/config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(router);
app.use(createPinia());

const config = new Config();
app.provide("violetApi", new VioletApi(config));
app.provide("config", config);

library.add(faGear);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
