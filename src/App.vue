<template>
  <el-config-provider :locale="locale">
    <div></div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const language = ref('zh-cn')

</script>
