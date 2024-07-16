import { createRouter, createWebHistory } from "vue-router";

import CheckoutPage from "./pages/Checkout.vue";
import LoginPage from "./pages/Login.vue";
import ProductsPage from "./pages/Landing.vue";
import RegisterPage from "./pages/Register.vue";
import store from "./store";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },

  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/products",
    component: ProductsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next({ name: "" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
