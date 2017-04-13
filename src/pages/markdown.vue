<template>
  <div class="markdown">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
      <el-breadcrumb-item>markdown</el-breadcrumb-item>
    </el-breadcrumb>
    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
  </div>
</template>

<script>
  import { markdownEditor } from 'vue-simplemde'
  export default {
    data () {
      return {
        content: ''
      }
    },
    components: {
      markdownEditor
    }
  }
</script>

<style lang="scss" scoped>
  .crumbs {
    margin-bottom: 20px;
  }
</style>
