<template>
  <el-form
    v-show="getShow"
    ref="formLogin"
    :model="loginData.loginForm"
    :rules="LoginRules"
    class="login-form"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <el-row class="!mx-[-10px]">
      <el-col :span="24" class="!px-[10px]">
        <el-form-item>
          <LoginFormTitle class="!w-full" />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="!px-[10px]">
        <el-form-item v-if="loginData.tenantEnable === 'true'" prop="tenantName">
          <el-input
            v-model="loginData.loginForm.tenantName"
            placeholder="请输入租户名称"
            :prefix-icon="iconHouse"
            type="primary"
            link
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="!px-[10px]">
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginData.loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="iconAvatar"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="!px-[10px]">
        <el-form-item prop="password">
          <el-input
            v-model="loginData.loginForm.password"
            placeholder="请输入密码"
            :prefix-icon="iconLock"
            show-password
            type="password"
            @keyup.enter="getCode()"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="!px-[10px]">
        <el-form-item>
          <XButton
            :loading="loginLoading"
            title="登录"
            class="w-[100%] !bg-[#409eff]"
            type="primary"
            @click="getCode()"
          />
        </el-form-item>
      </el-col>
      <Verify
        ref="verify"
        :captchaType="captchaType"
        :imgSize="{ width: '400px', height: '200px' }"
        :boxHeight="510"
        mode="pop"
        @success="handleLogin"
      />
    </el-row>
  </el-form>
</template>
<script lang="ts" name="LoginForm" setup>
import { useRouter } from "vue-router";
import { ref, computed, reactive, watch, onMounted, unref } from "vue";
import { ElLoading } from "element-plus";
import LoginFormTitle from "./LoginFormTitle.vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

import { useIcon } from "@/hooks/web/useIcon";

import * as authUtil from "@/utils/auth";
import * as LoginApi from "@/api/login";
import { LoginStateEnum, useLoginState } from "./useLogin";

const iconHouse = useIcon({ icon: "ep:house" });
const iconAvatar = useIcon({ icon: "ep:avatar" });
const iconLock = useIcon({ icon: "ep:lock" });
const formLogin = ref();
const { getLoginState } = useLoginState();
const { currentRoute, replace } = useRouter();
const redirect = ref<string>("");
const loginLoading = ref(false);
const verify = ref();
const captchaType = ref("blockPuzzle"); // blockPuzzle 滑块 clickWord 点击文字

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const LoginRules = {
  tenantName: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    // tenantName: '',
    // username: '',
    // password: '',
    captchaVerification: "",
    rememberMe: false,
    tenantName: "测试专用",
    username: "test112",
    password: "123456"
  }
});

// 获取验证码
const getCode = async () => {
  // 先校验填写情况
  if (!formLogin.value) return;
  const valid = await formLogin.value.validate();
  if (!valid) return;
  // 情况一，未开启：则直接登录
  if (loginData.captchaEnable === "false") {
    await handleLogin({});
  } else {
    // 情况二，已开启：则展示验证码；只有完成验证码的情况，才进行登录
    // 弹出验证码
    verify.value.show();
  }
};
//获取租户ID
const getTenantId = async () => {
  if (loginData.tenantEnable === "true") {
    const res = await LoginApi.getTenantIdByName(loginData.loginForm.tenantName);
    authUtil.setTenantId(res);
  }
};
// 记住我
const getCookie = () => {
  const loginForm = authUtil.getLoginForm();
  if (loginForm) {
    loginData.loginForm = {
      ...loginData.loginForm,
      username: loginForm.username ? loginForm.username : loginData.loginForm.username,
      password: loginForm.password ? loginForm.password : loginData.loginForm.password,
      rememberMe: loginForm.rememberMe ? true : false,
      tenantName: loginForm.tenantName ? loginForm.tenantName : loginData.loginForm.tenantName
    };
  }
};
// 登录
const handleLogin = async (params: any) => {
  loginLoading.value = true;
  try {
    await getTenantId();
    loginData.loginForm.captchaVerification = params.captchaVerification;
    const res = await LoginApi.login(loginData.loginForm);
    if (!res) {
      return;
    }

    ElLoading.service({
      lock: true,
      text: "正在加载系统中...",
      background: "rgba(0, 0, 0, 0.7)"
    });
    if (loginData.loginForm.rememberMe) {
      authUtil.setLoginForm(loginData.loginForm);
    } else {
      authUtil.removeLoginForm();
    }
    authUtil.setToken(res);
    if (!redirect.value) {
      redirect.value = "/";
    }
    // 判断是否为SSO登录
    if (redirect.value.indexOf("sso") !== -1) {
      window.location.href = window.location.href.replace("/login?redirect=", "");
    } else {
      replace({ path: redirect.value || "/" });
    }
  } catch {
    loginLoading.value = false;
  } finally {
    setTimeout(() => {
      const loadingInstance = ElLoading.service();
      loadingInstance.close();
    }, 400);
  }
};
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string;
  },
  {
    immediate: true
  }
);
onMounted(() => {
  getCookie();
});
</script>

<style lang="scss" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}

.login-code {
  float: right;
  width: 100%;
  height: 38px;

  img {
    width: 100%;
    max-width: 100px;
    height: auto;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
