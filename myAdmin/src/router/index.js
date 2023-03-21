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
router.$addRoutes = (params) => {
    router.matcher = new VueRouter({ mode: 'history' }).matcher
    router.addRoutes(params)
}

export default router