import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/medspecializations",
    name: "MedSpecialization",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MedSpecialization.vue"),
  },
  {
    path: "/persons",
    name: "Person",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Person.vue"),
  },
  {
    path: "/doctors",
    name: "Doctor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Doctor.vue"),
  },
  {
    path: "/chiefdoctors",
    name: "ChiefDoctor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ChiefDoctor.vue"),
  },
  {
    path: "/visitors",
    name: "Visitor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Visitor.vue"),
  },
  {
    path: "/medtypesofresearch",
    name: "MedTypesOfResearch",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MedTypesOfResearch.vue"),
  },
  {
    path: "/laboratoryassistant",
    name: "LaboratoryAssistant",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/LaboratoryAssistant.vue"
      ),
  },
  {
    path: "/visitorresearch",
    name: "VisitorResearch",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VisitorResearch.vue"),
  },
  {
    path: "/reception",
    name: "Reception",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Reception.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
