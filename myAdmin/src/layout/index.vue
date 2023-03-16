<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <SideBar />
    </el-aside>
    <el-container :class="['main-container',isHide]">
      <el-header height="84px" style="padding: 0">
        <NavBar :key="$route.fullPath" />
      </el-header>
      <el-main style="background: #f7f9f8" :class="isScroll">
        <div class="fade-transform-box">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="$route.fullPath" />
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    SideBar,
    NavBar,
  },
  computed: {
    isHide() {
      return this.$store.getters.isCollapse?"hideSideBar" :"";
    },
    isScroll() {
      return this.$store.state.collapse ? "isScroll" : "";
    },
  },
};
</script>
<style scoped>
.main-container {
  transition: margin-left 0.5s ease 0s;
  margin-left: 210px;
  min-height: 100vh;
}
.hideSideBar {
  margin-left: 64px;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.4s ease 0s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-transform-box {
  position: relative;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
@media (max-width: 759px) {
  .isScroll {
    max-width: 100%;
    max-height: calc(100vh - 84px);
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
</style>