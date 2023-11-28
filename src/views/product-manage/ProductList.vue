<template>
    <div>
        <el-card>
            <el-page-header icon="" title="Product-manage">
                <template #content>
                    <span class="text-large font-600 mr-3"> ProductList </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="productName" label="Name" />
                <el-table-column prop="productIntroduction" label="Introduction" />



                <el-table-column prop="editTime" label="EditTime">
                    <!-- 用插槽導入格式化分類-->
                    <template #default="scope">
                        {{formatTime.getTime(scope.row.editTime)}}

                    </template>

                </el-table-column>



                <el-table-column align="right" label="manuplation">

                    <template #default="scope">


                        <el-button @click="handleEdit(scope.row)"
                                   circle
                                   :icon="Edit">


                        </el-button>

                        <el-popconfirm title="Are you sure to delete this?"
                                       @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger"
                                           circle
                                           :icon="Delete">
                                </el-button>
                            </template>
                        </el-popconfirm>



                    </template>
                </el-table-column>

            </el-table>


        </el-card>



    </div>
</template>


<script setup>
    import { Edit, Delete} from '@element-plus/icons-vue'
    import { ref, onMounted, reactive } from 'vue'
    import axios from 'axios'
    import formatTime from '@/util/formatTime'
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const tableData = ref([])
    // 預覽用

    // 一進來獲得list
    onMounted(() => {
        getTableData()

    })
    const getTableData = async () => {
        const res = await axios.get("/adminapi/product/list")
        //console.log(res)
        // ref被攔截就會更新頁面視圖
        tableData.value = res.data.data 
    }




    // 刪除回調

    const handleDelete = async (data) => {
        //console.log(data)
        await axios.delete(`/adminapi/product/list/${data._id}`)
        // 更新頁面 OR 把 table 的數據刪掉 跟速度有關係
        getTableData()
    }

    // 編輯回調

    const handleEdit = (data) => {
        // 跳轉到 news-manage/editnews/:id
        // console.log("")
        router.push(`/product-manage/editproduct/${data._id}`)
        // 接收_id渲染頁面

    }
</script>


<style lang = "scss" scoped>
    .el-table {




    margin-top: 50px;
    }
    ::v-deep .htmlcontent{
        img{
             max-width:100%;
         }
    }




   

 </style >

