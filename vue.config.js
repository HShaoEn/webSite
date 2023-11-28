const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // �����D �ϦV�N�z
    devServer: {
        proxy: {
            // ����x��API
            "/adminapi": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        },
        client: {
            overlay: false
        },
        publicPath: ''
    }
    })


