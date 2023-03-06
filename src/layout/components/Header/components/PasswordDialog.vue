<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
		<span>这里是修改密码的表单</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
const dialogVisible = ref(false);

// 打开弹窗
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
