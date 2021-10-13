<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          { required: true,
            message: '请填写手机号'
          },
          {
            validator: phoneCheck,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button
          round block
          type="info"
          native-type="submit"
          :loading="isloading"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button } from 'vant'
import { login } from '@/services/user'
export default {
  name: 'Login',
  components: {
    VanNavBar: NavBar,
    VanForm: Form,
    VanField: Field,
    VanButton: Button
  },
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      isloading: false
    }
  },
  methods: {
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    async onSubmit () {
      this.isloading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登录成功')
        // 将用户信息存储到 state 中
        this.$store.commit('setUser', data.content)
        // 跳转
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }

      this.isloading = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
