<template>
	<div class="fullscreen">
		<i :class="['iconfont', isFullscreen ? 'icon-suoxiao1' : 'icon-fangda1']" class="toolBar-icon" @click="toggle"></i>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
// 使用VueUse的useFullscreen控制全屏
const { toggle, isFullscreen } = useFullscreen();
</script>
