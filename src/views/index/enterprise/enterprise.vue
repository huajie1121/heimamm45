<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业编码" width="220"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="220"></el-table-column>
        <el-table-column prop="name" label="创建者" width="200"></el-table-column>
        <el-table-column prop="name" label="创建日期" width="220"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="sizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑框 -->
    <editDialog></editDialog>
  </div>
</template>

<script>
import editDialog from "./components/editDialog";
import addDialog from "./components/addDialog";
export default {
  name: "enterprise",
  components: {
    editDialog,
    addDialog
  },
  methods: {
    addDialog() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      total: 0,
      size: 2,
      sizes: [2, 4, 6, 10],
      currentPage4: 1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formInline: {}
    };
  }
};
</script>

<style>
.box-card {
  margin-bottom: 20px;
}
.pagination {
  margin-top: 30px;
}
</style>