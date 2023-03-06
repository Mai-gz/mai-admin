<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span>{{ $t("tabs.more") }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon>
            <Refresh />
          </el-icon>{{ $t("tabs.refresh") }}
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon>
            <FullScreen />
          </el-icon>{{ $t("tabs.maximize") }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon>
            <Remove />
          </el-icon>{{ $t("tabs.closeCurrent") }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon>
            <CircleClose />
          </el-icon>{{ $t("tabs.closeOther") }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon>
            <FolderDelete />
          </el-icon>{{ $t("tabs.closeAll") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config/config';
import { GlobalStore } from '@/stores';
import { TabsStore } from '@/stores/modules/tabs';
import { KeepAliveStore } from '@/stores/modules/keepAlive';

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);

const refreshCurrentPage: Function = inject("refresh") as Function;
// 刷新当前页面
const refresh = () => {
  setTimeout(() => {
    keepAliveStore.removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      keepAliveStore.addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// 当前页面最大化
const maximize = () => {
  globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

// 关闭当前页面tabs
const closeCurrentTab = () => {
  // 判断是否固定在 tabs nav
  if (route.meta.isAffix) return;
  tabStore.removeTabs(route.fullPath);
  keepAliveStore.removeKeepAliveName(route.name as string);
};

// 关闭其他页面tabs
const closeOtherTab = () => {
  console.log(route.fullPath);
  tabStore.closeMultipleTab(route.fullPath);
  keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// 关闭所有tabs
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  keepAliveStore.setKeepAliveName();
  router.push(HOME_URL);
};
</script>

<style scoped lang="scss">@import "../index.scss";
</style>
