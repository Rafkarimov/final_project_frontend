import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const pinia = createPinia();

axios.defaults.baseURL = "http://localhost:8080";

// аналог Main класса Vue

createApp(App)
  .use(pinia) // официальная библиотека для управления хранилищами
  .use(router) // официальная библиотека для навигации по страницам
  .mount("#app");
