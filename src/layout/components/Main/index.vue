<template>
  <Maximize v-if="themeConfig.maximize" />
	<Tabs v-if="themeConfig.tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveStore.keepAliveName">
          <component :is="Component" :key="route.path" v-if="isRouterShow" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="themeConfig.footer">
    <!-- <Footer /> -->
  </el-footer>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/stores";
import { KeepAliveStore } from "@/stores/modules/keepalive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layout/components/Tabs/index.vue";

const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
  
// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
// 全局组件通信 - 提供数据(provide)
provide("refresh", refreshCurrentPage);
</script>


<style scoped lang="scss">
@import "./index.scss";
</style>
