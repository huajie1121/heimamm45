<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user" class="mini"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user" class="big"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" class="mini"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="状态" class="big">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
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
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="subjectStatus(scope.row)"
            >{{ scope.row.status == 0 ?"启用":"禁用"}}</el-button>
            <el-button type="text" size="small">查看</el-button>
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
  </div>
</template>

<script>
import { subjectList, subjectStatus } from "@/api/subject.js";
import addDialog from "./components/addDialog.vue";
export default {
  name: "subject",
  components: {
    addDialog
  },
  created() {
    this.subjectList();
  },
  methods: {
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
      subjectList({ limit: this.size, page: this.page }).then(res => {
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
      formInline: {},
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