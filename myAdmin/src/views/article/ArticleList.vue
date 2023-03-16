<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 文章状态 -->
    <div class="article-status-menu">
      <span>状态</span>
      <span
        v-for="(item, index) in this.statusList"
        :key="index"
        @click="changeStatus(index)"
        :class="isActive(index)"
        >{{ item.title }}</span
      >
    </div>
    <!-- 表格操作 -->
    <div class="operation">
      
      <!-- 条件筛选 -->
      <div class="choice">
        <!-- 文章类型 -->
        <el-select
          v-model="type"
          placeholder="请选择文章类型"
          clearable
          @clear="clearType"
          size="small"
          style="margin-right: 1rem"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 分类 -->
        <el-select
          v-model="categoryId"
          clearable
          @clear="clearCategory"
          placeholder="请选择分类"
          filterable
          style="margin-right: 1rem"
          size="small"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <!-- 标签 -->
        <el-select
          clearable
          @clear="clearTag"
          size="small"
          v-model="tagId"
          filterable
          placeholder="请选择标签"
          style="margin-right: 1rem"
        >
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.tagName"
            :value="item.id"
          />
        </el-select>
        <!-- 文章名 -->
        <el-input
          clearable
          v-model="keywords"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="请输入文章名"
          style="width: 200px"
        />
      </div>
      <div class="control">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          :disabled="!this.keywords"
          @click="searchArticles"
        >
          搜索
        </el-button>
        <el-button
        v-if="this.statusList[this.activeStatus].isDelete === 0"
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="articleIdList.length == 0"
        @click="updateIsDelete = true"
        >批量删除</el-button
      >
      <el-button
        v-else
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="articleIdList.length == 0"
        @click="remove = true"
      >
        彻底删除
      </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="articleList" border @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <!-- 文章修改时间 -->
      <el-table-column
        prop="articleCover"
        label="文章封面"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            class="article-cover"
            :src="
              scope.row.articleCover
                ? scope.row.articleCover
                : 'https://static.talkxj.com/articles/c5cc2b2561bd0e3060a500198a4ad37d.png'
            "
          />
          <i
            v-if="scope.row.status == 1"
            class="iconfont el-icon-mygongkai article-status-icon"
          />
          <i
            v-if="scope.row.status == 2"
            class="iconfont el-icon-mymima article-status-icon"
          />
          <i
            v-if="scope.row.status == 3"
            class="iconfont el-icon-mycaogaoxiang article-status-icon"
          />
        </template>
      </el-table-column>
      <!-- 文章标题 -->
      <el-table-column prop="articleTitle" label="标题" align="center" />
      <!-- 文章分类 -->
      <el-table-column
        prop="categoryName"
        label="分类"
        width="110"
        align="center"
      />
      <!-- 文章标签 -->
      <el-table-column
        prop="tagDTOList"
        label="标签"
        width="85"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="item of scope.row.tagDTOList"
            :key="item.tagId"
            style="margin-right: 0.2rem; margin-top: 0.2rem"
            >{{ item.tagName }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 文章浏览量 -->
      <el-table-column
        prop="viewsCount"
        label="浏览量"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.viewsCount">
            {{ scope.row.viewsCount }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 文章点赞量 -->
      <el-table-column
        prop="likeCount"
        label="点赞量"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.likeCount">
            {{ scope.row.likeCount }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 文章类型 -->
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="articleType(scope.row.type).tagType">
            {{ articleType(scope.row.type).label }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 文章发表时间 -->
      <el-table-column
        prop="createTime"
        label="发表时间"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 5px" />
          {{ scope.row.createTime | date }}
        </template>
      </el-table-column>
      <!-- 文章置顶 -->
      <el-table-column prop="isTop" label="置顶" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isTop"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :disabled="scope.row.isDelete == 1"
            :active-value="1"
            :inactive-value="0"
            @change="changeTop(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editArticle(scope.row.id)"
            v-if="scope.row.isDelete == 0"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 10px"
            @confirm="updateArticleDelete(scope.row.id)"
            v-if="scope.row.isDelete == 0"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确定恢复吗？"
            v-if="scope.row.isDelete == 1"
            @confirm="updateArticleDelete(scope.row.id)"
          >
            <el-button size="mini" type="success" slot="reference">
              恢复
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            style="margin-left: 10px"
            v-if="scope.row.isDelete == 1"
            title="确定彻底删除吗？"
            @confirm="deleteArticles(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      layout="total, sizes, prev, pager, next , jumper"
      background
      :page-sizes="[10, 20]"
      :total="count"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="current"
      :page-size="size"
    />
    <!-- 批量逻辑删除对话框 -->
    <el-dialog :visible.sync="updateIsDelete" width="30%">
      <div class="dialog-title-container" slot="title">
        <i class="el-icon-warning" style="color: #ff9900" />提示
      </div>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="updateIsDelete = false">取 消</el-button>
        <el-button type="primary" @click="updateArticleDelete(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 批量彻底删除对话框 -->
    <el-dialog :visible.sync="remove" width="30%">
      <div class="dialog-title-container" slot="title">
        <i class="el-icon-warning" style="color: #ff9900" />提示
      </div>
      <div style="font-size: 1rem">是否彻底删除选中项？</div>
      <div slot="footer">
        <el-button @click="remove = false">取 消</el-button>
        <el-button type="primary" @click="deleteArticles(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created() {
    this.listArticles();
    this.listCategories();
    this.listTags();
  },
  data() {
    return {
      articleAll: [],
      updateIsDelete: false,
      remove: false,
      articleList: [],
      articleIdList: [],
      activeStatus: "all",
      statusList: {
        all: {
          isDelete: 0,
          status: null,
          title: "全部",
        },
        public: {
          isDelete: 0,
          status: 1,
          title: "公开",
        },
        secret: {
          isDelete: 0,
          status: 2,
          title: "私密",
        },
        draft: {
          isDelete: 0,
          status: 3,
          title: "草稿箱",
        },
        delete: {
          isDelete: 1,
          status: null,
          title: "回收站",
        },
      },
      current: 1,
      tagList: [],
      tagId: null,
      type: null,
      size: 10,
      typeList: [
        {
          value: 1,
          label: "原创",
          tagType: "danger",
        },
        {
          value: 2,
          label: "转载",
          tagType: "success",
        },
        {
          value: 3,
          label: "翻译",
          tagType: "primary",
        },
      ],
      categoryList: [],
      categoryId: null,
      keywords: null,
      count: 0,
    };
  },
  methods: {
    currentChange(value) {
      this.current = value;
      this.articleList = this.articleAll.slice(
        (this.current - 1) * this.size,
        this.current * this.size
      );
    },
    sizeChange(value) {
      this.size = value;
      this.articleList = this.articleAll.slice(
        (this.current - 1) * this.size,
        this.current * this.size
      );
    },
    selectionChange(articleList) {
      this.articleIdList = [];
      articleList.forEach((item) => {
        this.articleIdList.push(item.id);
      });
    },
    deleteArticles(id) {
      let data = {};
      data.idList = id != null ? [id] : this.articleIdList;
      this.axios.delete("/api/admin/articles", { data }).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.data.message,
          });
          this.listArticles();
          this.remove = false;
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message,
          });
        }
      });
    },
    clearType() {
      this.type = null;
    },
    clearCategory() {
      this.categoryId = null;
    },
    clearTag() {
      this.tagId = null;
    },
    searchArticles() {
      this.current = 1;
      this.listArticles();
    },
    listTags() {
      this.axios.get("/api/tags").then(({ data }) => {
        this.tagList = data.data.recordList;
      });
    },
    listCategories() {
      this.axios.get("/api/categories").then(({ data }) => {
        this.categoryList = data.data.recordList;
      });
    },
    listArticles() {
      this.axios
        .get("/api/admin/articles", {
          params: {
            current: this.current,
            size: this.size,
            keywords: this.keywords,
            categoryId: this.categoryId,
            status: this.statusList[this.activeStatus].status,
            tagId: this.tagId,
            type: this.type,
            isDelete: this.statusList[this.activeStatus].isDelete,
          },
        })
        .then(({ data }) => {
          this.articleAll = data.data;
          this.articleList = this.articleAll.slice(
            (this.current - 1) * this.size,
            this.current * this.size
          );
          this.count = this.articleAll.length;
        });
    },
    editArticle(id) {
      this.$router.push({ path: "/articles/" + id });
    },
    updateArticleDelete(id) {
      let param = {};
      param.idList = id != null ? [id] : this.articleIdList;
      param.isDelete =
        this.statusList[this.activeStatus].isDelete === 0 ? 1 : 0;
      this.axios.put("/api/admin/articles", param).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.data.message,
          });
          this.updateIsDelete = false;
          this.listArticles();
        } else {
          this.$notify.error({
            title: "失败",
            message: data.data.message,
          });
        }
      });
    },

    changeStatus(status) {
      this.activeStatus = status;
    },
    changeTop(article) {
      this.axios
        .put("/api/admin/articles/top", {
          id: article.id,
          isTop: article.isTop,
        })
        .then(({ data }) => {
          if (data.flag) {
            this.$notify.success({
              title: "成功",
              message: data.data.message,
              duration: 600,
            });
          } else {
            this.$notify.error({
              title: "失败",
              message: data.message,
            });
          }
        });
    },
  },
  computed: {
    articleType() {
      return (type) => {
        let findtype = this.typeList.find((item) => {
          return item.value === type;
        });
        return findtype;
      };
    },
    isActive() {
      return (status) => {
        return this.activeStatus == status ? "active-status" : "status";
      };
    },
    dataChange() {
      const { activeStatus, categoryId, tagId, type } = this;
      return {
        activeStatus,
        categoryId,
        tagId,
        type,
      };
    },
  },
  watch: {
    dataChange: {
      handler() {
        console.log(1);
        this.current = 1;
        this.listArticles();
      },
      deep: true,
    },
  },
};
</script>
<style>
*::-webkit-scrollbar {
  width: 0.5rem;
  height: 6px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: rgba(144, 147, 153, 0.3);
}
</style>
<style scoped>
.article-status-menu {
  font-size: 14px;
  margin-top: 40px;
  color: #999;
}
.article-status-menu span {
  margin-right: 24px;
}
.active-status {
  cursor: pointer;
  color: #333;
  font-weight: bold;
}
.status {
  cursor: pointer;
}
.operation {
  margin-top: 1.5rem;
}
.operation .control{
  display: flex;
  margin: 10px 0;
}
.article-cover {
  position: relative;
  width: 100%;
  height: 90px;
  border-radius: 4px;
}
.article-cover::after {
  content: "";
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.article-status-icon {
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  right: 1rem;
  bottom: 1.4rem;
}
@media (max-width: 759px) {
  .article-status-menu span {
    margin-right: 16px;
  }
  ::v-deep .choice .el-select,.el-input{
    margin-bottom: 10px;
  }
  .operation .control{
    margin-top:0px
  }
  ::v-deep .el-pagination__jump{
    display: none !important;
  }
}
</style>