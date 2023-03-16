<template>
  <div>
    <banner title="关于我" :cover="cover"/>
    <!-- 关于我内容 -->
    <v-card class="blog-container">
      <!-- 博主头像 -->
      <div class="my-wrapper">
        <v-avatar size="110">
          <img class="author-avatar" :src="avatar" />
        </v-avatar>
      </div>
      <!-- 介绍 -->
      <div
        ref="about"
        class="about-content markdown-body"
        v-html="aboutContent"
      />
    </v-card>
  </div>
</template>

<script>
import { markdownToHtml } from "@/utils/markdown.js";
import banner from "@/components/content/banner";
// import {mapGetters} from 'vuex'
export default {
  components: {banner},
  mounted() {
    this.getAboutContent();
    this.getCover()
  },
  data() {
    return {
      cover:"",
      aboutContent: "",
      clipboard: null,
      imgList: [],
    };
  },
  methods: {
    getAboutContent() {
      this.axios.get("#").then((res) => {
        this.aboutContent = markdownToHtml(res);
      });
    },
    getCover() {
      this.cover=this.$store.getters.getCover('about')
    },
  },
  computed: {
    avatar() {
      return this.$store.state.blogInfo.websiteConfig.websiteAvatar;
    },
  },
};
</script>
<style scoped lang="scss">
.my-wrapper {
  text-align: center;
  .author-avatar {
    transition: all 0.5s;
    &:hover {
      transform: rotate(360deg);
    }
  }
}
.about-content {
  word-break: break-word;
  line-height: 1.8;
}
</style>