<template>
  <div style="width: 100%">
    <div class="home-banner">
      <mySwiper :imglist="imglist" />
    </div>

    <!-- 主页文章 -->
    <div class="home-container-bg" ref="mainContainer">
      <wave />
      <v-row class="home-container">
        <v-col cols="8" offset-md="1" class="container">
          <keep-alive>
            <router-view :key="$route.fullPath" />
          </keep-alive>
        </v-col>
        <sidebar class="sidebar" />
      </v-row>
    </div>

    <Footer />
    <!-- 提示消息 -->
    <v-snackbar top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar>
  </div>
</template>
<script>
import Footer from "./Footer.vue";
import tocbot from "tocbot";
import wave from "@/components/wave.vue";
import sidebar from "./sliderBar.vue";
// https://gitee.com/redqueen/easy-typer-js

import { getArticles } from "@/api/article";
import { deleteMdTag } from "@/utils/markdown";
import mySwiper from "@/components/common/mySwiper";

export default {
  name: "home",
  components: {
    mySwiper,
    wave,
    Footer,
    sidebar,
  },
  created() {
    this.getArticleList();
    this.$bus.$on("initTocbot", this.initTocbot);
  },
  destroyed() {
    tocbot.destroy();
  },
  mounted() {
    document.addEventListener(
      "scroll",
      () => {
        // console.log(1);
        let homeContainer = document.querySelector(".container");
        let sidebar = document.querySelector(".sidebar");
        let l = homeContainer.getBoundingClientRect().top;
        // console.log(l);
        if (l <= 0) {
          sidebar.style.position = "fixed";
          sidebar.style.top = "0px";
          sidebar.style.right = "87px";
        } else {
          sidebar.style.position = "relative";
          sidebar.style.top = "0x";
          sidebar.style.right = "75px";
        }
      },
      true
    );
  },
  data() {
    return {
      pagination: "",
      imglist: [
        "https://tva3.sinaimg.cn/large/6833939bly1giclgi503lj20zk0m8hdt.jpg",
        "https://tva3.sinaimg.cn/large/6833939bly1gicli3sbvtj20zk0m8x6p.jpg",
        "https://tva3.sinaimg.cn/large/6833939bly1giclx29mstj20zk0m8hdt.jpg",
        "https://tva3.sinaimg.cn/large/6833939bly1giciszlczyj20zk0m816d.jpg",
        "https://tva3.sinaimg.cn/large/6833939bly1giciukx8a7j20zk0m8aio.jpg",
        "https://tva3.sinaimg.cn/large/6833939bly1giph4baakhj20zk0m8h5q.jpg",
      ],
      articleList: [],

      current: 1,
      length: 6,
    };
  },
  methods: {
    initTocbot() {
      //   alert("kaishichushihua");
      tocbot.init({
        tocSelector: "#toc", //要把目录添加元素位置，支持选择�?
        contentSelector: ".article-content", //获取html的元�?
        headingSelector: "h1,h2,h3", //要显示的id的目�?
        // hasInnerContainers: true,
        scrollSmooth: true,
        scrollSmoothDuration: 10,
        fixedSidebarOffset: "fixed",
        headingsOffset: 40,
        scrollSmoothOffset: -40,
        scrollContainer: "body",
        // includeHtml: false,
        // fixedSidebarOffset: 'auto',
        onClick: function (e) {
          console.log(e);
          e.preventDefault();

          // e.stopImmediatePropagation()
        },
      });
    },

    getArticleList(value) {
      if (value) this.current = value;
      getArticles({ current: this.current }).then((res) => {
        if (res.length) {
          res.forEach((item) => {
            item.articleContent = deleteMdTag(item.articleContent);
          });
          this.articleList = [];
          this.articleList.push(...res);
        }
      });
    },
  },
  computed: {
    isRight() {
      return function (index) {
        if (index % 2 == 0) {
          return "left-radius";
        }
        return "right-radius";
      };
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep ol {
  list-style: none;
}
::v-deep li.is-active-li a.is-active-link {
  border-left: 2px solid transparent;
}
@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }
  .blog-intro {
    font-size: 1.5rem;
  }
  .blog-contact {
    display: none;
  }
  .home-container {
    padding: 0 5px;
  }
  .on-hover {
    transition: all 0.6s;
  }
  .article-cover {
    overflow: hidden;
    height: 100%;
    width: 45%;
  }

  .article-wrapper {
    padding: 0 2.5rem;
    width: 55%;
  }
  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
}
@media (max-width: 759px) {
  .blog-title {
    font-size: 26px;
  }
  .blog-contact {
    font-size: 1.25rem;
    line-height: 2;
  }
  .home-container {
    width: 100%;
    // margin: calc(100vh - 66px) auto 0 auto;
  }
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }
  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }
  .article-wrapper {
    padding: 1.25rem 1.25rem 1.875rem;
  }
  .article-wrapper a {
    font-size: 1.25rem;
    transition: all 0.3s;
  }
}
.home-banner {
  position: relative;
}
.home-container-bg {
  margin: 45vh auto 0px;
  .home-container {
    background: linear-gradient(to top, var(--grey-2) 0, var(--grey-1) 20%) no-repeat bottom;
    .container {
      box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);
      background: linear-gradient(to top, var(--grey-0) 0, var(--grey-1) 20%) no-repeat bottom;
    }
  }
}

::v-deep .toc-list-item {
  line-height: 2;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toc-link {
  display: block;
  border-left: 3px solid transparent;
  padding-left: 6px;
  transition: all 0.2s ease-in-out;
}
.v-timeline {
  margin-left: -90%;
  padding-top: 24px;
  position: relative;
}
span.love {
  display: inline-block;
  color: var(--color-pink-old);
  font-size: 16px;
  animation: rotate 6s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>