<template>
	<el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/stores";
import { useTheme } from "@/hooks/useTheme";
import { getBrowserLang } from "@/utils/index";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { EpPropMergeType } from "element-plus/es/utils/vue/props/types";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

// element 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language === "zh") return zhCn;
	if (globalStore.language == "en") return en;
	// 当store中没有language的值，则读取浏览器默认语言
	return getBrowserLang() === "zh" ? zhCn : en;
});

// 配置全局组件大小
const assemblySize = computed(() => globalStore.assemblySize as EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never> | undefined);
</script>

