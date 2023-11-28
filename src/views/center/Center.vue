<template>
    <div>
        <el-page-header  icon="" title="System">
            <template #content>
                <span class="text-large font-600 mr-3"> Center </span>
            </template>
        </el-page-header>

        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{store.state.userInfo.username}}</h3>
                    <h5>{{store.state.userInfo.role===1?"admin" : "User"}}</h5>
                </el-card>

            </el-col>
            
            <el-col :span="16">
                <el-card class="box-card">

                    <template #header>
                        <div class="card-header">
                            <span>Myself</span>
                        </div>
                    </template>

                    <el-form ref="userFormRef"
                             :model="userForm"
                             :rules="userFormRules"
                             label-width="120px"
                             class="demo-ruleForm">
                        <el-form-item label="Username" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="Gender" prop="gender">
                            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" style="width:100%">
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
                             @avatarChange="handleChange"        
                            />



                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">update</el-button>
                        </el-form-item>
                    </el-form>


                </el-card>
            </el-col>
        </el-row>


    </div>
</template>


<script setup>
    import axios from 'axios'
    import { Plus, User } from '@element-plus/icons-vue'
    import { useStore } from 'vuex';
    // 引入計算屬性
    import { computed, ref, reactive } from 'vue';
    import { ElMessage } from 'element-plus';
    import upload from '@/util/upload'
    import Upload from '@/components/upload/Upload'
    const store = useStore()

    const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
    const { username, gender, introduction, avatar } = store.state.userInfo
    const userFormRef = ref()
    const userForm = reactive({
        username,
        gender,
        introduction,
        avatar,
        // 放檔案用
        file: null
    })

    const userFormRules = reactive({
        username: [
            { required: true, message: 'Please input name', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: 'Please input gender', trigger: 'blur' },
        ],
        introduction: [
            { required: true, message: 'Please input introduction', trigger: 'blur' },
        ],
        avatar: [
            { required: true, message: 'Please input avatar', trigger: 'blur' },
        ]
    })


    const options = [
     {
        label: "secret",
        value:0
     },
     {
        label: "male",
        value:1
     },
     {
        label: "female",
        value: 2
     },

    ]
    // 每次選擇完圖片的回調
    const handleChange = (file) => {
        // 封裝
        //console.log(file.raw)
        // 用原生解析
        userForm.avatar = URL.createObjectURL(file)
        // 提交給後端用的
        userForm.file = file
    }
    // 提交
    const submitForm = () => {
        //要先校驗 用validate 表單內容都通過了必填項目
        userFormRef.value.validate(async (valid) => {
            if (valid) {
                console.log("submit")
                // 封裝 axios.post upload 
             const res =  await upload("/adminapi/user/upload", userForm)
             if (res.ActionType === "OK") {
                    store.commit("changeUserInfo", res.data)
                    ElMessage.success("upload")
             }
            }
        })

    }
</script>


<style lang="scss" scoped>
    .el-row {
        margin-top:20px;
        .box-caed{
            text-align:center;
        }
    }

    ::v-deep .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    ::v-deep .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    ::v-deep .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
    }

</style>