<template>
    <div>
        <el-card>
            <el-page-header icon="" title="User-manage">
                <template #content>
                    <span class="text-large font-600 mr-3"> UserList </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="username" width="180" />



                <el-table-column label="avatar" width="180">
                    <template #default="scope">


                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar">
                            </el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                            </el-avatar>
                        </div>


                    </template>

                </el-table-column>

                <el-table-column label="role">
                    <template #default="scope">

                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">admin</el-tag>
                        <el-tag v-else="scope.row.role === 2" class="ml-2" type="success">edit</el-tag>

                    </template>

                </el-table-column>

                <el-table-column align="right" label="manuplation">

                    <template #default="scope">
                        <el-button size="small"
                                   type="success"
                                   @click="handleEdit(scope.row)">

                            Edit

                        </el-button>




                        <el-popconfirm title="Are you sure to delete this?"
                                       @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small"
                                           type="danger">
                                    Delete

                                </el-button>
                            </template>
                        </el-popconfirm>



                    </template>
                </el-table-column>


            </el-table>

        </el-card>


        <el-dialog v-model="dialogVisible"
                   title="editUser"
                   width="50%">
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

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">
                        Cancel
                    </el-button>

                    <el-button type="primary" @click="handleEditConfirm()">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>



    </div>
</template>


<script setup>
    // 生命週期 onMounted
    import { ref, onMounted, reactive } from 'vue'
    import axios from 'axios'
    const dialogVisible = ref(false)
    const tableData = ref([])

    onMounted(() => {
        getTableData()

    })

    const getTableData = async () => {
        const res = await axios.get("/adminapi/user/list")
        //console.log(res)
        tableData.value = res.data.data
    }
    // 編輯回調
    const handleEdit = async(data) => {
        // console.log(data)
        const res = await axios.get(`/adminapi/user/list/${data._id}`)
        // Object.assign 把 reactive的對象合併成新的
        Object.assign(userForm, res.data.data[0])
        dialogVisible.value = true
    }
    //編輯確認回調
    const handleEditConfirm =  () => {
        userFormRef.value.validate(async(valid) => {
            if (valid) {
                // 表單合法
                // 更新後端
                // console.log(userForm._id)
                await axios.put(`adminapi/user/list/${userForm._id}`, userForm)
                // 彈出框隱藏
                dialogVisible.value = false
                // 重新獲取table數據
                getTableData()

            }

        })

    }



    const handleDelete = async(data) => {
        //console.log(data)
        await axios.delete(`/adminapi/user/list/${data._id}`)

        // 更新頁面 OR 把 table 的數據刪掉 跟速度有關係
        getTableData()
    }


    // 表單規則
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
    const userFormRef = ref()
    const userForm = reactive({
        username: "",
        password: "",
        role: 2, //預設為編輯
        introduction: ""
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
        ]
    })

</script>

<style lang="scss" scoped>
    .el-table {
        margin-top: 50px;
    }
 </style>