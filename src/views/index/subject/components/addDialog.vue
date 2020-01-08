<template>
  <!-- 新增学科 -->
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="30%" center>
    <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简历" prop="intro">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subjectAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "@/api/subject";
export default {
  data() {
    return {
      dialogFormVisible: false,
      //新增表单
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //新增表单检测
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    subjectAdd() {
      // if (this.addForm.rid.length != 0 && this.addForm.name.length != 0) {
      //   subjectAdd(this.addForm).then(res => {
      //     window.console.log(res);
      //   });
      // } else {
      //   this.$message.error("学科编号或学科名称不能为空");
      // }
      // // this.dialogFormVisible = false;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //验证成功 发送请求
          // alert("submit!");
          subjectAdd(this.addForm).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              this.$parent.subjectList();
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