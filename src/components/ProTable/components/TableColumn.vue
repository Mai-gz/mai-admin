<template>
	<component :is="renderLoop(column)"></component>
</template>

<script lang="tsx" setup name="TableColumn">
import { ColumnProps } from "@/components/ProTable/interface";
import { filterEnum, formatValue, handleRowAccordingToProp } from "@/utils/index";

defineProps<{ column: ColumnProps }>();

const slots = useSlots();


const enumMap = inject("enumMap", ref(new Map()));

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
	return enumMap.value.get(item.prop) && item.isFilterEnum
		? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
		: formatValue(handleRowAccordingToProp(scope.row, item.prop!));
};

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: { [key: string]: any }) => {
	return filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop), item.fieldNames, "tag") as any;
};

const renderLoop = (item: ColumnProps) => {
	// item 表格每一项的设置	
	return (
		<>
			{item.isShow && (
				<el-table-column
					{...item}
					align={item.align ?? "center"}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
				>
					{
						{
							default: (scope: any) => {
								console.log("component---TableColumn---default---scope", scope);
								// 递归
								if (item._children) return item._children.map(child => renderLoop(child));
								// 当传入的是自定义的tsx渲染方式
								if (item.render) return item.render(scope);
								// 具名插槽,如果存在，则显示
								if (slots[item.prop!]) return slots[item.prop!]!(scope);
								//  tag标签
								if (item.tag) return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>;
								return renderCellData(item, scope);
							},
							header: () => {
								// 当传入的是自定义的tsx渲染头
								if (item.headerRender) return item.headerRender(item);
								// 判断如果是XXXHeader命名的插槽---例:tableHeader | usernameHeader 等等
								if (slots[`${item.prop}Header`]) return slots[`${item.prop}Header`]!({ row: item });
								return item.label;
							}
						}
					}
				</el-table-column>
			)}
		</>
	);
};
</script>
