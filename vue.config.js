const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081,
    host: "0.0.0.0",
    proxy: {
      '/api': { // 这里最好有一个 /
        target: 'http://127.0.0.1:8080', // 后台接口域名
        changeOrigin: true, // 是否允许跨域 设置为true
        pathRewrite: {  // 重写域名
          '^/api': '/'
        }
      },
    }
  }
})
