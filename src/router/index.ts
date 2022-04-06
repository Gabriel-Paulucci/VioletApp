import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SinginView from "../views/SinginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "singin",
    component: SinginView,
  },
  {
    path: "/singup",
    name: "singup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "singup" */ "../views/SingupView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardView.vue"),
  },
  {
    path: "/tokens/:id",
    name: "tokens",
    component: () =>
      import(/* webpackChunkName: "tokens" */ "../views/TokensView.vue"),
  },
  {
    path: "/erros/:id",
    name: "erros",
    component: () =>
      import(/* webpackChunkName: "erros" */ "../views/ErrosView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
