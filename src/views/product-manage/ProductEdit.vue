<template>
    <div>
        <el-page-header @back="handBack()"  title="Product-manage">
            <template #content>
                <span class="text-large font-600 mr-3"> ProductEdit </span>
            </template>
        </el-page-header>
        <el-form ref="productFormRef"
                 :model="productForm"
                 :rules="productFormRules"
                 label-width="80px"
                 class="demo-ruleForm">

            <el-form-item label="Name" prop="productName">
                <el-input v-model="productForm.productName" />
            </el-form-item>


            <el-form-item label="Introduction" prop="productIntroduction">
                <el-input v-model="productForm.productIntroduction"
                          :rows="2"
                          type="textarea" />
            </el-form-item>

            <el-form-item label="Detail" prop="productDetail">
                <el-input v-model="productForm.productDetail"
                          :rows="2"
                          type="textarea" />
            </el-form-item>

            <el-form-item label="Img" prop="productImg">
                <!-- 之前封裝的upload組件-->

                <Upload :avatar="productForm.productImg"
                        @avatarChange="handleChange" />


            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm()">submit</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>


<script setup>
    import axios from 'axios'

    import upload from '@/util/upload'
    import Upload from '@/components/upload/Upload'
    import { ref, reactive, onMounted } from 'vue';

    import { useRouter, useRoute } from 'vue-router';
    const route = useRoute()

    const productFormRef = ref()
    const productForm = reactive({
        productName:"",
        productIntroduction:"",
        productDetail:"", //預設為編輯
        productImg: "",
        file: null
    })

    onMounted(async () => {
        // 拿到路由的ID
        // console.log("jump", route.params.id)
        const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
        // console.log("onMounted", res.data.data[0])
        // 對newsForm賦值
        Object.assign(productForm, res.data.data[0])
    })

    const productFormRules = reactive({
        productName: [
            { required: true, message: 'Please input productName', trigger: 'blur' },
        ],
        productIntroduction: [
            { required: true, message: 'Please input productIntroduction', trigger: 'blur' },
        ],
        productDetail: [
            { required: true, message: 'Please input productDetail', trigger: 'blur' },
        ],
        productImg: [
            { required: true, message: 'Please input productImg', trigger: 'blur' },
        ]
    })

    const router = useRouter()
    const handleChange = (file) => {
        // 封裝
        //console.log(file.raw)
        // 用原生解析
        productForm.productImg = URL.createObjectURL(file)
        // 提交給後端用的
        productForm.file = file
    }
    const submitForm = () => {
        //要先校驗 用validate 表單內容都通過了必填項目
        productFormRef.value.validate(async (valid) => {
            if (valid) {
                // 包含圖片 post交給後端
                console.log("alll", productForm)
                const res = await upload("/adminapi/product/list", productForm)
                console.log(productForm)

                router.push('/product-manage/productlist')
            }
        })

    }

    const handBack = () => {
        router.back()
    }
</script>


<style lang="scss" scoped>
    .demo-ruleForm {
        margin-top: 50px;
    }
</style>