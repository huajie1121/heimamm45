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
          <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科编号" width="220"></el-table-column>
        <el-table-column prop="address" label="学科名称" width="220"></el-table-column>
        <el-table-column prop="address" label="简称" width="180"></el-table-column>
        <el-table-column prop="address" label="创建者" width="180"></el-table-column>
        <el-table-column prop="address" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="address" label="状态" width="180"></el-table-column>
        <el-table-column label="操作" width="250">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      formInline: {}
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
</style>