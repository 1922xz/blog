import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "/login",
        name: "登录",
        hidden: true,
        component: () => import("../views/login/Login.vue")
    }
    // {
    //     path:"/404"
    // }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router