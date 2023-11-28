<template>
    <div>
        <el-page-header  icon="" title="User-manage">
            <template #content>
                <span class="text-large font-600 mr-3"> UserAdd </span>
            </template>
        </el-page-header>
        <el-form ref="userFormRef"
                 :model="userForm"
                 :rules="userFormRules"
                 label-width="80px"
                 class="demo-ruleForm">

            <el-form-item label="Username" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>


            <el-form-item label="Password" prop="password">
                <el-input v-model="userForm.password" type="password" />
            </el-form-item>

            <el-form-item label="role" prop="role">
                <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width:100%">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value" />
                </el-select>
            </el-form-item>


            <el-form-item label="Introduction" prop="introduction">
                <el-input v-model="userForm.introduction"
                          :rows="2"
                          type="textarea" />
            </el-form-item>

            <el-form-item label="avatar" prop="avatar">


                <Upload :avatar="userForm.avatar"
                        @avatarChange="handleChange" />



            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm()">UserAdd</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>


<script setup>
    import axios from 'axios'
    import { useStore } from 'vuex';
    import { ElMessage } from 'element-plus';
    import upload from '@/util/upload'
    import Upload from '@/components/upload/Upload'
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router';

    const store = useStore()
    const userFormRef = ref()
    const userForm = reactive({
        username:"",
        password:"",
        role:2, //預設為編輯
        introduction:"",
        avatar:"",
        // 放檔案用
        file: null,
        gender:0 // 保密
    })

    const userFormRules = reactive({
        username: [
            { required: true, message: 'Please input name', trigger: 'blur' },
        ],
        password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
        ],
        introduction: [
            { required: true, message: 'Please input introduction', trigger: 'blur' },
        ],
        role: [
            { required: true, message: 'Please input role', trigger: 'blur' },
        ],
        avatar: [
            { required: true, message: 'Please input avatar', trigger: 'blur' },
        ]
    })

    const options = [
        {
            label: "admin",
            value: 1
        },
        {
            label: "edit",
            value: 2
        }
    ]
    const router = useRouter()
    const handleChange = (file) => {
        // 封裝
        //console.log(file.raw)
        // 用原生解析
        userForm.avatar = URL.createObjectURL(file)
        // 提交給後端用的
        userForm.file = file
    }
    const submitForm = () => {
        //要先校驗 用validate 表單內容都通過了必填項目
        userFormRef.value.validate(async (valid) => {
            if (valid) {
                // 包含圖片 post交給後端
                const res = await upload("/adminapi/user/add", userForm)

                if (res.ActionType === "OK") {
                    store.commit("changeUserInfo", res.data)
                    ElMessage.success("upload")
                }

                router.push('/user-manage/userlist')
            }
        })

    }
</script>


<style lang="scss" scoped>
    .demo-ruleForm{
        margin-top:50px;
    }
 </style>