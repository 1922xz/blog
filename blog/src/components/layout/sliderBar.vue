<template>
  <!-- 博主信息 -->
  <div class="animated zoomIn mt-5 d-md-block d-none sidebar">
    <ul class="tab" v-if="showTab">
      <li class="item" :class="contents" @click="switchTab('contents')">
        <i class="mdi mdi-format-list-bulleted" /><span>文章目录</span>
      </li>
      <li class="item" :class="related" @click="switchTab('related')">
        <i class="mdi mdi-family-tree" /><span>系列文章</span>
      </li>
      <li class="item" :class="overview" @click="switchTab('overview')">
        <i class="mdi mdi-home-account" /><span>站点概述</span>
      </li>
    </ul>
    <div v-show="overview">
      <div class="author-wrapper">
        <!-- 博主头像 -->
        <v-avatar size="110">
          <img src="~@/assets/img/avatar.jpeg" class="author-avatar" />
        </v-avatar>
        <div style="font-size: 1.375rem; margin-top: 0.625rem">
          {{ blogInfo.websiteAuthor }}
        </div>
        <div style="font-size: 0.875rem">
          {{ blogInfo.websiteIntro }}
        </div>
      </div>
      <!-- 博客信息 -->
      <div class="blog-info-wrapper">
        <div class="blog-info-data">
          <router-link to="/archives">
            <div style="font-size: 0.875rem">文章</div>
            <div style="font-size: 1.25rem">
              {{ blogInfo.articleCount }}
            </div>
          </router-link>
        </div>
        <div class="blog-info-data">
          <router-link to="/categories">
            <div style="font-size: 0.875rem">分类</div>
            <div style="font-size: 1.25rem">
              {{ blogInfo.categoryCount }}
            </div>
          </router-link>
        </div>
        <div class="blog-info-data">
          <router-link to="/tags">
            <div style="font-size: 0.875rem">标签</div>
            <div style="font-size: 1.25rem">
              {{ blogInfo.tagCount }}
            </div>
          </router-link>
        </div>
      </div>
      <ul class="tabLine">
        <li class="tabItem" :class="isActive('/')">
          <router-link to="/">首页</router-link>
        </li>
        <li class="tabItem" :class="isActive('/about')">
          <router-link to="/about">关于</router-link>
        </li>
        <li class="article" :class="submenuActive">
          文章
          <ul>
            <li class="tabItem" :class="isActive('/archives')">
              <router-link to="/archives">归档</router-link>
            </li>
            <li class="tabItem" :class="isActive('/categories')">
              <router-link to="/categories">分类</router-link>
            </li>
            <li class="tabItem" :class="isActive('/tags')">
              <router-link to="/tags">标签</router-link>
            </li>
          </ul>
        </li>

        <li class="tabItem" :class="isActive('/archive')">
          <router-link to="/archive">友链</router-link>
        </li>
      </ul>
      <!-- 收藏按钮 -->
      <a class="collection-btn">
        <v-icon color="var(--grey-0)" size="18" class="mr-1">mdi-bookmark</v-icon
        >加入书签
      </a>
      <!-- 社交信息 -->
      <div class="card-info-social">
        <a class="mr-5 iconfont icon-qq" target="_blank" />
        <a class="mr-5 iconfont icon-github" />
        <a target="_blank" class="iconfont icon-gitee" />
      </div>
      <div class="web-info-title">
        <v-icon size="18" class="ad">mdi-bell</v-icon>
        公告
      </div>
      <div style="font-size: 0.875rem">
        {{ blogInfo.websiteNotice }}
        网站通告
      </div>
      <div class="web-info-title">
        <v-icon size="18">mdi-chart-line</v-icon>
        网站资讯
      </div>
      <div class="web-info">
        <div style="padding: 4px 0 0">
          运行时间:<span class="float-right">运行时间</span>
        </div>
        <div style="padding: 4px 0 0">
          总访问量:<span class="float-right">
            {{ blogInfo.viewsCount }}
          </span>
        </div>
      </div>
    </div>
    <div v-show="related">
      <v-timeline :dense="true">
        <v-timeline-item
          :right="true"
          :small="true"
          color="var(--color-pink-old)"
          v-for="item in newArticleList"
          :key="item.id"
          ><router-link :to="'/articles/' + item.id">{{
            item.articleTitle
          }}</router-link>
        </v-timeline-item>
      </v-timeline>
    </div>
    <div v-show="contents">
      <!-- 文章目录 -->
      <div class="right-title right-container">
        <i class="iconfont icon-fenlei" style="font-size: 16.8px" />
        <span style="margin-left: 10px">目录</span>
      </div>
      <div id="toc" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      contents: "",
      newArticleList: [],
      related: "",
      overview: "active",
    };
  },
  methods: {
    switchTab(type) {
      this.contents = "";
      this.related = "";
      this.overview = "";
      if (type == "contents") {
        this.contents = "active";
      } else if (type == "related") {
        this.related = "active";
      } else {
        this.overview = "active";
      }
    },
    initNewArticle(data) {
      this.newArticleList = data;
    },
  },
  mounted() {
    // console.log(this.showTab);
    if (this.showTab) {
      this.contents = "active";
      this.overview = "";
    }
    this.$bus.$on("initNewArticle", this.initNewArticle);
  },
  computed: {
    submenuActive() {
      let submenuRoute = ["/tags", "/archives", "/categories"];
      if (submenuRoute.indexOf(this.$route.path.split()[0]) != -1) {
        return "submenuActive";
      } else {
        return "submenu";
      }
    },
    isActive() {
      return (path) => (this.$route.path === path ? "active" : "");
    },
    ...mapGetters(["blogInfo"]),
    showTab() {
      return this.$route.fullPath.split("/").indexOf("articles") != -1;
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.path.split("/").indexOf("articles") != -1) {
          this.contents = "active";
          this.overview = "";
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style scoped lang='scss'>
.sidebar {
  // 设置滚动条透明
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  max-height: 98vh;
  overflow-y: scroll;
  line-height: 2;
  padding: 1.25rem 1.5rem;
  top: 0px;
  position: relative;
  right: 75px;
  z-index: 1;
  max-width: 260px;
  min-width: 260px;
  // 去掉v-card默认阴影
  .v-sheet.v-card:not(.v-sheet--outlined),
  .theme--light.v-card {
    box-shadow: none !important;
    /* box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%); */
  }
  .tab {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 1.875rem 0 0.625rem;
    margin: 0;
    min-height: 1.875rem;
    li {
      cursor: pointer;
      display: inline-flex;
      font-size: 0.875em;
      padding: 0.3125rem 0.9375rem;
      color: var(--grey-5);
      border-radius: 0.625rem;
      text-align: center;
      text-decoration: none;
      background-color: var(--grey-9-a1);
      transition: all 0.2s ease-out 0s;
      span {
        display: none;
      }
    }
    li.active {
      background-image: linear-gradient(to right, var(--color-pink-old) 0, var(--color-orange-old) 100%);
      box-shadow: 0 0 0.75rem var(--color-pink-old);
      color: var(--grey-0);
    }
    .active span {
      display: inline-flex;
    }
  }
  .author-wrapper {
    text-align: center;
    color: var(--text-color);
    .author-avatar {
      transition: all 0.7s;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  .blog-info-wrapper {
    display: flex;
    justify-self: center;
    padding: 0.875rem 0;
    .blog-info-data {
      flex: 1;
      text-align: center;
      &:hover a {
        color: var(--color-blue);
      }
    }
  }
  .tabLine {
    li {
      a {
        display: block;
        line-height: 3;
      }
      cursor: pointer;
      border-radius: 15px;
      margin: 10px auto;
      width: 80%;
      text-align: center;
      overflow: hidden;
      &:hover {
        background-color: var(--grey-9-a1);
      }
    }
    .submenu {
      color: var(--text-color);
      ul {
      display: none;
      li {
        width: 100%;
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
    }
    li.article:not(.submenuActive) {
      &:hover ul {
        display: block;
        animation: up 0.3s;
        li a {
          position: relative;
          transition: all 0.2s ease-in-out 0s;
        }
      }
      padding-bottom: 0px;
    }
    .submenuActive {
      color: var(--text-color);
      background-color: var(--grey-9-a1);
      ul {
        display: block;
        li {
          width: 100%;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
    }
    .active {
      a {
        color: var(--grey-0);
      }
      background-image: linear-gradient(to right, var(--color-pink-old) 0, var(--color-orange-old) 100%);
      box-shadow: 0 0 0.75rem rgba($color:var(--color-pink-old), $alpha:0.3);
  
      &:hover {
        box-shadow: 0px 0px 8px var(--color-pink-old);
      }
    }
  }
  .collection-btn {
    text-align: center;
    font-size: 14px;
    position: relative;
    display: block;
    background-color: var(--color-blue);
    z-index: 0;
    color: var(--grey-0) !important;
    height: 32px;
    line-height: 32px;
    transition-duration: 1s;
    transition-property: color;
    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--color-orange-old);
      z-index: -1;
      content: "";
      transition-timing-function: ease-out;
      transition-duration: 0.5s;
      transition-property: transform;
      transform: scaleX(0);
      transform-origin: 0 100%;
    }
    &:hover:before {
      transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
      transform: scaleX(1);
    }
  }
  .card-info-social {
    line-height: 40px;
    text-align: center;
    margin: 6px 0 -6px;
    a {
      font-size: 1.5rem;
    }
  }

  .web-info-title {
    i {
      color: var(--color-red-old);
      animation: big 0.8s linear infinite;
    }
    .web-info {
      padding: 0.25rem;
      font-size: 0.875rem;
    }
  }
}
@keyframes big {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
@keyframes up {
  0% {
    opacity: 0;
    transform: translateY(-18px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>