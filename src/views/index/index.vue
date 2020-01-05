<template>
  <el-container class="index-container">
    <el-header class="index-container">Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
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
  }
}
</style>