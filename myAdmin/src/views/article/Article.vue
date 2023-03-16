<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <el-form ref="artContentForm" :model="article">
      <el-form-item>
        <el-input
          v-model="article.articleTitle"
          placeholder="输入文章标题"
          size="medium"
          clearable
        />
        <div class="article-title-container">
          <el-button
            type="danger"
            size="medium"
            class="save-btn"
            v-if="article.id == null || article.status == 3"
            @click="saveArticleDraft"
            >保存草稿</el-button
          >
          <el-button
            type="danger"
            size="medium"
            @click="openModel"
            style="margin-left: 10px"
            >发布文章</el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <!-- <mavon-editor
        v-model="article.articleContent"
          style="height: calc(100vh - 260px)"
          ref="md"
          @imgAdd="$imgAdd"
        /> -->
      </el-form-item>
    </el-form>

    <!-- 添加文章对话框 -->
    <el-dialog :visible.sync="addOrEdit" width="40%" top="3vh">
      <div class="dialog-title-container" slot="title">发布文章</div>
      <!-- 文章数据 -->
      <el-form
        :model="article"
        label-width="80px"
        size="medium"
        ref="artAttrForm"
        :rules="rules"
      >
        <!-- 文章分类 -->
        <el-form-item label="文章分类" prop="categoryName">
          <el-tag
            v-show="article.categoryName"
            style="margin: 0 1rem 0 0"
            type="success"
            closable
            @close="removeCategory"
            >{{ article.categoryName }}</el-tag
          >
          <!-- 分类选项 -->
          <el-popover
            placement="bottom-start"
            width="420"
            trigger="click"
            v-if="!article.categoryName"
          >
            <div class="popover-title">分类</div>
            <!-- 搜索框 -->
            <el-autocomplete
              style="width: 100%"
              :fetch-suggestions="searchCategories"
              :trigger-on-focus="false"
              v-model="categoryName"
              placeholder="请输入分类名搜索，enter可添加自定义分类"
              @keyup.enter.native="saveCategory"
              @select="addCategory"
              :validate-event="false"
            >
              <template slot-scope="{ item }">
                <div>{{ item.categoryName }}</div>
              </template>
            </el-autocomplete>
            <div class="popover-container">
              <div
                v-for="item of categoryList"
                :key="item.id"
                class="category-item"
                @click="addCategory(item)"
              >
                {{ item.categoryName }}
              </div>
            </div>
            <el-button type="success" plain slot="reference" size="small">
              添加分类
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="文章标签" prop="tagNameList">
          <el-tag
            v-for="(item, index) of article.tagNameList"
            :key="index"
            style="margin: 0 1rem 0 0"
            size="normal"
            effect="dark"
            closable
            @close="removeTag(item)"
            >{{ item }}</el-tag
          >
          <!-- 标签选择 -->
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            v-if="article.tagNameList.length < 3"
          >
            <div class="popover-title">标签</div>
            <el-autocomplete
              v-model="tagName"
              :fetch-suggestions="searchTags"
              style="width: 100%"
              placeholder="请输入标签名搜索，enter可添加自定义标签"
              :trigger-on-focus="false"
              @keyup.enter.native="saveTag"
              @select="addTag"
              :validate-event="false"
            >
              <template slot-scope="{ item }">
                <div>{{ item.tagName }}</div>
              </template></el-autocomplete
            >
            <div class="popover-container">
              <div style="margin-bottom: 1rem">添加标签</div>
              <el-tag
                v-for="(item, index) of tagList"
                :key="index"
                :class="tagClass(item)"
                @click="addTag(item)"
              >
                {{ item.tagName }}
              </el-tag>
            </div>
            <el-button type="primary" plain slot="reference" size="small">
              添加标签
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="article.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeList"
              :key="item.type"
              :label="item.desc"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <!-- 文章类型 -->
        <el-form-item
          label="原文地址"
          v-if="article.type != 1"
          prop="originalUrl"
        >
          <el-input
            v-model="article.originalUrl"
            placeholder="请填写原文链接"
          />
        </el-form-item>
        <el-form-item label="上传封面" prop="articleCover">
          <el-upload
            drag
            class="upload-cover"
            action="https://up.qiniup.com"
            :http-request="upqiniu"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-upload" v-if="article.articleCover == ''" />
            <div class="el-upload__text" v-if="article.articleCover == ''">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <img
              v-else
              :src="article.articleCover"
              width="360px"
              height="180px"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch
            v-model="article.isTop"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
          />
        </el-form-item>
        <el-form-item label="发布形式">
          <el-radio-group v-model="article.status">
            <el-radio :label="1"> 公开 </el-radio>
            <el-radio :label="2"> 私密 </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取消</el-button>
        <el-button type="danger" @click="saveOrUpdateArticle">发表</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created() {
    const articleId = this.$route.path.split("/")[2];
    if (articleId) {
      this.axios.get("/api/admin/articles/" + articleId).then(({ data }) => {
        this.article = data.data;
      });
    } else {
      const article = sessionStorage.getItem("article");
      if (article) {
        this.article = JSON.parse(article);
      }
    }
  },
  destroyed() {
    // 文章自动保存
    this.autoSave && this.autoSaveArticle();
  },
  data() {
    return {
      rules: {
        articleTitle: [{ required: true, message: "标题不能为空" }],
        articleContent: [{ required: true, message: "内容不能为空" }],
        categoryName: [{ required: true, message: "分类不能为空" }],
        tagNameList: [{ required: true, message: "标签不能为空" }],
        articleCover: [{ required: true, message: "封面不能为空" }],
        originalUrl: [{ required: true, message: "封面不能为空" }],
      },
      categoryList: [],
      tagList: [],
      article: {
        id: null,
        articleTitle: "",
        articleContent: "",
        articleCover: "",
        categoryName: null,
        tagNameList: [],
        originalUrl: "",
        isTop: 0,
        type: 1,
        status: 1,
      },
      addOrEdit: false,
      tagName: "",
      categoryName: "",
      typeList: [
        {
          type: 1,
          desc: "原创",
        },
        {
          type: 2,
          desc: "转载",
        },
        {
          type: 3,
          desc: "翻译",
        },
      ],
      autoSave: true,
    };
  },
  methods: {
    uploadimg(file) {
      let filetype = file.type === "image/png" ? "png" : "jpg";
      // 重命名要上传的文件
      const keyname =
        "dfairy" +
        Date.parse(new Date()) +
        Math.floor(Math.random() * 100) +
        "." +
        filetype;
      var formdata = new FormData();
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      var imgurl = this.axios.get("/api/admin/articles/images").then((res) => {
        formdata.append("key", keyname);
        formdata.append("file", file);
        formdata.append("token", res.data.upToken);
        return new Promise((resolve) => {
          this.axios
            .post("http://up.qiniup.com", formdata, config)
            .then((resp) => {
              console.log('图片返回信息',resp);
              const img =
                "http://rqxhdheu5.hd-bkt.clouddn.com" + resp.data.key;
              resolve(img);
            });
        });
      });
      return imgurl;
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      const imgurl = await this.uploadimg($file);
      this.$refs.md.$img2Url(pos, imgurl);
    },
    searchTags(keywords, cb) {
      this.axios
        .get("/api/admin/tags/search", {
          params: {
            keywords: keywords,
          },
        })
        .then(({ data }) => {
          cb(data.data);
        });
    },
    searchCategories(keywords, cb) {
      this.axios
        .get("/api/admin/categories/search", { params: { keywords: keywords } })
        .then(({ data }) => {
          cb(data.data);
        });
    },
    addTag(item) {
      if (this.article.tagNameList.indexOf(item.tagName) == -1) {
        this.article.tagNameList.push(item.tagName);
      }
    },
    saveTag() {
      if (this.tagName) {
        const value = this.tagName.trim();
        value && this.addTag({ tagName: value });
        this.tagName = "";
      }
    },
    addCategory(item) {
      this.article.categoryName = item.categoryName;
    },
    saveCategory() {
      const value = this.categoryName.trim();
      value && this.addCategory({ categoryName: value });
      this.categoryName = "";
    },
    removeCategory() {
      this.article.categoryName = null;
    },
    removeTag(item) {
      const index = this.article.tagNameList.indexOf(item);
      this.article.tagNameList.splice(index, 1);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async upqiniu(req) {
      const imgurl = await this.uploadimg(req.file);
      this.article.articleCover = imgurl;
    },

    listCategories() {
      this.axios.get("/api/categories").then(({ data }) => {
        this.categoryList = data.data.recordList;
      });
    },
    listTags() {
      this.axios.get("/api/tags").then(({ data }) => {
        this.tagList = data.data.recordList;
      });
    },
    addOrUpArt(successmsg, errormsg) {
      this.axios.post("/api/admin/articles", this.article).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: successmsg || data.message,
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: errormsg || data.message,
          });
        }
        this.addOrEdit = false;
      });
    },
    saveArticleDraft() {
      this.$refs["artContentForm"].validate((valid) => {
        if (valid) {
          this.article.status = 3;
          this.addOrUpArt("保存草稿成功", "保存草稿失败");
          this.autoSave = false;
        } else {
          return false;
        }
      });
    },
    openModel() {
      // console.log(this.article.articleContent);
      this.$refs["artContentForm"].validate((valid) => {
        if (valid) {
          this.listCategories();
          this.listTags();
          this.addOrEdit = true;
        }
      });
    },
    saveOrUpdateArticle() {
      this.$refs["artAttrForm"].validate((valid) => {
        if (valid) {
          this.addOrUpArt();
          this.autoSave = false;
        }
      });
    },
    autoSaveArticle() {
      if (
        this.article.articleTitle.trim() &
        this.article.articleContent.trim() &
        this.article.id
      ) {
        this.addOrUpArt("自动保存成功", "自动保存失败");
      }

      !this.article.id &
        sessionStorage.setItem("article", JSON.stringify(this.article));
    },
  },
  computed: {
    tagClass() {
      return (item) => {
        const index = this.article.tagNameList.indexOf(item.tagName);
        return index != -1 ? "tag-item-select" : "tag-item";
      };
    },
  },
};
</script>
<style scoped>
.article-title-container {
  display: flex;
  align-items: center;
  margin-top: 2.25rem;
  width: 100%;
}
.save-btn {
  margin-left: 0.75rem;
  background: #fff;
  color: #f56c6c;
}
.popover-title {
  margin-bottom: 1rem;
  text-align: center;
}
.popover-container {
  margin-top: 1rem;
  height: 260px;
  overflow-y: auto;
}
.category-item {
  cursor: pointer;
  padding: 0.6rem 0.5rem;
}
.category-item:hover {
  background-color: #f0f9eb;
  color: #67c23a;
}
.tag-item,
.tag-item-select {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.tag-item-select {
  cursor: not-allowed;
  color: #ccccd8;
}
.tag-item {
  cursor: pointer;
}
</style>