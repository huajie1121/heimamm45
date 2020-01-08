<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="mini"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="big"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="mini"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="状态" class="big">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFilter">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card1">
      <el-table style="width: 100%" :data="tableData">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="220"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="220"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" class="jy">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="subjectStatus(scope.row)"
            >{{ scope.row.status == 0 ?"启用":"禁用"}}</el-button>
            <el-button type="text" size="small" @click="subjectRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用 新增框组件 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 使用 修改框组件 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";

export default {
  name: "subject",
  components: {
    addDialog,
    editDialog
  },
  created() {
    this.subjectList();
  },
  methods: {
    //编辑方法
    enterEdit(item) {
      this.$refs.editDialog.dialogFormVisible = true;
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    //清除学科
    resetFilter() {
      this.$refs.formInline.resetFields();
      // 调用接口
      this.subjectList();
    },
    //搜索学科
    filterData() {
      this.page = 1;
      this.subjectList();
    },
    //删除学科
    subjectRemove(item) {
      subjectRemove({ id: item.id }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.subjectList();
        }
      });
    },
    //修改状态
    subjectStatus(item) {
      subjectStatus({ id: item.id }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("修改成功");
          this.subjectList();
        }
      });
    },
    /* 获取数据列表 */
    subjectList() {
      subjectList({
        limit: this.size,
        page: this.page,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;

        this.total = res.data.data.pagination.total;
      });
    },

    handleSizeChange(size) {
      this.page = 1;
      this.size = size;
      this.subjectList();
      window.console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.subjectList();
      window.console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      //生成出数据的数组
      tableData: [],
      size: 10,
      currentPage4: 1,
      //筛选列表内容
      formInline: {
        rid: "",
        user: "",
        username: "",
        status: ""
      },
      total: 0,
      subjectData: {}
    };
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 20px;
  height: 100px;

  .mini {
    width: 100px;
  }
  .big {
    width: 150px;
  }
}
.el-dialog__header {
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .el-dialog__title {
    color: white;
  }
}
.el-pagination {
  text-align: center;
}
.jy {
  color: red;
}
</style>