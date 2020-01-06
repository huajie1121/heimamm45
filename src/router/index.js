//导入vue 和router
import Vue from "vue"
import VueRouter from "vue-router"

//导入组件
import index from "../views/index/index.vue"
import login from "../views/login/login.vue"

//导入组件
import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import question from "../views/index/question/question.vue"
import subject from "../views/index/subject/subject.vue"
import user from "../views/index/user/user.vue"

//注册
Vue.use(VueRouter)



//实例化
const router = new VueRouter({
    routes: [
        {
            path: "/index",
            component: index,
            children: [
                {
                    path: "chart",
                    component: chart,
                },
                {
                    path: "enterprise",
                    component: enterprise,
                },
                {
                    path: "question",
                    component: question,
                },
                {
                    path: "subject",
                    component: subject,
                },
                {
                    path: "user",
                    component: user,
                },
            ]
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
