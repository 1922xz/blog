<template>
  <v-app-bar
    app
    :class="isDown"
    flat
    height="60"
    style="z-index: 9999; width: 100%"
  >
    <!-- 手机端导航栏 -->
    <div class="d-md-none nav-mobile-container">
      <div style="font-size: 18px; font-weight: bold">
        <router-link to="/">
          {{ websiteAuthor }}
        </router-link>
      </div>
      <div style="margin-left: auto">
        <a @click="openSearch"><i class="iconfont icon-search" /></a>
        <a @click="openDrawer" style="margin-left: 10px; font-size: 20px">
          <i class="iconfont icon-caidan" />
        </a>
      </div>
    </div>
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="blog-title float-left">
        <router-link to="/">
          {{ websiteAuthor }}
        </router-link>
        <span
          class="iconfont"
          :class="themeClass"
          style="
            font-size: 28px;
            font-weight: 700;
            margin-left: 10px;
            cursor: pointer;
          "
          @click="changeTheme"
        />
      </div>
      <div class="nav-title float-right">
        <div class="menus-item">
          <a class="menu-btn" @click="openSearch">
            <i class="iconfont icon-search" />搜索
          </a>
        </div>
        <div class="menus-item">
          <router-link class="menu-btn" to="/">
            <i class="iconfont icon-home" />首页
          </router-link>
        </div>
        <div class="menus-item">
          <a class="menu-btn">
            <i class="iconfont icon-faxian" />发现<i
              class="iconfont icon-expand"
            />
          </a>
          <ul class="menus-submenu">
            <li class="first">
              <router-link to="/archives">
                <i class="iconfont icon-guidang" />归档
              </router-link>
            </li>
            <li>
              <router-link to="/categories">
                <i class="iconfont icon-fenlei" /> 分类
              </router-link>
            </li>
            <li class="last">
              <router-link to="/tags">
                <i class="iconfont icon-biaoqian" /> 标签
              </router-link>
            </li>
          </ul>
        </div>
        <div class="menus-item">
          <a href="" class="menu-btn">
            <i class="iconfont icon-yule" />娱乐<i
              class="iconfont icon-expand"
            />
          </a>
          <ul class="menus-submenu">
            <li class="first">
              <router-link to="/albums">
                <i class="iconfont icon-xiangce" /> 相册
              </router-link>
            </li>
            <li class="last">
              <router-link to="/talks">
                <i class="iconfont icon-shuoshuo" /> 说说
              </router-link>
            </li>
          </ul>
        </div>
        <!-- <div class="menus-item">
          <router-link class="menu-btn" to="/">
            <i class="mdi mdi-link-variant" />友链
          </router-link>
        </div>
        <div class="menus-item">
          <router-link class="menu-btn" to="/about">
            <i class="mdi mdi-information-outline" />关于
          </router-link>
        </div> -->
        <div class="menus-item">
          <router-link class="menu-btn" to="/message">
            <i class="iconfont icon-liuyan" />留言
          </router-link>
        </div>
        <div class="menus-item">
          <a
            v-if="!this.$store.state.user.avatar"
            @click="openLogin"
            class="menu-btn"
          >
            <i class="iconfont icon-denglu" />登录
          </a>
          <template v-else>
            <img
              class="user-avatar"
              :src="this.$store.state.user.avatar"
              height="30"
              width="30"
            />
            <ul class="menus-submenu">
              <li>
                <router-link to="/user">
                  <i class="iconfont icon-gerenzhongxin" /> 个人中心
                </router-link>
              </li>
              <li>
                <a @click="logout"><i class="iconfont icon-tuichu" /> 退出</a>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    document.addEventListener("scroll", this.scroll, true);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scroll);
  },
  data() {
    return {
      isDown: "",
      top: 430,
      scrollDown: true,
      themeClass: "icon-night",
    };
  },
  methods: {
    changeTheme() {
      this.$store.commit("switchTheme");
      if (this.isDark) {
        this.themeClass = "icon-sun";
      } else {
        this.themeClass = "icon-night";
      }
    },
    openDrawer() {
      this.$store.commit("openDrawer");
    },
    openSearch() {
      this.$store.commit("switchSearch", true);
    },
    logout() {
      if (this.$route.path == "/user") {
        this.$router.go(-1);
      }
      this.$store.commit("logout");
      this.$toast({ type: "success", message: "注销成功" });
    },
    scroll() {
      let scrollTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      if (scrollTop > 430) {
        if (this.scrollDown && scrollTop > this.top) {
          this.isDown = "up";
          this.scrollDown = false;
        }
        if (!this.scrollDown && scrollTop < this.top) {
          this.isDown = "down";
          this.scrollDown = true;
        }
        this.top = scrollTop;
      } else {
        this.isDown = "";
      }
    },
    openLogin() {
      this.$store.commit("switchLogin", true);
    },
  },
  computed: {
    ...mapGetters(["websiteAuthor", "isDark"]),
  },
};
</script>
<style lang='scss'>
header.up,
header.down {
  background: var(--nav-bg) !important;
  transition-delay: 0.5 !important;
  transition-duration: 1 !important;
  transition-timing-function: ease;
  box-shadow: 0.1rem 0.1rem 0.2rem var(--grey-9-a1);
  text-shadow: 0 0 0.0625rem var(--grey-9-a1);
  .nav-container .nav-title .menus-item .menus-submenu {
    background-color: #21252b;
  }
}
header.up {
  transform: translateY(-60px) !important;
}
header.down {
  transform: translateY(0px) !important;
}
</style>
<style scoped lang="scss">

/* 修改v-app-bar默认样式 */
header {
  // transition-duration: 1s;
  background-color: var(--nav-bg) !important;
}
.nav-mobile-container {
  width: 100%;
  display: flex;
  align-items: center;
  a {
    color: var(--grey-0);
  }
}
.nav-container {
  color: var(--header-text-color);
  font-size: 14px;
  width: 100%;
  height: 100%;
  .blog-title a {
    font-family: "Fredericka the Great", Mulish, -apple-system, "PingFang SC",
      "Microsoft YaHei", sans-serif;
    color: currentColor;
    font-size: 21px;
    font-weight: bold;
  }
  .blog-title,
  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .nav-title .menus-item {
    position: relative;
    margin: 0 0 0 0.875rem;
    i,
    a {
      color: var(--header-text-color);
      font-weight: 600;
      font-size: 17px;
      margin-right: 2px;
    }
    .menu-btn:after {
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background-color: var(--color-blue);
      content: "";
      transition: all 0.3s ease-in-out;
    }
    .menu-btn:hover:after {
      width: 100%;
    }
    .menus-submenu {
      &:before {
        position: absolute;
        top: -8px;
        left: 0;
        width: 100%;
        height: 20px;
        content: "";
      }
      position: absolute;
      display: none;
      right: 0;
      width: max-content;
      margin-top: 8px;
      box-shadow: 0 5px 20px -4px var(--grey-9-a1);
      background-color:var(--grey-9-a5);
      border-radius: 8px 0 8px 0;
      animation: submenu 0.3s 0.1s ease both;
      li:hover {
        // color: var(--grey-0);
        background-image: linear-gradient(to right, var(--color-pink-old) 0, var(--color-orange-old) 100%);
        box-shadow: 0 0 0.75rem rgb(237 110 160 / 30%);
        a{
          transform: translateX(7px);
          transition-duration: 0.3s; ;
        }
      }
      li:first-child:hover {
        border-top-left-radius: 10px;
      }
      li:last-child:hover {
        border-bottom-right-radius: 10px;
      }
      a {
        color: currentColor;
        line-height: 2;
        text-shadow: none;
        display: block;
        padding: 6px 14px;
      }
    }
    &:hover .menus-submenu {
      display: block;
    }
    .user-avatar {
      cursor: pointer;
      // border-radius: 50%;
    }
  }
}
@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0); //兼容其他浏览器
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}
</style>

