<template>
  <v-dialog v-model="loginFlag" max-width="460">
    <v-card class="login-container">
      <v-icon class="float-right" @click="loginFlag = false"  :dark="isDark">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          :dark="isDark"
          v-model="username"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          clearable
          @keyup.enter="login"
        />
        <!-- 密码 -->
        <v-text-field
          :dark="isDark"
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          @keyup.enter="login"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn
          class="mt-7"
          color="blue"
         :dark="isDark"
          @click="login"
          block
        >
          登录
        </v-btn>
        <!-- 注册和忘记密码 -->
        <div class="login-tip mt-10">
          <span @click="openRegister">立即注册</span>
          <span @click="openForget" class="float-right">忘记密码</span>
        </div>
        <div class="other">
          <span>其他登陆</span>
          <i href="" class="mdi mdi-qqchat" @click="qqLogin"/>
          <i href="" class="mdi mdi-wechat"/>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { login } from "@/api/user.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      show: false,
    };
  },
  computed: {
    loginFlag: {
      set(value) {
        this.$store.commit("switchLogin", value);
      },
      get() {
        return this.$store.state.user.loginFlag;
      },
    },
    ...mapGetters(["isDark"]),
  },
  methods: {
    qqLogin() {
      //保留当前路径
      // this.$store.commit("saveLoginUrl", this.$route.path);
      if (
        navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      ) {
        // eslint-disable-next-line no-undef
        QC.Login.showPopup({
          appId: this.config.QQ_APP_ID,
          redirectURI: this.config.QQ_REDIRECT_URI
        });
      } else {
        window.open(
          "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=" +
            +this.config.QQ_APP_ID +
            "&response_type=token&scope=all&redirect_uri=" +
            this.config.QQ_REDIRECT_URI,
          "_self"
        );
      }
    },
    login() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({ type: "error", message: "邮箱格式不正确" });
        return false;
      }
      if (this.password.trim().length == 0) {
        this.$toast({ type: "error", message: "密码不能为空" });
        return false;
      }
      let param = {
        username: this.username,
        password: this.password,
      };
      login(param).then((res) => {
        console.log("登录res", res);
        if (res.flag) {
          this.password = "";
          this.$store.commit("login", res);
          this.$store.commit("closeModel");
          this.$toast({
            type: "success",
            message: "登录成功",
          });
        } else {
          // console.log(res);
          this.$toast({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    openRegister() {
      this.$store.commit("openRegister");
    },
    openForget() {
      this.$store.commit("openForget");
    },
  },
};
</script>
<style scoped lang='scss'>
.login-tip span{
  color: var(--text-color)
}
.login-container{
  position: relative;
}
.other{
  color: var(--text-color);
  position: absolute;
  bottom: 20px;
  left: 40px;
   .mdi::before{
    font-size: 25px;
    margin-left: 6px;
   }
}
</style>