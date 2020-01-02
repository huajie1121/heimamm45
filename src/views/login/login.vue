<template>
  <div class="login">
    <div class="login-box"></div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style>
.login {
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
}
.login-box {
  height: 550px;
  width: 478px;
  background-color: #f5f5f5;
}
</style>