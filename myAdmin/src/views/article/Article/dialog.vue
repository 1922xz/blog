<template>
  <el-dialog :visible.sync="show" top="3vh">
    <div class="dialog-title-container" slot="title">发布文章</div>
    <el-form label-width="80px" size="medium" :rules="rules" ref="artAttrForm">
      <el-form-item label="文章分类" prop="categoryName">
        <el-tag
          type="success"
          closable
          @close="removeCategory"
          v-show="article.categoryName"
          style="margin: 0 1rem 0 0"
        >
          {{ article.categoryName }}
        </el-tag>
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
            ><template slot-scope="{ item }">
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
        <el-popover
          placement="bottom-start"
          width="460"
          trigger="click"
          v-if="article.tagNameList && article.tagNameList.length < 3"
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
      <el-form-item
        label="原文地址"
        v-if="article.type != 1"
        prop="originalUrl"
      >
        <el-input v-model="article.originalUrl" placeholder="请填写原文链接" />
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
      <el-button @click="show = false">取消</el-button>
      <el-button type="danger" @click="saveOrUpdateArticle">发表</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addArticle} from '@/api/article'
export default {
  data() {
    return {
      rules: {
        categoryName: [{ required: true, message: "分类不能为空" }],
        tagNameList: [{ required: true, message: "标签不能为空" }],
        articleCover: [{ required: true, message: "封面不能为空" }],
        originalUrl: [{ required: true, message: "封面不能为空" }],
      },
      show: false,
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
      categoryList: [],
      tagList: [],
      tagName: "",
    };
  },
  methods: {
    saveOrUpdateArticle() {
      // console.log(123142);
      this.addOrUpArt();
      this.$emit("cancelAutoSave");
      this.$refs["artAttrForm"].validate((valid) => {
        console.log("sss");
        if (valid) {
          console.log("验证成功");
        }
      });
    },
    addOrUpArt(successmsg, errormsg) {
      addArticle(this.article).then(( data) => {
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
        this.show = false;
      });
    },
    async upqiniu(req) {
      const imgurl = await this.$store.dispatch("uploadImg", req.file);
      this.article.articleCover = imgurl;
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
    listTags() {
      this.axios.get("http://localhost:3008/api/tags").then(({ data }) => {
        // console.log(data.data.recordList, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        this.tagList = data.data.recordList;
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
    removeTag(item) {
      const index = this.article.tagNameList.indexOf(item);
      this.article.tagNameList.splice(index, 1);
    },
    removeCategory() {
      this.article.categoryName = null;
    },
    saveCategory() {
      const value = this.categoryName.trim();
      value && this.addCategory({ categoryName: value });
      this.categoryName = "";
    },
    addCategory(item) {
      this.article.categoryName = item.categoryName;
      console.log(1);
    },
    listCategories() {
      this.axios.get("/api/categories").then(({ data }) => {
        this.categoryList = data.data.recordList;
      });
    },
    searchCategories(keywords, cb) {
      this.axios
        .get("/api/admin/categories/search", { params: { keywords: keywords } })
        .then(({ data }) => {
          cb(data.data);
        });
    },
  },
  mounted() {
    this.$bus.$on("openDialog", (data) => {
      this.show = true;
      this.article.articleTitle = data.articleTitle;
      this.article.articleContent = data.articleContent;
    });
  },
  created() {
    this.listCategories();
    this.listTags();
  },
  beforeDestroy() {
    this.$bus.$off("openDialog");
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
@media (min-width: 760px) {
  ::v-deep .el-dialog {
    width: 40%;
  }
}
@media (max-width: 759px) {
  ::v-deep .el-dialog {
    width: 90%;
  }
  ::v-deep .el-upload-dragger {
    width: 100%;
    height: 100%;
    padding: 0 20px;
  }
  ::v-deep.el-upload-dragger .el-icon-upload {
    margin-top: 15px;
  }
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