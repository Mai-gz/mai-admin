import { ElConfigProvider } from 'element-plus'
import Loading from '@/components/loading/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export default defineComponent({
  setup() {
    const isShowLoading = ref<boolean>(true);
    const language = ref<string>('zh-cn')
    const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
    onBeforeMount(() => isShowLoading.value = false)
    return () => (
      <ElConfigProvider locale={locale.value}>
        {
          isShowLoading ?
            <router-view /> :
            <Loading />
        }
      </ElConfigProvider>
    )
  }
})
