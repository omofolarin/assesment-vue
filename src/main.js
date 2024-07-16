import "./style.css";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
// Import Quasar css
import "quasar/src/css/index.sass";

import { Notify, Quasar } from "quasar";

import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import router from "./route";
import store from "./store";

const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
});
app.use(VueQueryPlugin);
app.use(store);
app.use(router);
app.mount("#app");
