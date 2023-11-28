<template>
    <el-aside width="$store.state.isCollapsed? '64px' : '200px'">
        <el-menu :collapse="$store.state.isCollapsed" :router="true" :default-active="route.fullPath">
            <el-menu-item index="/index">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>Home</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon>
                    <avatar />
                </el-icon>
                <span>Center</span>
            </el-menu-item>
            <!-- 利用v-admin控制顯示-->
            <el-sub-menu index="/user-manage" v-Admin>
                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>User-manage</span>
                </template>
                <el-menu-item index="/user-manage/adduser">UserAdd</el-menu-item>
                <el-menu-item index="/user-manage/userlist">UserList</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>News-manage</span>
                </template>
                <el-menu-item index="/news-manage/addnews">NewsAdd</el-menu-item>
                <el-menu-item index="/news-manage/newslist">NewsList</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>Product-manage</span>
                </template>
                <el-menu-item index="/product-manage/addproduct">ProductAdd</el-menu-item>
                <el-menu-item index="/product-manage/productlist">ProductList</el-menu-item>
            </el-sub-menu>

        </el-menu>

     </el-aside>
</template>

<script setup>
    // 導入圖標
    import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from '@element-plus/icons-vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex';
    // 引入計算屬性
    const store = useStore()
    const route = useRoute()
    //拿到當前匹配的路由對象
    //console.log(route.fullPath)

    // 指令 提供訪問底層倒墨的方式
    const vAdmin = {
        // 指令創建時走的生命週期
        mounted(el){
            console.log("v-admin", el)
            // 視圖上移除這個節點
            if (store.state.userInfo.role !== 1) {
                el.parentNode.removeChild(el);
            }
        }

    }


</script>


<style lang="scss" scoped>
    .el-aside {
        height: 100vh;

        .el-menu {
            height: 100vh;
        }
    }


</style>