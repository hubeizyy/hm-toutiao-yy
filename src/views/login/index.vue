<template>
  <div class="container">
    <el-card>
      <img src="../../assets/images/logo_index.png" alt />
      <!-- status-icon 自定义图标属性 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 声明自定义的校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号  正则去校验当前的value
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机号格式不对')) }
      // 校验成功直接调用
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        // 多种规则，对象形式的数组
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(vaild => {
        if (vaild) {
          // 对整个表单进行校验，成功之后发送请求
          // console.log('校验success')
          this.$http.post(
            'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm
          ).then(res => {
            // 成功
            // res 响应对象   包含响应主体
            // console.log(res.data)
            // 跳转到首页
            this.$router.push('/')
            // 失败
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less" >
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .el-card {
    position: absolute;
    width: 400px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
