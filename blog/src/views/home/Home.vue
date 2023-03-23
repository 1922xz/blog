<template>
  <div style="width: 100%">
    <!-- 说说轮播 -->
    <div class="banner-center">
      <!--联系方式 -->
      <h1 class="animated zoomIn blog-title">小白兔</h1>
      <!-- 一言 -->
      <div class="blog-intro">
        {{ obj.output }}
        <span class="typed-cursor">|</span>
      </div>
      <!-- 联系方式 -->
      <div class="blog-contact">
        <a href="" class="mr-5 iconfont icon-qq" />
        <a href="" class="mr-5 iconfont icon-github" />
        <a href="" class="iconfont icon-gitee" />
      </div>
    </div>
    <!-- <v-card class="animated zoomIn"></v-card> -->
    <h2 class="topLine">置顶文章</h2>
    <v-card
      ref="articleCard"
      class="animated zoomIn article-card"
      v-for="(item, index) of this.articleList"
      :key="item.id"
    >
      <!-- 文章封面图 -->
      <div :class="isRight(index)" class="article-cover">
        <router-link :to="'articles/' + item.id">
          <v-img
            class="on-hover"
            width="100%"
            height="100%"
            :src="item.articleCover"
          />
        </router-link>
      </div>
      <!-- 文章信息 -->
      <div class="article-wrapper">
        <div class="article-info">
          <!-- 是否置顶 -->
          <span v-if="item.isTop === 1" style="color: #ff7242">
            <i color="#ff7242" class="iconfont icon-zhiding"/>置顶
          </span>
          <span>
            <v-icon size="14">mdi-calendar-month-outline</v-icon
            >{{ item.createTime | date }}
          </span>
          <span v-if="item.categoryName">
            <v-icon size="14" class="inbox">mdi-inbox-full</v-icon>
            {{ item.categoryName }}
          </span>
        </div>
        <h3 style="line-height: 1.4">
          <router-link :to="'articles/' + item.id">
            {{ item.articleTitle }}
          </router-link>
        </h3>

        <!-- 文章内容 -->
        <div class="article-content">
          {{ item.articleContent }}
        </div>
        <div class="tag">
          <!-- 文章标签 -->
          <router-link
            to="/"
            class="mr-1"
            v-for="tag of item.tagDTOList"
            :key="tag.id"
          >
            <v-icon size="14">mdi-tag-multiple</v-icon>{{ tag.tagName }}
          </router-link>
        </div>
        <a href="#" class="more"> more... </a>
      </div>
    </v-card>
    <v-pagination
      style="margin-top: 1rem"
      v-model="current"
      @input="getArticleList"
      :circle="false"
      :length="paginationLength"
      :total-visible="5"
    />
  </div>
</template>
<script>
// https://gitee.com/redqueen/easy-typer-js
import EasyTyper from "easy-typer-js";
import { getArticles } from "@/api/article";
import { deleteMdTag } from "@/utils/markdown";
import { mapGetters } from "vuex";
export default {
  name: "home",
  created() {
    this.getArticleList();
    this.init();
  },
  data() {
    return {
      obj: {
        output: "",
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: "rollback",
        backSpeed: 40,
        sentencePause: true,
      },
      pagination: "",
      articleList: [],
      current: 1,
      length: 6,
    };
  },
  methods: {
    init() {
      document.title = this.blogInfo.websiteName;
      document.title = "title";
      // 一言Api进行打字机循环输出效果
      fetch("https://v1.hitokoto.cn?c=i")
        .then((res) => {
          return res.json();
        })
        .then(({ hitokoto }) => {
          this.initTyped(hitokoto);
        });
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj;
      new EasyTyper(obj, input, fn, hooks);
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
    ...mapGetters(["blogInfo", "paginationLength"]),
  },
};
</script>
<style>
.v-pagination__navigation,
.v-pagination__item {
  box-shadow: none;
  color: var(--grey-0);
  transition-duration: 0s;
}
.v-pagination__navigation--disabled {
  cursor: help;
}
.v-application .primary {
  color: var(--grey-0) !important;
  background-image: linear-gradient(to right, pink 0, orange 100%) !important;
  box-shadow: 0 0 0.75rem pink !important;
}
</style>
<style scoped lang="scss">
.topLine {
  width: 100%;
  display: table;
  color: #ccc;
  font-weight: 700;
  height: 20px;
  text-align: center;
  font-size: 20px;
  margin: 20px 0;
  white-space: nowrap;
  user-select: none;
  &::before,
  &::after {
    position: relative;
    width: 50%;
    display: table-cell;
    background-image: url("/static/img/divideLine.png");
    background-repeat: no-repeat;
    content: "";
  }
  &::before {
    background-position: right 10px top 50%;
  }
  &::after {
    background-position: left 10px top 50%;
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
    // max-width: 1200px;

    padding: 0 5px;
  }
  .article-card {
    .article-cover,
    .article-wrapper {
      flex: 4;
    }
    display: flex;
    height: 280px;
    width: 100%;
    margin-top: 20px;
  }
  .article-card:hover .on-hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
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
    // font-size: 1.5rem;
    // transition: all 0.3s;
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
  .article-card {
    margin-top: 1rem;
  }
  .article-cover {
    flex: 5;
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

.home-container-bg {
  position: relative;
  // z-index: 0;
  margin: 45vh auto 0px auto;
  .home-container {
    background: linear-gradient(to top, var(--grey-2) 0, #fdfdfd 20%) no-repeat bottom;
    .article-card {
      border-radius: 12px 8px 8px 12px;
      .left-radius {
        border-radius: 8px 0 0 8px;
        order: 0;
      }
      .right-radius {
        border-radius: 0 8px 8px 0;
        order: 1;
                &:hover{
          transform: translateX(6px) translateY(6px);
        }
      }
      .left-radius + .article-wrapper {
        .article-info {
          text-align: right;
        }
        .tag {
          left: 4px;
          bottom: 2px;
        }
        a.more{
           right: 0;
           border-radius: 8px 0;
           background-image: linear-gradient(to right,var(--color-pink) 0,var(--color-orange) 100%);
                   &:hover{
          transform: translateX(6px) translateY(6px);
        }
        }
      }
      .right-radius + .article-wrapper {
        .article-info {
          text-align: left;
        }
        .tag {
          right: 4px;
          bottom: 2px;
        }
        a.more{
          left: 0;
           border-radius: 0rem 10px;
           background-image: linear-gradient(to right,var(--color-orange) 0,var(--color-pink) 100%);
                  &:hover{
          transform: translateX(-6px) translateY(6px);
        }
        }
      }
      .article-wrapper {
        transition: all 0.5s ease-in-out;
        position: relative;
        color: var(--grey-5);
        width: 100%;
        // background-color: #f00 !important;
        h3 {
          transition: all 0.5s ease-in-out;
          a {
            color: var(--primary-color);
          }
          text-overflow: ellipsis;
          margin-top: 100px;
        }
        .article-info {
          line-height: 1;
          margin: 0.375rem 0;
          span,
          span i {
            color: currentColor;
            font-size: 14px;
          }
        }
        .article-content {
          transition: all 0.5s ease-in-out;
          margin-top: 20px;
          opacity: 0;
          line-height: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .tag {
          transition: all 0.5s;
          position: absolute;
          a,
          a i {
            font-size: 14px;
            color: currentColor;
          }
        }
        a.more{
          transition: all 0.5s;
        position: absolute;
        bottom: 0;
        padding: .3rem 1rem;
        color: var(--grey-0);

         
      }
      }
      
      &:hover {
        .article-wrapper {
          flex: 5;
        }
        box-shadow: 0 0 2rem var(--box-bg-shadow);
        h3 {
          a {
            color: var(--color-blue);
          }
          margin-top: 20px;
        }
        .article-content {
          opacity: 1;
        }
      }
    }
  }
}
</style>