import { useStore } from '@/stores/index'
// 使普通数据变响应式的函数  
import { storeToRefs } from 'pinia'
import { ElButton } from 'element-plus'

export default defineComponent({
    setup() {
        const store = useStore()
        // 结合computed获取
        const name = computed(() => store.name)
        // 解构并使数据具有响应式
        const { age } = storeToRefs(store);
        const handleClick = () => store.age++
        return () => (
            <div>
                <p>store.name:{store.name}</p>
                <p>name:{name.value}</p>
                <p>age:{age.value}</p>
                <ElButton type={"primary"} onClick={handleClick}>点击</ElButton>
            </div>
        )
    }
})
