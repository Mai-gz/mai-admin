<template>
	<div class="theme-setting">
		<i :class="'iconfont icon-jingzi'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
// bus总线
const openDrawer = () => {
	console.log("总线emit");
	
	mittBus.emit("openThemeDrawer", '1');
};
</script>
