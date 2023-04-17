import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/medspecializations",
    name: "MedSpecialization",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/MedSpecializationView.vue"
      ),
  },
  {
    path: "/persons",
    name: "Person",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonView.vue"),
  },
  {
    path: "/doctors",
    name: "Doctor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DoctorView.vue"),
  },
  {
    path: "/chiefdoctors",
    name: "ChiefDoctor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ChiefDoctorView.vue"),
  },
  {
    path: "/visitors",
    name: "Visitor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VisitorView.vue"),
  },
  {
    path: "/medtypesofresearch",
    name: "MedTypesOfResearch",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/MedTypesOfResearchView.vue"
      ),
  },
  {
    path: "/laboratoryassistant",
    name: "LaboratoryAssistant",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/LaboratoryAssistantView.vue"
      ),
  },
  {
    path: "/visitorresearch",
    name: "VisitorResearch",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/VisitorResearchView.vue"
      ),
  },
  {
    path: "/reception",
    name: "Reception",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ReceptionView.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/VisitorRegistrationView.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
