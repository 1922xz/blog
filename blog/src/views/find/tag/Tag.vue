<template>
  <div>
    <!-- banner -->
    <div class="banner-center">
      <h1>标签</h1>
    </div>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签 - {{ count }}</div>
      <div class="tag-cloud">
        <router-link
          :class="Math.random() * 10 > 8 ? 'fpink' : ''"
          :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
          v-for="item of tagList"
          :key="item.id"
          :to="'/tags/' + item.id"
        >
          {{ item.tagName }}</router-link
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import { getTags } from "@/api/article";
export default {
  name: "tag",
  created() {
    this.listTags();
  },
  data() {
    return {
      tagList: [],
      count: 0,
    };
  },
  methods: {
    listTags() {
      getTags().then((data) => {
        this.tagList = data.recordList;
        this.count = data.recordList.length;
      });
    },
  },

  computed: {},
};
</script>
<style scoped lang="scss">
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}
.tag-cloud {
  text-align: center;
  a {
     color: #72cecf;
    display: inline-block;
    text-decoration: none;
    padding: 0 8px;
    line-height: 2;
    transition: all 0.3s;
    &:hover {
      color: #03a9f4 !important;
      transform: scale(1.1);
    }
  }
  a.fpink {
    color: pink;
  }
}
</style>