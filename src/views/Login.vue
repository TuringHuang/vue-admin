<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <h2 class="login-title">Vue Back Admin</h2>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;padding:10px 0;"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度最小长度不能小于6位'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },

      //校验规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        //获取到当前url中的参数：http://localhost:8080/login?redirect=%2F
        const query = route.query;
        if (query) {
          //query: {redirect:'/'}
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        //校验成功
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              //登录成功重定向到原本要去的路由，并不是每次都是跳到首页
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      //样式数据修改之后，不会立即执行，需要等到刷新队列刷新，使用nextTick监听数据刷新，让password获取到焦点
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    //获取url中的除redirect以外的参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
//覆盖element-ui样式

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-container {
  .el-input {
    display: inline-block;
    width: 80%;
    height: 40px;
    background: transparent;

    input {
      border: 0px;
      height: 40px;

      //去掉input在chrome中自动填充时的默认背景
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #666 !important;
      }
    }
  }

  //加边框包住input和图标
  .el-form-item {
    border: 1px solid #409eff;
    border-radius: 5px;
    color: #454545;
    margin-bottom: 32px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  width: 420px;
  margin: 0 auto;
  padding: 120px 30px 0;

  .login-title {
    text-align: center;
    margin-bottom: 25px;
  }

  .svg-container {
    display: inline-block;
    padding: 0 5px 0 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
  }

  .show-pwd {
    // el-form-item默认有position:relative属性
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
