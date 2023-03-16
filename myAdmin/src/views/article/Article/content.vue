<template>
  <el-form ref="artContentForm" :model="article" :rules="rules">
    <el-form-item>
      <div class="article-title-container">
        <el-input
          prop="articleTitle"
          v-model="article.articleTitle"
          placeholder="请输入文章标题"
          size="medium"
          clearable
        />
        <el-button
          type="danger"
          size=""
          @click="openDialog"
          style="margin-left: 10px"
          >发布文章</el-button
        >
      </div>
    </el-form-item>
    <el-form-item>
      <mavon-editor
        :html="false"
        prop="articleContent"
        v-model="article.articleContent"
        style="height: calc(100vh - 260px)"
        ref="md"
        :ishljs="true"
        @imgAdd="$imgAdd"
      />
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        id: null,
        articleTitle: "",
        articleContent: "",
      },
      rules: {
        articleTitle: [{ required: true, message: "标题不能为空" }],
        articleContent: [{ required: true, message: "内容不能为空" }],
      },
    };
  },
  methods: {
    async $imgAdd(pos, $file) {
      const imgurl = await this.$store.dispatch("uploadImg", $file);
      this.$refs.md.$img2Url(pos, imgurl);
    },
    openDialog() {
      this.$refs["artContentForm"].validate((valid) => {
        if (valid) {
          this.$bus.$emit("openDialog", this.article);
        }
      });
    },
  },
  mounted() {},
};

</script>
<style scoped >

::v-deep .el-form-item__content {
  z-index: 0;
}
.article-title-container {
  display: flex;
  align-items: center;
  margin-top: 2.25rem;
  width: 100%;
}
</style>
