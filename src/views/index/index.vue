<template>
  <el-container class="index-container">
    <el-header class="index-container">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/矢量index.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="indexUrl" alt />
        <span class="span1">{{username}},欢迎你</span>
        <el-button size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info } from "../../api/index";
export default {
  name: "index",
  data() {
    return {
      indexUrl: "",
      username: ""
    };
  },
  created() {
    info().then(res => {
      window.console.log(res);
      this.username = res.data.data.username;
      this.indexUrl = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .index-container {
    background: white;
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
      img {
        height: 43px;
        width: 43px;
        margin-right: 9px;
      }
      .span1 {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }

  .my-aside {
    background: white;
  }
}
</style>