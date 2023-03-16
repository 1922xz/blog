<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 表格操作 -->
    <div class="operation-container" style="flex-wrap:wrap">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openModel(null)"
      >
        新增
      </el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="this.categoryIdList.length == 0"
        @click="isDelete = true"
      >
        批量删除
      </el-button>
      <div style="margin-left: auto;margin-top: 10px;">
        <el-input
          prefix-icon="el-icon-search"
          size="small"
          placeholder="请输入分类名"
          style="width: 200px"
          v-model="keywords"
        />
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 1rem"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table border :data="categorylist" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <!-- 分类名 -->
      <el-table-column label="分类名" align="center" prop="categoryName" />
      <!-- 文章量 -->
      <el-table-column label="文章量" align="center" prop="articleCount" />
      <!-- 分类创建时间 -->
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 5px" />
          {{ scope.row.createTime | date }}
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openModel(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 1rem"
            @confirm="deleteCategory(scope.row.id)"
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
      background
      :current-page="current"
      @current-change="currentChange"
      @size-change="sizeChange"
      :total="count"
      :page-sizes="[10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
    />
    <!-- 批量删除对话框 -->
    <el-dialog :visible.sync="isDelete" width="30%">
      <div class="dialog-title-container" slot="title">
        <i class="el-icon-warning" style="color: #ff9900" />提示
      </div>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteCategory(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 增加编辑对话框 -->
    <el-dialog :visible.sync="addOrEdit" width="30%">
      <div class="dialog-title-container" slot="title" ref="categoryTitle" />
      <el-form label-width="80px" size="medium" :model="categoryForm">
        <el-form-item label="分类名">
          <el-input v-model="categoryForm.categoryName" style="width: 220px" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditCategory"> 确 定 </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      size: 10,
      count: 0,
      addOrEdit: false,
      categoryIdList: [],
      isDelete: false,
      keywords: "",
      categoryForm: {
        id: null,
        categoryName: "",
      },
      categorylist: [],
      listall: [],
      timer: null,
    };
  },
  methods: {
    sizeChange(size) {
      this.size = size;
      this.listCategories();
    },
    selectionChange(categorylist) {
      this.categoryIdList = [];
      categorylist.forEach((item) => {
        this.categoryIdList.push(item.id);
      });
    },
    debounce(value) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (value) {
          this.categorylist = this.listall.filter((e) => {
            return e.categoryName.indexOf(value) != -1;
          });
        } else {
          this.listCategories();
        }
      }, 600);
    },
    listCategories() {
      this.axios.get("/api/admin/categoryManage").then(({ data }) => {
        this.listall = data.data;
        this.categorylist = this.listall.slice(
          (this.current - 1) * this.size,
          this.current * this.size
        );
        this.count = this.listall.length;
      });
    },
    openModel(category) {
      if (category != null) {
        let data = JSON.parse(JSON.stringify(category));
        this.categoryForm = { id: data.id, categoryName: data.categoryName };
        this.$refs.categoryTitle.innerHTML = "修改分类";
      } else {
        this.categoryForm.id = null;
        this.categoryForm.categoryName = "";
        this.$refs.categoryTitle.innerHTML = "添加分类";
      }
      this.addOrEdit = true;
    },
    addOrEditCategory() {
      if (this.categoryForm.categoryName.trim() == "") {
        this.$message.error("分类名不能为空");
        return false;
      }
      this.axios
        .put("/api/admin/categoryManage", this.categoryForm)
        .then(({ data }) => {
          if (data.success) {
            this.$notify.success({
              title: "成功",
              message: data.message,
            });
            this.listCategories();
          } else {
            this.$notify.error({
              title: "失败",
              message: data.message,
            });
          }
          this.addOrEdit = false;
        });
    },
    currentChange(current) {
      this.current = current;
      this.categorylist = this.listall.slice(
        (this.current - 1) * this.size,
        this.current * this.size
      );
    },
    deleteCategory(id) {
      if (id) {
        this.categoryIdList.push(id);
      }
      this.axios
        .delete("api/admin/deleteCategory", {
          data: {
            id: this.categoryIdList,
          },
        })
        .then(({ data }) => {
          if (data.flag) {
            this.$notify.success({
              title: "成功",
              message: data.message,
            });
            this.listCategories();
          } else {
            this.$notify.error({
              title: "失败",
              message: data.message,
            });
          }
          this.isDelete = false;
        });
    },
  },
  mounted() {
    this.listCategories();
  },
  watch: {
    keywords: {
      handler(value) {
        this.debounce(value);
      },
    },
  },
};
</script>
<style scoped>
@media (max-width:759px) {
  ::v-deep .el-pagination__jump{
    display: none !important;
  }
    ::v-deep .el-dialog{
    width:90%
  }
}
@media (min-width:760px) {
  ::v-deep .el-dialog{
    width:30%
  }
}
</style>