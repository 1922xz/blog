<template>
  <v-app id="app">
    <!-- <TopNavBar /> -->
    <v-main style="padding: 80 0 0 0">
      <mainContainer/>
    </v-main>
    <!-- <Footer /> -->
    <!-- 登录模块框 -->
    <LoginModel />
    <!-- 注册模块 -->
    <register />
    <!-- 忘记密码 -->
    <forget />
    <!-- 搜索模块 -->
    <searchModel />
    <chatRoom />
  </v-app>
</template>

<script>
import mainContainer from '@/components/layout/mainContainer'
// import TopNavBar from "@/components/layout/TopNavBar";
import LoginModel from "@/components/content/model/LoginModel.vue";
import register from "@/components/content/model/RegisterModel.vue";
import forget from "@/components/content/model/ForgetModel.vue";
import searchModel from "@/components/content/model/SearchModel";
import chatRoom from "@/components/chatRoom/index";
import { getWebsiteConfig } from "@/api/websiteConfig.js";
export default {
  name: "App",
  components: {
    mainContainer,
    // TopNavBar,
    LoginModel,
    register,
    forget,
    searchModel,
    chatRoom,
  },

  created() {
    // console.log(document.readyState);
    this.getBlogInfo();
  },
  methods: {
    getBlogInfo() {
      getWebsiteConfig().then((res) => {
        if (res) {
          console.log(res);
          this.$store.commit("checkBlogInfo", res);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@use "sass:list";
@use "sass:math";
.v-main__wrap .row{
  margin: 0;
}
</style>