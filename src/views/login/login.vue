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
          <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="frombox1">
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8" >
              <img :src="ruleForm.imgUrl" @click="changeCode"/>
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
          <el-button type="primary" class="login-button">登录</el-button>
          <el-button type="primary" class="login-button">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>


<script>
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
export default {
  name: "login",
  methods: {
    submitForm(formName) {
      if (this.ruleForm.checked == false) {
        // 提示
        this.$message.warning("亲爱的用户，请先勾选用户协议哦！(づ￣ 3￣)づ");
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功 发送请求
          alert("submit!");
        } else {
        this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCode() {
      // 必须要有分隔符
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Date.now()
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()
      this.ruleForm.imgUrl = process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    }
  },
  data() {
    return {
      ruleForm: {
        imgUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
        checked: false,
        phone: "",
        password: "",
        code: ""
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
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