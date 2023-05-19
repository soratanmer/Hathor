import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
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
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
