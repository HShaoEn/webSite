<template>
    <div>
        <el-page-header @back="handBack()" title="News-manage">
            <template #content>
                <span class="text-large font-600 mr-3"> NewsEdit </span>
            </template>
        </el-page-header>


        <el-form ref="newsFormRef"
                 :model="newsForm"
                 :rules="newsFormRules"
                 label-width="80px"
                 class="demo-ruleForm">

            <el-form-item label="Title" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>

            <el-form-item label="Content" prop="content">
                <!-- 編輯器組件 :content="newsForm.content" 子傳父接收屬性
                      v-if="newsForm.content" 因為一開始數據流是先給content="" 會導致onMounted拿到空
                      改為 如為async後有值在渲染
                     -->
                <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content" />


            </el-form-item>

            <el-form-item label="Category" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width:100%">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value" />
                </el-select>
            </el-form-item>


            <el-form-item label="Cover" prop="cover">
                <!-- 之前封裝的upload組件-->

                <Upload :avatar="newsForm.cover"
                        @avatarChange="handleCoverChange" />


            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">Submit</el-button>
            </el-form-item>

        </el-form>

</div>
</template>

<script setup>
    import axios from 'axios'
    import { useStore } from 'vuex';
    import { ElMessage } from 'element-plus';
    import { ref, reactive, onMounted } from 'vue';
    // 插入文本編輯器
    import editor from '@/components/editor/Editor'
    // 轉換file
    import upload from '@/util/upload'
    import Upload from '@/components/upload/Upload'
    const store = useStore()
    const newsFormRef = ref()
    import { useRouter, useRoute } from 'vue-router';
    // 拿到整個路由對象
    const router = useRouter()
    // 拿到當前路由對象
    const route = useRoute()
    // 取得當前ID的數據
    onMounted(async() => {
        // 拿到路由的ID
        // console.log(route.params.id)
        const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
        console.log("onMounted", res.data.data[0])
        // 對newsForm賦值
        Object.assign(newsForm, res.data.data[0])
    })

    // 子傳父 每次內容改變的回調
    const handleChange = (data) => {
        // console.log(data)
        newsForm.content = data
    }

    const newsForm = reactive({
        title: "",
        content: "",
        category: 1, //預設為1 最新動態 2 典型案例 3 通知公告
        cover: "", //封面圖片
        file: null,
        isPublish: 0 // 0 未發布 1 已經發布
    })




    const newsFormRules = reactive({
        title: [
            { required: true, message: 'Please input title', trigger: 'blur' },
        ],
        content: [
            { required: true, message: 'Please input content', trigger: 'blur' },
        ],
        category: [
            { required: true, message: 'Please input category', trigger: 'blur' },
        ],
        cover: [
            { required: true, message: 'Please input cover', trigger: 'blur' },
        ]
    })
    const options = [
        {
            label: "Front",
            value: 1
        },
        {
            label: "Backend",
            value: 2
        },
        {
            label: "Database",
            value: 3
        }
    ]
    const handleCoverChange = (file) => {
        // 封裝
        //console.log(file.raw)
        // 用原生解析
        newsForm.cover = URL.createObjectURL(file)
        // 提交給後端用的
        newsForm.file = file
    }


    const submitForm = () => {
        //要先校驗 用validate 表單內容都通過了必填項目
        newsFormRef.value.validate(async (valid) => {
            if (valid) {
                // console.log("123", newsForm)
                // 包含圖片 post交給後端 封裝了file
                await upload("/adminapi/news/list", newsForm)


                router.back()
                /**if (res.ActionType === "OK") {
                    store.commit("changeUserInfo", res.data)
                    ElMessage.success("upload")
                }**/

                // router.push('/user-manage/userlist')
            }
        })

    }


    // 回上一頁
    const handBack = () => {
        router.back()
    }
</script>

<style lang="scss" scoped>
    .demo-ruleForm {
        margin-top: 50px;
    }
</style>