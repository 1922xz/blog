<template>
  <el-card class="main-card">
    <!-- 标题 -->
    <div class="title">{{ this.$route.name }}</div>
    <div class="operation-container">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openModel(null)"
        >新增菜单</el-button
      >
      <!-- 数据筛选 -->
      <div style="margin-left: auto">
        <el-input
          v-model="keywords"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="请输入菜单名"
          style="width: 200px"
          @keyup.enter.native="listMenus"
        />
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 1rem"
          @click="listMenus"
          >搜索
        </el-button>
      </div>
    </div>
    <!-- 权限列表 -->
    <el-table
      :data="menuList"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- 菜单名称 -->
      <el-table-column prop="name" label="菜单名称" width="140" />
      <!-- 菜单icon -->
      <el-table-column prop="icon" align="center" label="图标" width="100">
        <template slot-scope="scope">
          <i :class="'iconfont ' + scope.row.icon"></i>
        </template>
      </el-table-column>
      <!-- 菜单排序 -->
      <el-table-column
        prop="orderNum"
        align="center"
        label="排序"
        width="100"
      />
      <!-- 访问路径 -->
      <el-table-column prop="path" label="访问路径" />
      <!-- 组件路径 -->
      <el-table-column prop="component" label="组件路径" />
      <!-- 是否隐藏 -->
      <el-table-column prop="isHidden" label="隐藏" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.isHidden }}
          <el-switch
            v-model="scope.row.isHidden"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :active-value="1"
            :inactive-value="0"
            @change="changeDisable(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 5px" />
          {{ scope.row.createTime | date }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="openModel(scope.row, 1)"
            v-if="scope.row.children"
          >
            <i class="el-icon-plus" /> 新增
          </el-button>
          <el-button type="text" size="mini" @click="openModel(scope.row, 2)">
            <i class="el-icon-edit" /> 修改
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 10px"
            @confirm="deleteMenu(scope.row.id)"
          >
            <el-button size="mini" type="text" slot="reference">
              <i class="el-icon-delete" /> 删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增模态框 -->
    <el-dialog :visible.sync="addMenu" width="30%" top="12vh">
      <div class="dialog-title-container" slot="title" ref="menuTitle" />
      <el-form
        label-width="80px"
        size="medium"
        :model="menuForm"
        :rules="rules"
        ref="menuForm"
      >
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" v-if="show">
          <el-radio-group v-model="isCatalog">
            <el-radio :label="true">目录</el-radio>
            <el-radio :label="false">一级菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" style="width: 220px" />
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" prop="icon">
          <el-popover placement="bottom-start" width="300" trigger="click">
            <el-row>
              <el-col
                v-for="(item, index) of iconList"
                :key="index"
                :md="12"
                :gutter="10"
              >
                <div class="icon-item" @click="checkIcon(item)">
                  <i :class="'iconfont ' + item" /> {{ item }}
                </div>
              </el-col>
            </el-row>
            <el-input
              v-model="menuForm.icon"
              style="width: 220px"
              slot="reference"
              :prefix-icon="'iconfont ' + menuForm.icon"
            />
          </el-popover>
        </el-form-item>
        <!-- 组件路径 -->
        <el-form-item label="组件路径" v-show="!isCatalog" prop="component">
          <el-input v-model="menuForm.component" style="width: 220px" />
        </el-form-item>
        <!-- 路由地址 -->
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="menuForm.path" style="width: 220px" />
        </el-form-item>
        <!-- 显示排序 -->
        <el-form-item label="显示排序">
          <el-input-number
            v-model="menuForm.orderNum"
            controls-position="right"
            :min="1"
            :max="10"
          />
        </el-form-item>
        <!-- 显示状态 -->
        <el-form-item label="显示状态">
          <el-radio-group v-model="menuForm.isHidden">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addMenu = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateMenu('menuForm')"> 确 定 </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        "el-icon-myshouye",
        "el-icon-myfabiaowenzhang",
        "el-icon-myyonghuliebiao",
        "el-icon-myxiaoxi",
        "el-icon-myliuyan",
        "el-icon-myshouye",
        "el-icon-myfabiaowenzhang",
        "el-icon-myyonghuliebiao",
        "el-icon-myxiaoxi",
        "el-icon-myliuyan",
      ],
      menuList: [
        {
          name: "name",
          icon: "el-icon-search",
          orderNum: 3,
          path: "访问路径",
          component: "组件路径",
          isHidden: 0,
          createTime: "2020/12/25",
          children: "孩子",
        },
      ],
      keywords: "",
      addMenu: false,
      menuForm: {
        id: null,
        name: "",
        icon: "",
        component: "",
        path: "",
        orderNum: 1,
        parentId: null,
        isHidden: 0,
      },
      rules: {
        name: { required: true, message: "请输入菜单名称", trigger: "blur" },
        icon: { required: true, message: "请输入icon名称", trigger: "blur" },
        component: {
          required: true,
          message: "请输入组件路径",
          trigger: "blur",
        },
        path: {
          required: true,
          message: "请输入菜单访问路径",
          trigger: "blur",
        },
      },
      show: true,
      isCatalog: true,
    };
  },
  methods: {
    openModel(row, id) {
      if (row) {
        this.show = false;
        this.isCatalog = false;
        switch (id) {
          case 1:
            this.menuForm = {
              id: null,
              name: "",
              icon: "",
              component: "",
              path: "",
              orderNum: 1,
              parentId: null,
              isHidden: 0,
            };
            this.$refs.menuTitle.innerHTML = "新增菜单";
            this.menuForm.parentId = JSON.parse(JSON.stringify(row.id));
            break;
          case 2:
            this.$refs.menuTitle.innerHTML = "修改菜单";
            this.menuForm = JSON.parse(
              JSON.stringify({ ...row, children: undefined })
            );
            break;
        }
      } else {
        this.$refs.menuTitle.innerHTML = "新增菜单";
        this.show = true;
        this.menuForm = {
          id: null,
          name: "",
          icon: "",
          component: "Layout",
          path: "",
          orderNum: 1,
          parentId: null,
          isHidden: 0,
        };
      }
      this.addMenu = true;
    },
    listMenus() {
      this.axios
        .get("http://localhost:3008/api/admin/menus")
        .then(({ data }) => {
          // console.log(data);
          if (data) {
            console.log(data);
            this.menuList = data;
          } else {
            alert("找不到菜单啦");
          }
        });
    },
    changeDisable({ id, isHidden }) {
      this.axios
        .put("http://localhost:3008/api/admin/menu", {
          id,
          isHidden,
        })
        .then((res) => {
          console.log(res);
        });
    },
    deleteMenu() {},
    saveOrUpdateMenu(menuForm) {
      // console.log(this.$refs);
      this.$refs[menuForm].validate((validate) => {
        console.log(validate);
        if (validate) {
          this.axios
            .put("http://localhost:3008/api/admin/menu", {
              ...this.menuForm,
              createTime: undefined,
            })
            .then(({ data }) => {
              if (data.code === 200) {
                this.$notify.success({
                  title: "成功",
                  message: "操作成功",
                });
                this.listMenus();
              } else {
                this.$notify.error({
                  title: "失败",
                  message: "操作失败",
                });
              }
              this.addMenu = false;
            });
        }
      });
    },
    checkIcon(icon) {
      this.menuForm.icon = icon;
    },
  },
  mounted() {
    this.listMenus();
  },
};
</script>
<style scoped>
.icon-item {
  cursor: pointer;
  padding: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>