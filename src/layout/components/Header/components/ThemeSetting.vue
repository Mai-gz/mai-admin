<template>
	<div class="theme-setting">
		<i :class="'iconfont icon-jingzi'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
	mittBus.emit("openThemeDrawer");
};
</script>
