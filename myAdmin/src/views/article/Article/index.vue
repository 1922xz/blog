<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <articleContent ref="content" />
    <articleDialog ref="dialog" @cancelAutoSave="cancelAutoSave" />
  </el-card>
</template>

<script>
import articleContent from "./content.vue";
import articleDialog from "./dialog.vue";
export default {
  components: {
    articleContent,
    articleDialog,
  },
  data() {
    return {
      autoSave: true,
    };
  },
  methods: {
    cancelAutoSave() {
      this.autoSave = false;
    },
    autoSaveArticle() {
      var art1 = this.$refs.content.article;
      var art2 = this.$refs.dialog.article;
      let article = { ...art1, ...art2 };
      if (this.autoSave) {
        if (article.id) {
          this.$refs.dialog.addOrUpArt('自动保存成功');
        } else {
          sessionStorage.setItem("article", JSON.stringify(article));
        }
      }
    },
  },
  mounted() {
    const articleId = this.$route.path.split("/")[2];
    let article = null;
    if (articleId) {
      this.axios.get("/api/admin/articles/" + articleId).then(({ data }) => {
        article = data.data;
        this.$refs.content.article = article;
        this.$refs.dialog.article = article;
      });
    } else {
      article = JSON.parse(sessionStorage.getItem("article"));
      if (article) {
        this.$refs.content.article = article;
        this.$refs.dialog.article = article;
      }
    }
  },
  beforeDestroy() {
    if (this.autoSave) {
      this.autoSaveArticle();
    }
  },
};
</script>
<style scoped>
</style>