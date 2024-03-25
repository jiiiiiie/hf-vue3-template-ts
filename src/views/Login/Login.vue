<template>
  <div
    :class="prefixCls"
    class="h-[100%] relative <xl:bg-v-dark <sm:px-10px <xl:px-10px <md:px-10px"
  >
    <div class="loginBox absolute h-full flex mx-auto">
      <div class="flex-1 relative">
        <!-- 右上角的主题、语言选择 -->
        <div class="pt-[36px] flex justify-between items-center">
          <div class="flex items-center ml-[131px]">
            <img alt="" class="w-200px h-[52px]" src="@/assets/imgs/logo.png" />
          </div>
          <div class="flex justify-end mr-[131px]">
            <XButton
              title="APP下载"
              class="w-[100%] download"
              type="primary"
              @click="showDownload = true"
              v-if="showDownload == false"
            />
            <XButton
              title="登录"
              class="w-[100%] download"
              type="primary"
              @click="showDownload = false"
              v-if="showDownload == true"
            />
          </div>
        </div>
        <div class="sign-wrap">
          <div class="main-box flex" v-if="!showDownload">
            <!-- 左边轮播图 -->
            <div class="banner">
              <el-carousel trigger="click" height="510px" arrow="never">
                <el-carousel-item>
                  <img
                    src="http://hefangoss.oos-sdqd.ctyunapi.cn/2023-05-29/1663032983063367682.jpg"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <img
                    src="http://hefangoss.oos-sdqd.ctyunapi.cn/2023-05-29/1663056399573192705.jpg"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <img
                    src="http://hefangoss.oos-sdqd.ctyunapi.cn/2023-05-29/1663056506687328258.jpg"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- 右边的登录界面 -->
            <Transition appear enter-active-class="animate__animated animate__bounceInRight">
              <div
                class="h-full flex items-center m-auto w-[100%] 2xl:max-w-[500px] xl:max-w-[500px] md:max-w-[500px] lg:max-w-[500px]"
              >
                <!-- 账号登录 -->
                <LoginForm class="p-[20px] h-auto m-auto" />
                <!-- 手机登录 -->
                <!-- <MobileForm class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)" /> -->
                <!-- 二维码登录 -->
                <!-- <QrCodeForm class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)" /> -->
                <!-- 注册 -->
                <!-- <RegisterForm class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)" /> -->
                <!-- 三方登录 -->
                <!-- <SSOLoginVue class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)" /> -->
              </div>
            </Transition>
          </div>
          <div class="main-box" v-else>
            <Transition appear enter-active-class="animate__animated animate__bounceInRight">
              <div class="appCode">
                <h3>手机扫描二维码下载管家端APP</h3>
                <div class="app-qrcode flex justify-center items-center">
                  <div class="list items-center">
                    <p class="qrcode">
                      <img
                        src="../../assets/imgs/login/app-android-qrcode.png"
                        width="200"
                        height="200"
                      />
                    </p>
                    <p>
                      <img
                        src="http://hefangoss.oos-sdqd.ctyunapi.cn/2023-05-29/1663032749931368450.png"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div class="sign-bot">
            <p>合肥市住房租赁发展股份有限公司</p>
          </div>
        </div>
      </div>
    </div>
    <Particles />
  </div>
</template>
<script lang="ts" name="Login" setup>
// @ts-nocheck
import { ref } from "vue";
import { useDesign } from "@/hooks/web/useDesign";
import LoginForm from "./components/LoginForm.vue";
import Particles from "@/components/particles/index.vue";
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("login");
const showDownload = ref(false);
</script>

<style lang="scss" scoped>
.loginBox {
  z-index: 99;
  width: 100%;
  height: 100%;
}

.download {
  width: 100px;
  padding: 5px 15px;
  font-size: 16px;
  vertical-align: middle;
  background: #59acff;
  border: 1px solid #59acff;
  border-radius: 45px;
}

.sign-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);

  .sign-bot {
    position: relative;
    margin: 50px auto 0;
    text-align: center;

    p {
      font-size: 14px;
      color: #59acff;

      &::before {
        display: inline-block;
        width: 80px;
        height: 1px;
        margin-right: 20px;
        vertical-align: middle;
        content: "";
        border-top: 1px solid #59acff;
      }

      &::after {
        display: inline-block;
        width: 80px;
        height: 1px;
        margin-left: 20px;
        vertical-align: middle;
        content: "";
        border-top: 1px solid #59acff;
      }
    }
  }
}

.main-box {
  width: 910px;
  height: 510px;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 38px 4px #dedede;

  .banner {
    width: 400px;
    height: 510px;

    :deep(.el-carousel) {
      .el-carousel__indicators--horizontal {
        bottom: 20px;
      }
    }
  }

  .appCode {
    h3 {
      padding-top: 90px;
      font-size: 22px;
      font-weight: normal;
      color: #333;
      text-align: center;
    }

    .app-qrcode {
      padding: 50px 50px 0;

      .list {
        text-align: center;

        img {
          margin: 0 auto;
        }
      }

      .qrcode {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
