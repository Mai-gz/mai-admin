// 引入Store定义函数
import { defineStore } from 'pinia'

// 定义Store实例并导出，useStore可以是任何东西，比如useUser, useCart
// 第一个参数，唯一不可重复，字符串类型，作为仓库ID 以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// const store = useStore()
// // 结合computed获取
// const name = computed(() => store.name)
// var i = 0;
// // 解构并使数据具有响应式
// const { age } = storeToRefs(store);
// const handleClick = () => age++
export const useStore = defineStore('main', {
  // state 推荐箭头函数，为了TS类型推断
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  getters: {},
  actions: {}
})
