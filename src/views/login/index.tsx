import { ElButton, ElInput, ElSpace, ElForm, ElFormItem, ElNotification } from 'element-plus';
import { loginApi } from '@/api/modules/login';
import { Login } from '@/api/interface';
import { HOME_URL } from '@/config/config';
import { GlobalStore } from '@/stores';
import initLoginBg from './init';
import styles from './login.module.scss';
import './login.less';``
// @ts-ignore
import { getTimeState } from '@/utils/index';

export default defineComponent({
    setup() {
        const router = useRouter();
        const globalStore = GlobalStore();

        const loginForm = reactive<Login.ReqLoginForm>({
            username: "",
            password: ""
        });
        const loading = ref<boolean>(false);

        // 校验规则
        type FormInstance = InstanceType<typeof ElForm>;
        const loginFormRef = ref<FormInstance>();
        const loginRules = reactive({
            username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        });

        const handleLogin = (fromEl: FormInstance | undefined) => {
            if (!fromEl) return;
            fromEl.validate(async valid => {
                if (!valid) return;
                loading.value = true;
                try {
                    // 1.调用登录接口
                    const { data } = await loginApi(loginForm);
                    globalStore.setToken(data.token);

                    // 跳转到首页
                    router.replace(HOME_URL);
                    ElNotification({
                        title: getTimeState(),
                        message: "欢迎登录 Mai Admin",
                        type: "success",
                        duration: 3000
                    });
                }
                finally {
                    loading.value = false;
                }
            })
        }
        onMounted(() => {
            // 加载canvas背景
            initLoginBg();
            // 监听enter事件（调用登录）
            document.onkeydown = (e: any) => {
                e = window.event || e;
                if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
                    if (loading.value) return;
                    handleLogin(loginFormRef.value);
                }
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
                    <ElForm ref={loginFormRef} model={loginForm} rules={loginRules} size="large">
                        <ElSpace direction="vertical" size="small" style={{ display: 'flex' }}>
                            <ElFormItem prop="username">
                                <ElInput v-model={loginForm.username} placeholder="用户名"></ElInput>
                            </ElFormItem>
                            <ElFormItem prop="password">
                                <ElInput v-model={loginForm.password} placeholder="密码" type="password" show-password></ElInput>
                            </ElFormItem>
                            <ElButton type="primary" class="loginBtn" onClick={() => handleLogin(loginFormRef.value)}>登录</ElButton>
                        </ElSpace>
                    </ElForm>
                </div>
            </div>
        )
    }
})
