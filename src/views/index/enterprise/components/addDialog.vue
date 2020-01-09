<template>
  <!-- 新增学科 -->
  <el-dialog title="新增企业" :visible.sync="dialogFormVisible" width="30%" center>
    <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="enterpriseAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseAdd } from "@/api/enterprise";
export default {
  data() {
    return {
      dialogFormVisible: false,
      //新增表单
      addForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //新增表单检测
      rules: {
        eid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    enterpriseAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //验证成功 发送请求
          // alert("submit!");
          enterpriseAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              this.$parent.enterpriseList();
              this.dialogFormVisible = false;
              // 清空内容
              this.$refs.addForm.resetFields();
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>