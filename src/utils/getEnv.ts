// 将所有环境变量配置文件读取到process.env
export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: ViteEnv = {
    VITE_API_URL: '',
    VITE_PORT: 0,
    VITE_OPEN: false,
    VITE_GLOB_APP_TITLE: '',
    VITE_DROP_CONSOLE: false,
    VITE_PROXY_URL: '',
    VITE_BUILD_GZIP: false,
    VITE_REPORT: false,
  };

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") realName = Number(realName);

    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) { }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
