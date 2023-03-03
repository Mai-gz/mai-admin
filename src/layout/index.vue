<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[themeConfig.layout]" />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/stores";
import LayoutClassic from "./LayoutClassic/index.vue";

const LayoutComponents: { [key: string]: Component } = {
  classic: LayoutClassic,
};

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
console.log("主题配置:", themeConfig);

</script>

<style scoped lang="scss">
.layout {
  min-width: 760px;
}
</style>
