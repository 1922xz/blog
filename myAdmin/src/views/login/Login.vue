<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">login</div>
      <div class="form-wrapper">
        <input
          type="text"
          name="username"
          placeholder="username"
          class="input-item"
          v-model="username"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          class="input-item"
          v-model="password"
        />
        <button class="btn" @click="login">Login</button>
      </div>
      <ul class="msg">
        <li>
          <span class="msgtitle">&emsp;管理员</span>
          <span class="item">用户名:<a href="#">admin</a></span>
          <span class="item">密码:<a href="#">123456</a></span>
        </li>
        <li>
          <span class="msgtitle">&emsp;测试</span>

          <span class="item">用户名:<a href="#">test</a></span>
          <span class="item">密码:<a href="#">123456</a></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { generaMenu } from "@/assets/js/menu.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let userinfo = {
        username: this.username,
        password: this.password,
      };
      // console.log(this.$store);
      let result = await this.$store.dispatch("login", userinfo);
      if (result) {
        // console.log(result);
        // console.log(this.$store);
        generaMenu();
        this.$router.push("/");
        this.$notify.success({
          title: "成功",
          message: "登录成功",
        });
      } else {
        this.$notify.error({
          title: "失败",
          message: "登录失败",
        });
      }
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  min-height: 600px;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
@media screen and (max-width: 759px) {
  .login-wrapper {
    width: 100%;
    height: 100%;
  }
  .input-item,
  .btn,
  .msg {
    width: 90%;
    margin: 0 auto;
  }
  .msg {
    font-size: 60%;
  }
}
@media screen and (min-width: 760px) {
  .login-wrapper {
    width: 24%;
    height: 70%;
    padding: 0 4rem;
  }
  .input-item,
  .btn {
    width: 100%;
  }
}
.login-wrapper {
  background-color: #fff;
  /* width: 24%;
  height: 70%; */
  min-height: 500px;
  border-radius: 0.2rem;

  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 10rem;
}
.msg {
  margin-top: 1rem;
  text-align: left;
  line-height: 1.5rem;
}
.msg span {
  margin-right: 0.6rem;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
.input-item {
  display: block;

  outline: none;
  border: 0;
  border-bottom: 0.1rem solid rgb(128, 125, 125);
  margin-bottom: 0.9rem;
  padding: 0.7rem 0;
  font-size: 1.3rem;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 0.7rem;
  display: block;
  margin-top: 1.2rem;
  color: #fff;
  background-image: linear-gradient(to left, #a6c1ee, #fbc2eb);
  outline: none;
  border: 0;
  cursor: pointer;
}
li {
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
}
li .item,
.msgtitle {
  flex: 1;
}
/* .msgtitle{
  display: block;
  padding-left: .1rem;
} */
</style>