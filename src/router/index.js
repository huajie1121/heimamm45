//导入vue 和router
import Vue from "vue"
import VueRouter from "vue-router"

//导入组件
import index from "../views/index/index.vue"
import login from "../views/login/login.vue"

//注册
Vue.use(VueRouter)



//实例化
const router = new VueRouter({
    routes: [
        {
            path: "/index",
            component: index
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/",
            component: login
        },
    ]
})

export default router
