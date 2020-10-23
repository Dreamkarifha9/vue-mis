import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/",
    name: "login",
    meta: {
      requiresVisitor: true
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    meta: {
      requiresAuth: true
    },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/Registermachine",
    name: "Registermachine",
    meta: {
      requiresAuth: true
    },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Tpm.vue")
  },
  {
    path: "/Plan",
    name: "Plan",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/ThePlan.vue")
  },
  {
    path: "/Kpimain",
    name: "Kpimain",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/Kpimain.vue")
  },
  {
    path: "/Kpiminor",
    name: "Kpiminor",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/Kpiminor.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["user/isAuthenticated"]) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters["user/isAuthenticated"]) {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
