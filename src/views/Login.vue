<template>
    <div>
        <vue-particles id="tsparticles"
                       :particlesInit="particlesInit"
                       :particlesLoaded="particlesLoaded"
                       :options="bk" />
        <div class="formContainer">
            <h3>企業門戶網站</h3>
            <el-form ref="loginFormRef"
                     :model="loginForm"
                     status-icon
                     :rules="loginRules"
                     label-width="80px"
                     class="loginform">
                <el-form-item label="用戶名" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密碼" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登錄</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import axios from 'axios'
    import { reactive, ref } from 'vue';
    // 載入router
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    const store = useStore()


    const loginForm = reactive({
        username: "",
        password: ""
    });
    // 表單綁定的響應對象
    const loginFormRef = ref();
    const loginRules = reactive({
        // 具體的驗證規則
        username: [
            {
                required: true, message: "請輸入用戶名", trigger: "blur"
            }
        ],
        password: [
            {
                required: true, message: "請輸入用密碼", trigger: "blur"
            }
        ]
    });

    const router = useRouter()
    // 點擊登錄
    const submitForm = () => {
        //1. 手動校對表單  validate API
        loginFormRef.value.validate((valid) => {
            console.log(valid) // 確認表單合法
            if (valid) {
                // 跳轉頁面
                // 跨域問題 反向代理
                axios.post("/adminapi/user/login", loginForm).then(res => {
                    //console.log(res.data);
                    if (res.data.ActionType === "OK") {
                        // console.log("登錄成功後給持久化的資料", res.data.data) 
                        store.commit("changeUserInfo", res.data.data)
                        // 重新配置路由的vuex 
                        store.commit("changeGetterRouter", false)
                        router.push("/index")
                        // 假的測試 localStorage.setItem("token", "123")
                    } else {
                        ElMessage.error('error')
                    }
                })
            }
        })

        //2. 拿到表單內容提交後台
        //3. 設計token
    };

    // 啟動粒子渲染
    import { loadFull } from "tsparticles"
    const particlesInit = async (engine) => {
        await loadFull(engine)
    }
    const bk = {
        background: {
            color: {
                value: '#0d47a1'
            }
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 6,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    }
</script>

<style lang="scss" scoped>
    .formContainer {
        width: 500px;
        height: 300px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(125 189 140);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px; /* 圆角 */
        box-shadow: 0 0 10px rgba($color: #ffffff, $alpha: 0.1); /* 阴影效果 */

        h3 {
            font-size: 30px;
        }

        .loginform {
            margin-top: 20px;
        }
    }

    /* 深度篩選 選擇到唯一屬性 後代選擇器 */
    :deep(<.el-form-item__label>) {
        color: white;
    }
</style>
