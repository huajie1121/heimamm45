<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="inquireList">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addDialog">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="eid" label="企业编码" width="220"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="220"></el-table-column>
        <el-table-column prop="username" label="创建者" width="200"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="220">
          <template slot-scope="scope">{{scope.row.create_time|formatTime}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editDialog(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="enterpriseStatus((scope.row))"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button type="text" size="small" @click="delenterprise(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="sizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import editDialog from "./components/editDialog";
import addDialog from "./components/addDialog";
import {
  enterpriseList,
  enterpriseRemove,
  enterpriseStatus
} from "@/api/enterprise";
export default {
  name: "enterprise",
  components: {
    editDialog,
    addDialog
  },
  created() {
    this.enterpriseList();
  },
  methods: {
    /* 修改状态 */
    enterpriseStatus(item) {
      enterpriseStatus({ id: item.id }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("恭喜你，修改成功");
          this.enterpriseList();
        }
      });
    },
    /* 删除 */
    delenterprise(item) {
      enterpriseRemove({ id: item.id }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("恭喜你，删除成功");
          this.enterpriseList();
        }
      });
    },
    /* 搜索 */
    inquireList() {
      this.enterpriseList();
    },
    /* 清空搜索内容 */
    clearQuery() {
      this.$refs.formInline.resetFields();
      this.enterpriseList();
    },
    /* 数据列表 */
    enterpriseList() {
      enterpriseList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    /* 新增 */
    addDialog() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    /* 编辑 */
    editDialog(item) {
      this.$refs.editDialog.dialogFormVisible = true;
      // 设置数据
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    /* 页容量 */
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.enterpriseList();
      window.console.log(`每页 ${val} 条`);
    },
    /* 分页 */
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page = val;
      this.enterpriseList();
    }
  },
  data() {
    return {
      total: 0,
      size: 2,
      sizes: [2, 4, 6, 10],
      page: 1,
      tableData: [],
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      }
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
.red {
  color: red;
}
</style>