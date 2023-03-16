<template>
  <div>
    <div class="banner">
      <h1 class="banner-title">个人中心</h1>
    </div>
    <v-card class="blog-container">
      <div>
        <span class="info-title">基本信息</span>
      </div>
      <v-row class="info-wrapper">
        <v-col md="3" cols="12">
          <button id="pick-avatar">
            <v-avatar size="140">
              <img :src="this.$store.state.avatar" />
            </v-avatar>
          </button>
          <avatar-cropper
            trigger="#pick-avatar"
            upload-url="auth/users/avatar"
            @uploading="handleUploading"
            @uploaded="handleUploaded"
            @completed="handleCompleted"
            @error="handlerError"
          />
        </v-col>
        <v-col md="7" cols="12">
          <v-text-field
            v-model="userInfo.nickname"
            label="昵称"
            placeholder="请输入您的昵称"
          />

          <v-text-field
            v-model="userInfo.webSite"
            class="mt-7"
            label="个人网站"
            placeholder="http://你的网址"
          />
          <v-text-field
            v-model="userInfo.intro"
            class="mt-7"
            label="简介"
            placeholder="介绍下自己吧"
          />
          <div class="mt-7 binding">
            <v-text-field
              disabled
              v-model="email"
              label="邮箱号"
              placeholder="请绑定邮箱"
            />
            <v-btn v-if="email" text small @click="openEmailModel">
              修改绑定
            </v-btn>
            <v-btn v-else text small @click="openEmailModel"> 绑定邮箱 </v-btn>
          </div>
          <v-btn @click="updataUserInfo" outlined class="mt-5">修改</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import service from "@/utils/axios";

export default {
  components: {
    AvatarCropper,
  },
  data() {
    return {
      userInfo: {
        nickname: this.$store.state.nickname,
        intro: this.$store.state.intro,
        webSite: this.$store.state.webSite,
        loginType: this.$store.state.loginType,
      },
    };
  },
  methods: {
    updataUserInfo() {
      service({
        url: "/auth/updateInfo",
        method: "get",
      })
        .then(() => {
          this.$store.commit("updateUserInfo", this.userInfo);
          this.$toast({ type: "success", message: "修改成功" });
        })
        .catch((err) => {
          this.$toast({
            message: err.response.data,
            type: "error",
          });
        });
    },
    handleUploading() {},
    handleUploaded() {},
    handleCompleted() {},
    handlerError() {},
    openEmailModel() {},
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    loginType() {
      return this.$store.state.loginType;
    },
  },
};
</script>

<style scoped>
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pick-avatar {
  outline: none;
}
.binding {
  display: flex;
  align-items: center;
}
</style>