<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { generaMenu } from "./assets/js/menu";
// import {initRecalc} from './assets/js/rem'
export default {
  name: "App",
  mounted() {
    // console.log(1);
    // initRecalc()
    console.log("vue实例被创建了");
    // 2.禁止选中文字
    // document.addEventListener("selectstart", function (e) {
    //   e.preventDefault();
    // });
    // 刷新页面查询用户菜单
    if (localStorage.getItem("token")) {
      console.log(this.$store.state.user);
      generaMenu(this.$store.state.user.userinfo.id);
    }
  },
};
</script>

<style>
</style>
