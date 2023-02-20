import styles from './loading.module.scss'

export default defineComponent({
  setup() {
    return () => (
      // 动画节点
      <div class={styles.appCockpitLoading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
})
