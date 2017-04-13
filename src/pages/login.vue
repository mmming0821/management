<template>
  <div id="login">
    <h3 class="login-title">后台管理系统</h3>
    <div class="login">
      <el-form v-show="switchForm" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="password"></el-input>
        </el-form-item>
        <div class="login-btns">
          <el-button type="primary" @click="login('loginForm')">登&nbsp;&nbsp;录</el-button>
          <el-button type="primary" @click="register">注&nbsp;&nbsp;册</el-button>
        </div>
      </el-form>
      <el-form v-show="!switchForm" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="password"></el-input>
        </el-form-item>
        <div class="login-btns">
          <el-button type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
          <el-button type="primary" @click="register('registerForm')">注&nbsp;&nbsp;册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          password: [
            { required: true, message: '请输入正确的密码', trigger: 'blur' },
            { min: 6, message: '长度至少6个字符', trigger: 'blur' }
          ]
        },
        registerForm: {
          username: '',
          email: '',
          password: ''
        },
        registerRules: {
          username: { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          email: [
            // { required: false, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入正确的密码', trigger: 'blur' },
            { min: 6, message: '长度至少6个字符', trigger: 'blur' }
          ]
        },
        switchForm: true
      }
    },
    methods: {
      login (formName) {
        if (!this.switchForm) {
          this.$refs['registerForm'].resetFields()
          this.switchForm = true
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.$router.push('/readme')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      register (formName) {
        if (this.switchForm) {
          this.$refs['loginForm'].resetFields()
          this.switchForm = false
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.$router.push('/readme')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  #login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    // background-color: $dark;
  }
  .login-title {
    margin-top: -9%;
    font-size: 24px;
    // color: $white;
    color: $dark;
  }
  .login {
    margin-top: 26px;
    border-radius: 5px;
    padding: 40px 40px 25px;
    min-width: 300px;
    min-height: 160px;
    background-color: $white;
    box-shadow: 0 0 25px #cac6c6;
    // background: hsla(0,0%,100%,.3);
    // box-shadow: 0px 0px 15px #333;
    &-btns {
      display: flex;
      justify-content: space-around;
      padding-top: 10px;
    }
  }
</style>
