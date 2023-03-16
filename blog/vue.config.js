const path = require('path')
// const resolve = dir => path.join(__dirname, dir)
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3008",
        changeOrign: true,
        pathRewrite: {
          "/api": "/api"
        }
      }
    },

  },
  runtimeCompiler: true,
  configureWebpack: (config) => {
    const plugins = [];
    // 骨架屏
    plugins.push(
      new SkeletonWebpackPlugin({ // 实例化插件对象
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/Skeleton.js"), // 引入入口文件
          },
        },
        minimize: true, // SPA 下是否需要压缩注入 HTML 的 JS 代码
        quiet: true, // 在服务端渲染时是否需要输出信息到控制台
        // router: {
        //     mode: "history", // 路由模式
        //     routes: [ // 对应路径所需要的骨架屏组件id，id的定义在入口文件内
        //         { path: "/", skeletonId: "detailSkeleton" },
        //     ],
        // },
      })
    );

    config.plugins = [...config.plugins, ...plugins];
  },
  // css 样式分离
  css: {
    extract: true,
  },
}
