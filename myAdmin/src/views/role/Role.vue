<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 表格操作 -->
    <div class="operation-container">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openMenuModel(null)"
      >
        新增
      </el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="this.roleIdList.length == 0"
        @click="isDelete = true"
      >
        批量删除
      </el-button>
      <!-- 条件筛选 -->
      <div style="margin-left: auto">
        <el-input
          v-model="keywords"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="请输入角色名"
          style="width: 200px"
          @keyup.enter.native="searchRoles"
        />
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 1rem"
          @click="searchRoles"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table
      border
      :data="roleList"
      @selection-change="selectionChange"
      v-loading="loading"
    >
      <!-- 表格列 -->
      <el-table-column type="selection" width="55" />
      <el-table-column prop="roleName" label="角色名" align="center" />
      <el-table-column prop="roleLabel" label="权限标签" align="center">
        <template slot-scope="scope">
          <el-tag>
            {{ scope.row.roleLabel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isDisable" label="禁用" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDisable"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :active-value="1"
            :inactive-value="0"
            @change="changeDisable(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 5px" />
          {{ scope.row.createTime | date }}
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openMenuModel(scope.row)">
            <i class="el-icon-edit" /> 菜单权限
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="openResourceModel(scope.row)"
          >
            <i class="el-icon-folder-checked" /> 资源权限
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 10px"
            @confirm="deleteRoles(scope.row.id)"
          >
            <el-button size="mini" type="text" slot="reference">
              <i class="el-icon-delete" /> 删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 菜单对话框 -->
    <el-dialog :visible.sync="roleMenu" width="30%">
      <div class="dialog-title-container" slot="title" ref="roleTitle" />
      <el-form label-width="80px" size="medium" :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleName" style="width: 250px" />
        </el-form-item>
        <el-form-item label="权限标签">
          <el-input v-model="roleForm.roleLabel" style="width: 250px" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="menuList"
            :default-checked-keys="roleForm.menuIdList"
            check-strictly
            show-checkbox
            node-key="id"
            ref="menuTree"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleMenu = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRoleMenu">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 资源对话框 -->
    <el-dialog :visible.sync="roleResource" width="30%" top="9vh">
      <div class="dialog-title-container" slot="title">修改资源权限</div>
      <el-form label-width="80px" size="medium" :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleName" style="width: 250px" />
        </el-form-item>
        <el-form-item label="权限标签">
          <el-input v-model="roleForm.roleLabel" style="width: 250px" />
        </el-form-item>
        <el-form-item label="资源权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="resourceTree"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleResource = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRoleResource">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      roleIdList: [],
      keywords: "",
      roleList: [],
      loading: false,
      roleMenu: false,
      roleForm: {},
      menuList: [],
      roleResource: false,
      resourceList: [],
    };
  },
  methods: {
    listRows() {
      this.axios
        .get("http://localhost:3008/api/admin/roles", {
          params: {
            keywords: this.keywords,
          },
        })
        .then(({ data }) => {
          this.roleList = data.data;
          // console.log(this.roleList);
        });
      this.axios
        .get("http://localhost:3008/api/admin/menus")
        .then(({ data }) => {
          console.log(data);
          if (data) {
            this.menuList = data;
          } else {
            alert("找不到菜单啦");
          }
        });
    },
    openMenuModel(role) {
      this.$nextTick(function () {
        this.$refs.menuTree.setCheckedKeys([]);
      });
      this.$refs.roleTitle.innerHTML = role ? "修改角色" : "新增角色";
      if (role != null) {
        this.roleForm = JSON.parse(JSON.stringify(role));
        // console.log(this.roleForm);
      } else {
        this.roleForm = {
          roleName: "",
          roleLabel: "",
          resourceIdList: [],
          menuIdList: [],
        };
      }
      this.roleMenu = true;
    },
    searchRoles() {},
    selectionChange() {},
    changeDisable(row) {
      console.log(row);
    },
    openResourceModel() {},
    deleteRoles() {},
    saveOrUpdateRoleMenu() {
      this.roleForm.menuIdList=this.$refs.menuTree.getCheckedKeys()
      this.axios.post('http://localhost:3008/api/admin/role',this.roleForm).then(res=>{
        console.log(res);
      })
    },
    saveOrUpdateRoleResource() {},
  },
  mounted() {
    this.listRows();
  },
};
</script>
<style scoped>
</style>