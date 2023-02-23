// 引入Store定义函数
import { defineStore, createPinia } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/config' 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import piniaPersistConfig from '@/config/piniaPersist'

// 定义Store实例并导出，useStore可以是任何东西，比如useUser, useCart
// 第一个参数，唯一不可重复，字符串类型，作为仓库ID 以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// const store = useStore()
// // 结合computed获取
// const name = computed(() => store.name)
// var i = 0;
// // 解构并使数据具有响应式
// const { age } = storeToRefs(store);
// const handleClick = () => age++


// defineStore 调用后返回一个函数，调用该函数获得 Store 实体sss
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "GlobalState",
  // state: 返回对象的函数
  state: () => ({
    // token
    token: "",
    // userInfo
    userInfo: "",
    // element组件大小
    assemblySize: "default",
    // language
    language: "",
    // themeConfig
    themeConfig: {
      // 当前页面是否全屏
      maximize: false,
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true
    }
  }),
  getters: {},
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token;
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    // setAssemblySizeSize
    // setAssemblySizeSize(assemblySize: AssemblySizeType) {
    //   this.assemblySize = assemblySize;
    // },
    // // updateLanguage
    // updateLanguage(language: string) {
    //   this.language = language;
    // },
    // // setThemeConfig
    // setThemeConfig(themeConfig: ThemeConfigProps) {
    //   this.themeConfig = themeConfig;
    // }
  },
  // pinia持久化配置
  persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

