import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // gglobal imports to register
      imports: [
        'vue',
        'vue-router',
      ]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
