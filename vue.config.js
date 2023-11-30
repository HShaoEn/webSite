const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    publicPath: '', 
    transpileDependencies: true,
    // 跨域問題 反向代理
    devServer: {
        proxy: {
            // 往後台的API
            "/adminapi": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        },
        client: {
            overlay: false
        },
        allowedHosts: 'all'
    }
})
