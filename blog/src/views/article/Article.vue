<template>
  <div>
    <!-- 封面 -->
    <div class="banner-center">
      <h1>{{ this.article.articleTitle }}</h1>
      <div class="article-info">
        <div class="first-line">
          <span>
            <i class="iconfont icon-fabiao" />
            发表于{{ article.createTime | date }}
          </span>
          <span class="separator">|</span>
          <span>
            <i class="iconfont icon-gengxin" />
            更新于
            <template v-if="article.updateTime">
              {{ article.updateTime | date }}
            </template>
            <template v-else>
              {{ article.createTime | date }}
            </template>
          </span>
          <span class="separator">|</span>
          <span class="article-category">
            <i class="iconfont icon-fenlei" />
            <router-link :to="'/categories/' + article.categoryId">
              {{ article.categoryName }}
            </router-link>
          </span>
        </div>
        <div class="second-line">
          <!-- 字数统计 -->
          <span>
            <i class="iconfont icon-zishu" />
            字数统计: {{ this.wordNum }}
          </span>
          <span class="separator">|</span>
          <!-- 阅读时长 -->
          <span>
            <i class="iconfont icon-shijian" />
            阅读时长: {{ readTime }}
          </span>
          <span class="separator secondtothird">|</span>
        </div>
        <div class="third-line">
          <!-- 阅读量-->
          <span>
            <i class="iconfont icon-yueduliang" /> 阅读量:
            {{ article.viewsCount }}
          </span>
          <span class="separator">|</span>
          <!-- 评论量 -->
          <span>
            <i class="iconfont icon-pinglun" />评论量: {{ commentCount }}
          </span>
        </div>
      </div>
    </div>

    <!-- 内容 -->

    <v-row class="article-container">
      <!-- 主体内容 -->
      <v-col md="12" cols="12">
        <v-card class="article-wrapper">
          <article
            id="write"
            v-html="article.articleContent"
            ref="article"
            class="article-content markdown-body"
          />
          <!-- 版权声明 -->
          <div class="article-copyright">
            <!-- 作者 -->
            <div>
              <span>文章作者：</span>
              <router-link to="/">
                {{ blogInfo.websiteAuthor }}
              </router-link>
            </div>
            <!-- 链接 -->
            <div>
              <span>文章链接：</span>
              <a :href="articleHref" target="_blank">{{ articleHref }} </a>
            </div>
            <!-- 版权说明 -->
            <div>
              <span>版权声明：</span>本博客所有文章除特别声明外，均采用
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>
              许可协议。转载请注明文章出处。
            </div>
          </div>
          <!-- 转发 -->
          <div class="article-operation">
            <div class="tag-container">
              <router-link
                v-for="item of article.tagDTOList"
                :key="item.id"
                :to="'/tags/' + item.id"
              >
                {{ item.tagName }}
              </router-link>
            </div>
            <share style="margin-left: auto" :config="config" />
          </div>
          <!-- 点赞打赏等 -->
          <div class="article-reward">
            <!-- 点赞按钮 -->
            <a :class="isLike">
              <i class="iconfont icon-thumb" style="clolr:var(--grey-0)"></i>
              <span v-show="article.likeCount > 0">{{
                article.likeCount
              }}</span>
            </a>
            <a class="reward-btn" v-if="blogInfo.isReward == 1">
              <i class="iconfont icon-erweima" />打赏
              <div class="animated fadeInDown reward-main">
                <ul class="reward-all">
                  <li class="reward-item">
                    <img
                      class="reward-img"
                      :src="blogInfo.websiteConfig.weiXinQRCode"
                    />
                    <div class="reward-desc">微信</div>
                  </li>
                  <li class="reward-item">
                    <img
                      class="reward-img"
                      :src="blogInfo.websiteConfig.alipayQRCode"
                    />
                    <div class="reward-desc">支付宝</div>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <!-- 上下篇文章 -->
          <div class="pagination-post">
            <!-- 上一篇 -->
            <div
              v-if="article.lastArticle"
              :class="isFull(article.lastArticle.id)"
            >
              <router-link :to="'/articles/' + article.lastArticle.id">
                <img
                  class="post-cover"
                  :src="article.lastArticle.articleCover"
                />
                <div class="post-info">
                  <div class="label">上一篇</div>
                  <div class="post-title">
                    {{ article.lastArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
            <!-- 下一篇 -->
            <div
              v-if="article.nextArticle"
              :class="isFull(article.nextArticle.id)"
            >
              <router-link :to="'/articles/' + article.nextArticle.id">
                <img
                  class="post-cover"
                  :src="article.nextArticle.articleCover"
                />
                <div class="post-info" style="width: 100%">
                  <div class="label">下一篇</div>
                  <div class="post-title">
                    {{ article.nextArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div
            class="recommend-container"
            v-if="article.recommendArticleList.length"
          >
            <div class="recommend-title">
              <i class="iconfont icon-thumb"></i>&nbsp;相关推荐
            </div>
            <div class="recommend-list">
              <div
                class="recommend-item"
                v-for="item of article.recommendArticleList"
                :key="item.id"
              >
                <router-link :to="'/articles/' + item.id">
                  <img :src="item.articleCover" class="recommend-cover" />
                  <div class="recommend-info">
                    <div class="recommend-date">
                      <i class="iconfont icon-calender"
                        />
                      {{ item.createTime | date }}
                    </div>
                    <div>{{ item.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <hr />
          <comment :type="1" @getCommentCount="getCommentCount" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import "highlight.js/styles/github.css";
import Clipboard from "clipboard";
import { markdownToHtml, deleteHTMLTag } from "@/utils/markdown";
import comment from "@/components/comment/index.vue";
export default {
  components: { comment },
  created() {
    // alert('创造了')
    this.getArticle();
  },
  mounted() {
    // console.log(this.$refs.article);
  },
  data() {
    return {
      config: {
        sites: ["qzone", "wechat", "weibo", "qq"],
      },
      article: {
        recommendArticleList: [{}],
        articleContent: [],
        lastArticle: {
          id: "",
        },
        nextArticle: {
          id: "",
        },
      },
      wordNum: "",
      readTime: "",
      commentCount: 0,
      articleHref: window.location.href,
    };
  },
  methods: {
    getCommentCount() {},
    addCopy() {
      this.clipboard = new Clipboard(".copy-btn");
      this.clipboard.on("success", () => {
        this.$toast({ type: "success", message: "复制成功" });
      });
    },
    getWordNum() {
      this.wordNum = deleteHTMLTag(this.article.articleContent).length;
    },
    getReadTime() {
      this.readTime = Math.round(this.wordNum / 400) + "分钟";
    },
    initTocbot() {
      let nodes = this.$refs.article.children;
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          let reg = /^H[1-4]{1}$/;
          if (reg.exec(node.tagName)) {
            node.id = i;
          }
        }
      }
      this.$bus.$emit("initTocbot");
    },
    getArticle() {
      // alert('获取文章')
      getArticleById(this.$route.path).then((res) => {
        this.article = res;
        this.$bus.$emit("initNewArticle", this.article.newestArticleList);
        this.article.articleContent = markdownToHtml(res.articleContent);
        // console.log(this.article.articleContent);
        this.getWordNum();
        this.getReadTime();
        this.$nextTick(() => {
          // alert('更新目录')
          this.initTocbot();
          this.addCopy();
        });
      });
    },
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    isLike() {
      var articleLikeSet = this.$store.state.articleLikeSet;
      return articleLikeSet.indexOf(this.article.id) != -1
        ? "like-btn-active"
        : "like-btn";
    },
    isFull() {
      return (id) => {
        return id ? "full post" : "post";
      };
    },
  },
};
</script>

<style lang="scss">
.theme--light.v-application .hljs code {
  background-color: transparent;
}
.theme--light.v-application :not(pre) > code {
  border: 1px solid var(--grey-9-a1);
  color: var(--color-purple);
}
.is-active-link {
  border-left-color: var(--color-green);
  background: var(--color-green-light);
  color: var(--grey-0) !important;
}
blockquote {
  background-color: var(--grey-2);
  border-radius: 5px;
  border-left: 0.25rem solid var(--color-purple);
  color: #666;
  margin: 1.25rem 0;
  padding: 16px 1.25rem;
  p {
    font-size: 16px !important;
    margin: auto 0;
    height: 12px;
    line-height: 12px;
    margin-bottom: 0px !important;
  }
}
pre.hljs {
  background: var(--grey-2);
  color: var(--grey-7);
  padding: 8px 2px;
  border-radius: 5px;
  position: relative;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
    height: 7px;
  }
  ol {
    height: 100%;
    list-style: none;
    margin: 0;
    li {
      &:hover {
        background-color: var(--grey-3);
        .line-num::before {
          background-color: var(--grey-3);
        }
      }
      list-style: none;
      position: relative;
      padding: 2px 0;
      padding-left: 42px;
      .line-num {
        &::before {
          content: attr(data-num);
        }
        position: absolute;
        left: 0;
        color: #869194;
        top: 0;
        width: 42px;
        height: 100%;
        text-align: center;
      }
    }
  }
  b.name {
    &::before {
      content: " ";
      position: absolute;
      border-radius: 50%;
      background: #fc625d;
      width: 0.75rem;
      height: 0.75rem;
      left: -49px;
      top: 7px;
      box-shadow: 1.25rem 0 #fdbc40, 2.5rem 0 #35cd4b;
    }
    font-weight: 400;
    font-size: 15px;
    position: absolute;
    top: 2px;
    left: 64px;
    padding-left: 16px;
    z-index: 10;
    color: var(--grey-5);
    pointer-events: none;
  }
  div.operation {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 17px;

    .copy,
    .expand {
      color: var(--grey-5);
      display: inline-block;
      margin-right: 12px;
      margin-top: 4px;
      cursor: pointer;
    }
  }
}
@keyframes elastic {
  0% {
    transform: scale(0);
  }

  55% {
    transform: scale(1);
  }

  70% {
    transform: scale(0.98);
  }

  100% {
    transform: scale(1);
  }
}
pre.hljs.expandAll {
  animation: elastic 1s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  z-index: 9999;
  margin: 0;
  border-radius: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
.is-active-link {
  border-left-color: var(--color-green);
  background: var(--color-green-light);
  color: var(--grey-0) !important;
}
</style>
<style scoped lang="scss">
hr {
  position: relative;
  margin: 40px auto;
  border: 2px dashed #d2ebfd;
  width: calc(100% - 4px);
}
.article-info {
  font-size: 14px;
  line-height: 1.9;
  .article-category a {
    color: #fff;
  }
}
.article-container {
  .article-wrapper {
    .article-copyright {
      position: relative;
      margin-top: 40px;
      margin-bottom: 10px;
      font-size: 0.875rem;
      line-height: 2;
      padding: 0.625rem 1rem;
      border: 1px solid var(--grey-4);
      span {
        color: var(--color-blue);
        font-weight: bold;
      }
      a {
        text-decoration: underline;
        color: #99a9bf;
      }
      &:before {
        position: absolute;
        top: 0.7rem;
        right: 0.7rem;
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
        background: var(--color-blue);
        content: "";
      }
      &:after {
        position: absolute;
        top: 0.95rem;
        right: 0.95rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.5em;
        background: var(--grey-0);
        content: "";
      }
    }
    .article-operation {
      display: flex;
      align-items: center;
      .tag-container a {
        display: inline-block;
        margin: 0.5rem 0.5rem 0.5rem 0;
        padding: 0 0.75rem;
        width: fit-content;
        border: 1px solid var(--color-blue);
        border-radius: 1rem;
        color: var(--color-blue);
        font-size: 12px;
        line-height: 2;
      }
    }
    .article-reward {
      margin-top: 5rem;
      display: flex;
      justify-content: center; //横着中间
      align-items: center; //竖着中间
      .like-btn {
        display: inline-block;
        width: 100px;
        background: #969696;
        color: var(--grey-0);
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;
      }
      .like-btn-active {
        display: inline-block;
        width: 100px;
        background: #ec7259;
        color: var(--grey-0) !important;
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;
      }
      .reward-btn {
        position: relative;
        display: inline-block;
        width: 100px;
        background: var(--color-blue);
        margin: 0 1rem;
        color: var(--grey-0);
        text-align: center;
        line-height: 36px;
        font-size: 0.875rem;
        &:hover .reward-main {
          display: block;
        }
        .reward-main {
          display: none;
          position: absolute;
          bottom: 40px;
          left: 0;
          margin: 0;
          padding: 0 0 15px;
          width: 100%;
          .reward-all {
            margin: 0 0 0 -110px;
            padding: 20px 10px 8px;
            width: 320px;
            border-radius: 4px;
            background: #f5f5f5;
            &:before {
              position: absolute;
              bottom: -10px;
              left: 0;
              width: 100%;
              height: 20px;
              content: "";
            }
            &:after {
              content: "";
              position: absolute;
              right: 0;
              bottom: 2px;
              left: 0;
              margin: 0 auto;
              width: 0;
              height: 0;
              border-top: 13px solid #f5f5f5;
              border-right: 13px solid transparent;
              border-left: 13px solid transparent;
            }
            .reward-item {
              display: inline-block;
              padding: 0 8px;
              list-style-type: none;
              .reward-img {
                width: 130px;
                height: 130px;
                display: block;
              }
              .reward-desc {
                margin: -5px 0;
                color: #858585;
                text-align: center;
              }
            }
          }
        }
      }
    }
    .pagination-post {
      margin-top: 40px;
      width: 100%;
      background: #000;
      .full {
        width: 100%;
      }
      .post {
        &:hover .post-cover {
          opacity: 0.8;
          transform: scale(1.1);
        }
        a {
          position: relative;
          display: block;
          overflow: hidden;
          height: 150px;
          .post-info {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            padding: 20px 40px;
            line-height: 2;
            font-size: 14px;
            .label {
              font-size: 90%;
              color:currentColor;
            }
            .post-title {
              font-weight: 500;
              color: var(--text-color);
            }
          }
          .post-cover {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.4;
            transition: all 0.6s;
            object-fit: cover;
          }
        }
      }
    }
    .recommend-container {
      margin-top: 40px;
      .recommend-title {
        font-size: 20px;
        font-weight: bold;
        line-height: 2;
        margin-bottom: 5px;
      }
      .recommend-list {
        .recommend-item {
          &:hover .recommend-cover {
            opacity: 0.8;
            transform: scale(1.1);
          }
          .recommend-cover {
            width: 100%;
            height: 100%;
            opacity: 0.4;
            transition: all 0.6s;
            object-fit: cover;
          }
          .recommend-info {
            position: absolute;
            color: var(--text-color);
            i{color: var(--text-color);}
            font-size: 14px;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            padding: 0 20px;
            width: 100%;
            line-height: 2;
            .recommend-date {
              font-size: 90%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 760px) {
  .banner {
    color: var(--grey-4);
  }
  .article-container {
    animation: main 1s;
    max-width: 1200px;
    margin: 6px auto 40px auto;
    padding: 0 5px;
  }

  .article-wrapper {
    padding: 50px 40px;
  }
  .article-info {
    position: fixed;

    padding: 0 8%;
    width: 100%;
    text-align: center;
  }

  // .article-title {
  //   font-size: 35px;
  //   margin: 20px 0 8px;
  // }
  .pagination-post {
    display: flex;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(33.333% - 6px);
    height: 200px;
    background: #000;
    vertical-align: bottom;
  }
  .second-line,
  .third-line {
    display: inline;
  }
}
@media (max-width: 759px) {
  .secondtothird {
    display: none;
  }
  .banner {
    color: var(--grey-4) !important;
    height: 360px;
  }
  .article-info {
    font-size: 80% !important;
    line-height: 4;
    position: absolute;
    top: 12rem;
    padding: 0px 10px 0px 10px;
  }
  .separator:first-child {
    display: none;
  }
  .blog-container {
    margin: 322px 5px 0 5px;
  }
  .article-info-container {
    position: absolute;
    bottom: 1.3rem;
    padding: 0 5%;
    width: 100%;
    color: var(--grey-4);
    text-align: left;
  }
  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
  .post {
    width: 100%;
  }
  .pagination-post {
    display: block;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(100% - 4px);
    height: 150px;
    margin: 2px;
    background: #000;
    vertical-align: bottom;
  }
}
::v-deep table tbody tr td,
::v-deep table thead tr th {
  border: 0.0625rem solid #eff2f3;

  text-align: center;
  padding: 8px;
}
::v-deep table tbody tr td {
  font-size: 16px;
}
::v-deep table thead tr th {
  border-bottom: 0.1875rem solid #eff2f3;
  font-size: 17px;
  padding-bottom: 12px;
}
::v-deep table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0 0 8px 0;
  overflow: auto;
}
</style>

