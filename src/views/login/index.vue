<template>
  <div class="login-container">
    <div class="login-item">

      <div class="title-sapn">
        <h2>景区后台管理</h2>
      </div>

      <div class="login-form">
        <!-- 登录表单 -->
        <el-form ref="loginFormRef" label-width="0" class="login_form" :model="loginForm" :rules="loginFormRules">
          <!--用户名-->
          <el-form-item prop="username">

            <el-input class="form-input" prefix-icon="el-icon-s-check
" placeholder="用户名" v-model="loginForm.username"
                      :autofocus="true"/>
          </el-form-item>

          <!--密码-->
          <el-form-item prop="password">
            <el-input class="form-input" prefix-icon="el-icon-s-goods" type="password" placeholder="密码"
                      v-model="loginForm.password"/>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item class="form-btn" style="margin-top: 40px">
            <el-button class="form-input" type="primary" @click="login"><span class="login-span">登 &nbsp;录</span>
            </el-button>
          </el-form-item>


        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import { adminLogin } from '../../api/common'

  export default {
    name: 'index',
    data() {
      return {
        //表单数据绑定
        loginForm: {
          username: '',
          password: ''
        },
        //表单验证
        loginFormRules: {
          username:
            [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
            ],
          password:
            [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
            ]
        }

      }
    },
    methods: {
      login() {
        if (this.loginForm.username.trim() == '') {
          this.$message({ message: '用户名不能为空', type: 'error', duration: 1700 })
          return
        }

        if (this.loginForm.password.trim() == '') {
          this.$message({ message: '密码不能为空', type: 'error', duration: 1700 })
          return
        }
        adminLogin(this.loginForm).then(res => {
          if (res.success) {
            this.$message({ message: `欢迎 ${res.data.data.username} 景区后台管理系统`, type: 'success', duration: 1700 })
            window.localStorage.setItem('AdminInfo', JSON.stringify(res.data.data))
            this.$router.push({ path: '/' })
          } else {
            this.$message({ message: res.message, type: 'error', duration: 1700 })

          }

        })

      },

      //重置
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      }

    }
  }
</script>

<style scoped>
  .login-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, rgb(60, 59, 63), rgb(96, 92, 60));
    display: flex;
  }

  .login-item {
    margin: auto;
    background-color: #ffecec;
    width: 400px;
    height: 370px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

  }

  .title-sapn {
    margin: 30px auto;
  }

  .login-form {
    margin: 0 auto;
  }

  .form-input {
    width: 330px;
  }

  .login-span {
    font-size: 16px;
    font-weight: 500;
  }

</style>
