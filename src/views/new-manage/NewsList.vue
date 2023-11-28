<template>
    <div>
        <el-card>
            <el-page-header icon="" title="News-manage">
                <template #content>
                    <span class="text-large font-600 mr-3"> NewsList </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="Title" />

                <el-table-column prop="category" label="Category" width="180">
                    <!-- 用插槽導入格式化分類-->
                    <template #default="scope">
                        {{categoryFormat(scope.row.category)}}

                    </template>

                </el-table-column>

                <el-table-column prop="editTime" label="EditTime">
                    <!-- 用插槽導入格式化分類-->
                    <template #default="scope">
                        {{formatTime.getTime(scope.row.editTime)}}

                    </template>

                </el-table-column>

                <el-table-column prop="isPublish" label="isPublish">
                    <!-- 用插槽導入格式化分類-->
                    <template #default="scope">

                        <el-switch v-model="scope.row.isPublish"
                                   :active-value="1"
                                   :inactive-value="0"
                                   @change="handleSwitchChange(scope.row)" />

                    </template>

                </el-table-column>

                <el-table-column align="right" label="manuplation">

                    <template #default="scope">
                        <el-button type="success"
                                   @click="handlePreview(scope.row)"
                                   circle
                                   :icon="Star">


                        </el-button>

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

        <!--彈出窗口-->
        <el-dialog v-model="dialogVisible"
                   title="Preview"
                   width="50%">
            <div>
                <h2>{{previewData.title}}</h2>
            </div>
            <div style="font-size:12px; color:gray">
                {{formatTime.getTime(previewData.editTime)}}
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <!--內容 需要解析HTML v-html 使用有風險 跨站腳本攻擊-->
            <div v-html="previewData.content" class="htmlcontent">


            </div>

        </el-dialog>

    </div>
</template>


<script setup>
    import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
    import { ref, onMounted, reactive } from 'vue'
    import axios from 'axios'
    import formatTime from '@/util/formatTime'
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const tableData = ref([])
    // 預覽用
    const previewData = ref({})
    const dialogVisible = ref(false)
    // 一進來獲得list
    onMounted(() => {
        getTableData()

    })
    const getTableData = async () => {
        const res = await axios.get("/adminapi/news/list")
        //console.log(res)
        // ref被攔截就會更新頁面視圖
        tableData.value = res.data.data
    }


    // 格式化分類
    const categoryFormat = (category) => {
        const arr = ["first", "two", 'three']
        return arr[category - 1]
    }
    // 控制發布回調
    const handleSwitchChange = async (item) => {
        //console.log(item)
        // 發給後端 更新 傳過去ID和isPublish
        await axios.put('adminapi/news/publish', {
            _id: item._id,
            isPublish: item.isPublish

        })
        // 更新列表
        getTableData();
    }
    // 預覽回調
    const handlePreview = (data) => {
        // console.log("預覽數據",data)
        previewData.value = data
        dialogVisible.value = true
    }
    // 刪除回調

    const handleDelete = async (data) => {
        //console.log(data)
        await axios.delete(`/adminapi/news/list/${data._id}`)
        // 更新頁面 OR 把 table 的數據刪掉 跟速度有關係
        getTableData()
    }

    // 編輯回調

    const handleEdit = (data) => {
        // 跳轉到 news-manage/editnews/:id
        console.log("12323123")
        router.push(`/news-manage/editnews/${data._id}`)
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

