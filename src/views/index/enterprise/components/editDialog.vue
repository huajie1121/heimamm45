<template>
  <!-- 编辑学科 -->
  <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" width="30%" center>
    <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简历" prop="intro">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subjectedit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "@/api/subject";
export default {
  data() {
    return {
      dialogFormVisible: false,
      //新增表单
      editForm: {
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
    subjectedit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //验证成功 发送请求
          // alert("submit!");
          subjectEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("编辑成功");
              this.$parent.subjectList();
              this.dialogFormVisible = false;
              // 清空内容
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