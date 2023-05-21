import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router'
        ]
      }),
      Components({
        // relative paths to the directory to search for components.
        dirs: ['src/'],

        // valid file extensions for components.
        extensions: ['vue'],

        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/]
      }),
      UnoCSS()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行是否自动打开浏览器
      proxy: {
        // 反向代理解决跨域
        [env.VITE_APP_API]: {
          // target: 'http://localhost:3000',
          target: 'https://netease-cloud-music-api-soratanmer.vercel.app/',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_API), '') // 替换 /dev-api 为 target 接口地址
        }
      }
    }
  }
})
