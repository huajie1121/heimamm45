<template>
  <el-container class="index-container">
    <el-header class="index-container">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/矢量index.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img src="../../assets/login_banner_ele.png" alt="">
        <span class="span1">欢迎你</span>
        <el-button size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .index-container {
    background: yellow;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        height: 28px;
        width: 33px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      img{
        height: 43px;
        width: 43px;
        margin-right: 9px;
      }
      .span1{
        font-size: 14px;
        margin-right: 38px;
      }
     

    }
  }

  .my-aside {
    background-color: pink;
  }
}
</style>