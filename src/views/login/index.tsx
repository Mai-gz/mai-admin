import { ElButton, ElInput, ElSpace } from 'element-plus'
import initLoginBg from './init'
import styles from './login.module.scss'
import './login.less'

export default defineComponent({
    setup() {
        const username = ref<string>();
        const password = ref<string>();
        const handleClick = () => {
            console.log("username:", username, "password:", password);

        }
        onMounted(() => {
            initLoginBg(); // 加载canvas背景
            window.onresize = () => {
                initLoginBg();// 窗口大小改变重新加载背景
            };
        })
        return () => (
            <div class={styles.loginContainer}>
                {/* 存放背景 */}
                <canvas id="canvas" class={styles.canvasBox}></canvas>

                {/* 登录盒子 */}
                <div class={styles.loginBox + " loginBox"}>
                    {/* 标题部分 */}
                    <div class={styles.title}>
                        <h1>后台管理系统</h1>
                        <p>Strive Everyday</p>
                    </div>
                    {/* 表单部分 */}
                    <div class="form">
                        <ElSpace direction="vertical" size="large" style={{ display: 'flex' }}>
                            <ElInput v-model={username.value} placeholder="用户名"></ElInput>
                            <ElInput v-model={password.value} placeholder="密码" type="password" show-password></ElInput>
                            <ElButton type="primary" class="loginBtn" onClick={handleClick}>登录</ElButton>
                        </ElSpace>
                    </div>
                </div>

                {/* <p>store.name:{store.name}</p>`
                <p>name:{name.value}</p>
                <p>age:{age.value}</p>
                <ElButton type={"primary"} onClick={handleClick}>点击</ElButton> */}
            </div>
        )
    }
})
