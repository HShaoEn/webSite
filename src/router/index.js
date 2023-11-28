import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue' 
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index'
// import { th } from 'element-plus/es/locale'
// 路由配置註冊 mainbox嵌套路由後面根據權限動態添加
const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/mainbox",
        name: "mainbox",
        component: MainBox
    }

]
//process.env.BASE_URL
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 路由攔截 每次路由跳轉之前都會執行 方便權限管理
router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next();
    } else {
        // 判斷是不是已授權 (已經登錄過) next;
        // 未授權 重定向到login
        if (!localStorage.getItem("token")) {
            next({
                path:"/login"
            })
        } else {
            if (!store.state.isGetterRouter) {
                // 只有第一次需要配置路由 利用store儲存狀態
                // 避免路由無限次添加
                // 先刪除所有的路由在走一次 避免繼承上個使用者的route
                // 直接砍掉父路由
                router.removeRoute("mainbox")

                configRouter()
                // 配置完需要再走一次
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        }
    }
})

// router的權限控制要用 視圖渲染 (指令) 路徑配置重新(config)從login 去管理
// 因為addroute會一直疊加所以要清除上一個
const configRouter = () => {
    // 如果沒有這個路由在加回 
    if (!router.hasRoute("mainbox")) {
        router.addRoute({
            path: "/mainbox",
            name: "mainbox",
            component: MainBox
        })

    }
    RoutesConfig.forEach(item => {
        checkPermission(item) && router.addRoute("mainbox", item)
    })
    // 改變 isGetterRouter = true, 提交
    store.commit("changeGetterRouter", true)
}

const checkPermission = (item) => {
    // 如果這個item有這個屬性的話在查
    if (item.requireAdmin) {
    // 回傳false
        return store.state.userInfo.role === 1
    }
    return true
}


export default router
