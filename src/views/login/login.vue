<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <el-form
        status-icon
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm frombox"
      >
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="frombox1">
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="ruleForm.imgUrl" @click="changeCode" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="checked-box">
          <el-checkbox v-model="ruleForm.checked">
            我已经阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-button" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="primary" class="login-button" @click="centerDialogVisible=true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />

    <!-- 注册 -->
    <el-dialog title="用户注册" :visible.sync="centerDialogVisible" width="35%" center>
      <el-form
        :model="reqForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="reqForm.uploadURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="reqForm.imageUrl" :src="reqForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="名称" prop="username">
          <el-input v-model="reqForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="reqForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="reqForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="reqForm.password	"></el-input>
        </el-form-item>

        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="reqForm.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1" class="rowimg">
              <img :src="reqForm.imgURL1" alt @click="changeRcode" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="reqForm.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1" class="rowimg">
              <el-button class="elbtn" @click="gosendsms">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goregister">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { login, sendsms, register } from "../../api/login";
///^1[3456789]\d{9}$/

var validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号码"));
  } else {
    //把正则存起来
    const reg = /^1[3456789]\d{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号码"));
    }
  }
};

var validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    //把正则存起来
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的邮箱"));
    }
  }
};
export default {
  name: "login",
  methods: {
    goregister() {
      register({
        username: this.reqForm.username,
        phone: this.reqForm.phone,
        email: this.reqForm.email,
        avatar: this.reqForm.avatar,
        password: this.reqForm.password,
        rcode: this.reqForm.rcode
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.centerDialogVisible = false;
          this.$message.success("注册成功");
        } else {
          this.$message.warning("注册失败");
        }
      });
    },

    gosendsms() {
      //把正则存起来
      const reg = /^1[3456789]\d{9}$/;
      if (reg.test(this.reqForm.phone) != true) {
        return new Error("请输入正确的手机号码");
      }
      if (this.reqForm.code.length === 0) {
        return new Error("请输入正确的图形码");
      }
      sendsms({
        phone: this.reqForm.phone,
        code: this.reqForm.code
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("短信验证码" + res.data.data.captcha);
        }
      });
    },
    submitForm(formName) {
      if (this.ruleForm.checked == false) {
        // 提示
        this.$message.warning("亲爱的用户，请先勾选用户协议哦！(づ￣ 3￣)づ");
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功 发送请求
          // alert("submit!");
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              window.localStorage.setItem("hmtoken", res.data.data.token);
              this.$message.success("登陆成功");
              this.$router.push("/index");
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    changeCode() {
      // 必须要有分隔符
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Date.now()
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()
      this.ruleForm.imgUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    changeRcode() {
      this.reqForm.imgUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },

    /* 上传 */
    handleAvatarSuccess(res, file) {
      this.reqForm.imageUrl = URL.createObjectURL(file.raw);
      window.console.log(res);
      this.reqForm.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      reqForm: {
        imageUrl: "",
        uploadURL: process.env.VUE_APP_BASEURL + "/uploads",
        imgURL1: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
        username: "",
        phone: "",
        email: "",
        password: "",
        rcode: "",
        avatar: ""
      },

      ruleForm: {
        imgUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
        checked: false,
        phone: "",
        password: "",
        code: ""
      },
      rules: {
        rcode: [
          { message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度在4个字符",
            trigger: "change"
          }
        ],
        username: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 4,
            message: "长度在 2 到 4 个字符",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度在4个字符",
            trigger: "change"
          }
        ]
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 */
  align-items: center;
  /* 线性渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  /* 主轴均分 */
  justify-content: space-around;
  height: 100%;
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .rowimg {
    img {
      width: 100%;
    }
  }
  .rowimg {
    button {
      width: 100%;
    }
  }
  .left {
    height: 550px;
    width: 478px;
    background-color: #f5f5f5;

    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    .frombox {
      width: 394px;
      height: 45px;
      margin-top: 31px;
      margin-left: 43px;

      .frombox1 {
        margin-bottom: 0px;
        img {
          height: 100%;
          width: 100%;
          background-color: #fff;
        }
      }

      .checked-box {
        margin-top: 32px;
        margin-bottom: 28px;
        font-size: 16px;
      }
      .login-button {
        width: 100%;
      }
      .login-button + .login-button {
        margin: 0;
        margin-top: 26px;
      }
    }
    .title-box {
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;

      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }

      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
  }
}
</style>