<template>
  <div>
    <v-dialog v-model="searchFlag" max-width="600">
      <v-card class="search-wrapper" style="border-radius: 4px">
        <div class="mb-3">
          <span class="search-title">本地搜索</span>
          <!-- 关闭按钮 -->
          <i class="float-right iconfont icon-close" @click="searchFlag = false"/>
        </div>
        <div class="search-input-wrapper">
          <i>mdi-magnify</i>
          <input v-model="keywords" placeholder="输入文章标题或内容。。。" />
        </div>
        <!-- 搜索结果 -->
        <div class="search-result-wrapper">
          <hr class="divider" />
          <ul>
            <li
              class="search-result"
              v-for="item of articleList"
              :key="item.id"
            >
              <!-- 文章标题 -->
              <a @click="goTo(item.id)" v-html="item.articleTitle" />
              <!-- 文章内容 -->
              <p
                class="search-reslut-content text-justify"
                v-html="item.articleContent"
              />
            </li>
          </ul>
          <!-- 搜索结果不存在提示 -->
          <div
            v-show="flag && articleList.length == 0"
            style="font-size: 0.875rem"
          >
            找不到您查询的内容：{{ keywords }}
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      articleList: [],
      flag: false,
      timer: null,
    };
  },
  methods: {
    goTo(id) {
      this.$store.state.searchFlag = false;
      this.$router.push({
        path: "/articles/" + id,
      });
    },
    debounce: function (value) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.axios
            .get("http://localhost:3008/api/articles/search", {
              params: { keywords: value },
            })
            .then((data) => {
              this.articleList = data;
            });
          this.timer = null;
        }, 500);
      }
    },
  },
  computed: {
    searchFlag: {
      set(value) {
        this.$store.commit('switchSearch',value)
      },
      get() {
        return this.$store.state.searchFlag;
      },
    },
  },
  watch: {
    keywords: {
      handler(value) {
        this.debounce(value);
        this.$nextTick(() => {
          this.flag = value.trim() != "" ? true : false;
        });
      },
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  padding: 1.25rem;
  height: 100%;
  background: var(--grey-0);
}
.search-title {
  color: #49b1f5;
  font-size: 1.25rem;
  line-height: 1;
}
.search-input-wrapper {
  display: flex;
  padding: 5px;
  height: 35px;
  width: 100%;
  border: 2px solid #8e8cd8;
  border-radius: 2rem;
}
.search-input-wrapper input {
  width: 100%;
  margin-left: 5px;
  outline: none;
}
@media (min-width: 960px) {
  .search-result-wrapper {
    height: 450px;
    overflow: auto;
    padding-right: 5px;
  }
}

.divider {
  margin: 20px 0;
  border: 2px dashed #d2ebfd;
}
.search-reslut a {
  color: #555;
  font-weight: bold;
  border-bottom: 1px solid #999;
  text-decoration: none;
}
.search-reslut-content {
  color: #555;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
  padding: 5px 0;
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>