<template>
  <el-col :span="24" class="header">
    <div class="header__left">后台管理系统</div>
    <div class="header__nav">
      <div class="header__right">
        <img src="../assets/tx.jpg">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            111<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-col>
</template>

<script>
  export default {
    methods: {
      handleCommand () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .header {
    height: 70px;
    background-color: $blue;
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    z-index: 8;
    @at-root &__left {
      float: left;
      width: 250px;
      line-height: 70px;
      font-size: 20px;
      color: $white;
      text-align: center;
    }
    @at-root &__nav {
      float: left;
      width: calc(100% - 250px);
      height: 100%;
    }
    @at-root &__right {
      float: right;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 20px;
      width: 120px;
      height: 100%;
      &>img {
        display: block;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      .el-dropdown-link {
        color: $white;
        cursor: pointer;
      }
    }
  }
</style>
