<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path"
          :closable="item.close">
          <template #label>
            <el-icon class="tabs-icon" v-show="item.icon && themeConfig.tabsIcon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/stores';
import { TabsStore } from '@/stores/modules/tabs';
import { AuthStore } from '@/stores/modules/auth';
import { KeepAliveStore } from '@/stores/modules/keepalive';
import { TabPaneName, TabsPaneContext } from 'element-plus';
import MoreButton from './components/MoreButton.vue';

const route = useRoute();
const router = useRouter();
const globalStore = GlobalStore();
const tabStore = TabsStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();

const tabsMenuValue = ref<string>(route.fullPath);

onMounted(() => {
  initTabs();
})

// 初始化需要固定的tab标签
const initTabs = () => {
  authStore.authMenuListGet.forEach(item => {
    if (item.meta.isAffix && !item.meta.isFull && !item.meta.isHide) {
      const tabParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix // 固定在 tabs nav上则close为false
      };
      // 添加tab到stroe
      tabStore.addTabs(tabParams);
    };
  })
}

// 监听路由变化
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return; // 全屏模式拦截
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.fullPath,
			name: route.name as string,
			close: !route.meta.isAffix
		};
    // 添加tab
		tabStore.addTabs(tabsParams);
		route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
  },
  {
    // 深度监听
    immediate: true
  }
)

const themeConfig = computed(() => globalStore.themeConfig);
const tabsMenuList = computed(() => tabStore.tabsMenuList);

const tabClick = (tabItem: TabsPaneContext) => {
  // 路由跳转
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};
const tabRemove = (fullPath: TabPaneName | string) => {
  // 获取tab的name
  const name = tabStore.tabsMenuList.filter(item => item.path === fullPath)[0].name || "";
  keepAliveStore.removeKeepAliveName(name);
  tabStore.removeTabs(fullPath as string, fullPath === route.fullPath);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
