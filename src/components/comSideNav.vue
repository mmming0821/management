<template>
  <el-menu :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            theme="light"
            router>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-menu"></i>表格</template>
      <el-menu-item index="table">表格</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-date"></i>表单</template>
      <el-menu-item index="markdown">MarkDown</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    computed: {
      onRoutes () {
        return this.$route.path.replace('/', '')
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo {
    // position: fixed;
    // top: 70px;
    // left: 0;
    border-radius: 0;
    flex: 0 0 230px;
  }
</style>
