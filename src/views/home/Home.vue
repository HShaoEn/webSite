<template>
    <div>
        <el-page-header  icon="" title="System">
            <template #content>
                <span class="text-large font-600 mr-3"> Home </span>
            </template>
        </el-page-header>
        <el-card class="box-card">
       
            <el-row>
                <el-col :span="4">

                    <el-avatar :size="100" :src="avatarUrl" />

                </el-col>
                <el-col :span="20">
                
                    <h3 style="line-height:100px">Welcome {{$store.state.userInfo.username}}, {{welcomText}}</h3>
                
                </el-col>
            </el-row>
        
        </el-card>
        <el-card class="box-card">
            <div class="card-header">
                <span>Product</span>
                <!-- 如果有值了在創建 等於讀完-->
                <el-carousel :interval="4000" type="card" height="200px" v-if="loopList.length">
                    <el-carousel-item v-for="item in loopList" :key="item._id">
                        
                        <div :style="{
                        backgroundImage: `url(http://localhost:3000${item.productImg})`,
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        minHeight: '200px', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        
                        }">
                             <h3 class="text-2xl text-center">{{ item.productName }}</h3>

                        </div>


                    </el-carousel-item>
                </el-carousel>
            </div>

        </el-card>
    </div>
</template>

<script setup>
    //import axios from 'axios'
    import { useStore } from 'vuex';
    // 引入計算屬性
    import { computed } from 'vue';
    const store = useStore()
    const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

    // console.log("store.state=", store.state)
    const welcomText = computed(() => new Date().getHours() < 12 ? "Goodmoring" : "Goodaftermoon")

    import { onMounted,ref } from 'vue'
    import axios from 'axios'
    const loopList = ref([])
    // 一進來獲得list
    onMounted(() => {
        getData()

    })
    const getData = async () => {
        const res = await axios.get("/adminapi/product/list")
        loopList.value = res.data.data

        console.log("loopList",loopList.value)
        // ref被攔截就會更新頁面視圖
        // tableData.value = res.data.data
    }


 </script>

<style lang="scss" scoped>
    .box-card{
        margin-top:50px;
    }
    .el-carousel__item h3 {
        color: white;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>