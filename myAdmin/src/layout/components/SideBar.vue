<template>
  <div>
    <div class="drawer-bg" v-show="!isCollapse" @click="closeDrawer"></div>
    <el-menu
      router
      :collapse="isCollapse"
      :default-active="this.$route.path"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
      class="side-nav-bar"
      :class="isShow"
    >
      <template v-for="route of this.$store.state.userMenuList">
        <!-- 二级菜单 -->
        <template v-if="route.name && route.children && !route.hidden">
          <el-submenu :key="route.path" :index="route.path">
            <!-- 二级菜单标题 -->
            <template slot="title">
              <i :class="route.icon" />
              <span>{{ route.name }}</span>
            </template>
            <!-- 二级菜单选项 -->
            <template v-for="(item, index) of route.children">
              <el-menu-item
                v-if="!item.hidden"
                :key="index"
                :index="item.path"
                @click="closeDrawer"
              >
                <i :class="item.icon" />
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="!route.hidden">
          <el-menu-item
            :index="route.path"
            :key="route.path"
            @click="closeDrawer"
          >
            <i :class="route.children[0].icon" />
            <span slot="title">{{ route.children[0].name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data(){
    return {
      collapse:this.isCollapse,
    }
  },
  methods: {
    closeDrawer() {
      if (window.innerWidth < 760) {
        this.$store.commit("trigger");
      }
    },
  },
  mounted(){
    window.addEventListener('resize',()=>{
      if (window.innerWidth < 760) {
        this.collapse=!this.isCollapse
      }else{
        this.collapse=this.isCollapse
      }
    })
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
    isShow() {
      return this.isCollapse ? "":"open";
    },
  },
};
</script>
<style scoped>
.side-nav-bar:not(.el-menu--collapse) {
  width: 210px;
}
.side-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.side-nav-bar i {
  margin-right: 1rem;
}
*::-webkit-scrollbar {
  width: 0.5rem;
  height: 1px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: rgba(144, 147, 153, 0.3);
}
@media (max-width: 759px) {
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    position: absolute;
    z-index: 99;
    height: 100%;
    top: 0;
  }
  .side-nav-bar {
    z-index: 99;
    transform: translateX(-210px);
  }
  .open {
    transform: translateX(0px);
  }
  /* .side-nav-bar{
    position: relative;
  } */
}
</style>