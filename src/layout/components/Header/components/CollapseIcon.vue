<template>
	<el-icon class="collapse-icon" @click="collapse">
		<component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 控制侧边菜单展开|收缩
const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse });
};
</script>

<style scoped lang="scss">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
