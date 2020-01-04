const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //禁止eslint
  lintOnSave: false,
  devServer: {
    port: 7070,
    proxy: {
      //配置代理，解决跨域问题
      //代理base-api,base-api是动态的(可以是mock，也可以是本地的)，所以用变量
      //访问地址例如：http://localhost:7070/dev-api/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          //重写地址，正则匹配到process.env.VUE_APP_BASE_API,就去掉这一部分，参见server/index.js
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  },
  css: {
    loaderOptions: {
      //配置全局sass变量
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/base.scss";
        `
      }
    }
  }
};
