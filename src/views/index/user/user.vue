<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card1">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="用户名" width="200"></el-table-column>
        <el-table-column prop="name" label="电话" width="200"></el-table-column>
        <el-table-column prop="name" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="name" label="角色" width="200"></el-table-column>
        <el-table-column prop="name" label="备注" width="200"></el-table-column>
        <el-table-column prop="name" label="状态" width="200"></el-table-column>
        <el-table-column prop="name" label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "user",
  methods: {
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      currentPage4: 1,
      /* 顶部表单 */
      formInline: {},
      /* 表格表单 */
      tableData: []
    };
  }
};
</script>

<style>
.box-card {
  height: 103px;
}
.pagination {
  margin-top: 30px;
}
</style>