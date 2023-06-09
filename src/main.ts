import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { popover, tooltip } from "@/common/bootstrap";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const pinia = createPinia();

axios.defaults.baseURL = "http://localhost:8080";

library.add(faUserSecret);

// аналог Main класса Vue

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("VueDatePicker", VueDatePicker)
  .directive("tooltip", tooltip)
  .directive("popover", popover)
  .use(pinia) // официальная библиотека для управления хранилищами
  .use(router) // официальная библиотека для навигации по страницам
  .mount("#app");
