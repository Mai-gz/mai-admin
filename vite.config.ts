import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
// import eslintPlugin from 'vite-plugin-eslint'
// import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { wrapperEnv } from './src/utils/getEnv'
/*
 * 插件vite-plugin-html
 * HTML 压缩能力
 * EJS 模版能力
 * 多页应用支持
 * 支持自定义entry
 * 支持自定义template
 */

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env)

  return {
    base: "./",
    resolve: {
      // 路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // 跨域代理配置
      proxy: {}
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // global imports to register
        imports: [
          'vue',
          'vue-router',
        ],
        // ts needs to be added
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE
          }
        }
      }),
      // * EsLint 报错信息显示在浏览器界面上
      // eslintPlugin(),
      // * name 可以写在 script 标签上<script setup name="componentName">
      // vueSetupExtend(),
      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip 压缩
      viteEnv.VITE_BUILD_GZIP && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
    ],
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist", // 输出目录
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log按实际需要选择使用
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      chunkSizeWarningLimit: 1500, // 块大小警告限制
      reportCompressedSize: true, // 报告压缩大小
      rollupOptions: {
        output: {
          // 静态资源分类和包装
          chunkFileNames: "assets/js/[name]-[hash].js", // 块文件名
          entryFileNames: "assets/js/[name]-[hash].js", // 入口文件名
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]" // 静态资源文件名 
        }
      }
    }
  }
})
