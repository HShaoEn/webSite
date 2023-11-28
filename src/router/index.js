import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue' 
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index'
// import { th } from 'element-plus/es/locale'
// ���Ѱt�m���U mainbox�O�M���ѫ᭱�ھ��v���ʺA�K�[
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

// �����d�I �C�����Ѹ��ध�e���|���� ��K�v���޲z
router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next();
    } else {
        // �P�_�O���O�w���v (�w�g�n���L) next;
        // �����v ���w�V��login
        if (!localStorage.getItem("token")) {
            next({
                path:"/login"
            })
        } else {
            if (!store.state.isGetterRouter) {
                // �u���Ĥ@���ݭn�t�m���� �Q��store�x�s���A
                // �קK���ѵL�����K�[
                // ���R���Ҧ������Ѧb���@�� �קK�~�ӤW�ӨϥΪ̪�route
                // �����屼������
                router.removeRoute("mainbox")

                configRouter()
                // �t�m���ݭn�A���@��
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        }
    }
})

// router���v������n�� ���ϴ�V (���O) ���|�t�m���s(config)�qlogin �h�޲z
// �]��addroute�|�@���|�[�ҥH�n�M���W�@��
const configRouter = () => {
    // �p�G�S���o�Ӹ��Ѧb�[�^ 
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
    // ���� isGetterRouter = true, ����
    store.commit("changeGetterRouter", true)
}

const checkPermission = (item) => {
    // �p�G�o��item���o���ݩʪ��ܦb�d
    if (item.requireAdmin) {
    // �^��false
        return store.state.userInfo.role === 1
    }
    return true
}


export default router
