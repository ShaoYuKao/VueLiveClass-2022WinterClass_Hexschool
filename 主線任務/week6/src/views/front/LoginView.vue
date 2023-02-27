<template>
  這是登入畫面
  <form id="form" class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        :class="{ 'is-invalid': usernameRequir }"
        id="username"
        placeholder="name@example.com"
        v-model="userInfo.username"
        :disabled="isLoading"
        required
        autofocus
      />
      <label for="username">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        :class="{ 'is-invalid': passwordRequir }"
        id="password"
        placeholder="Password"
        v-model="userInfo.password"
        :disabled="isLoading"
        required
      />
      <label for="password">Password</label>
    </div>
    <button
      class="btn btn-lg btn-primary w-100 mt-3"
      type="submit"
      :disabled="isLoading"
    >
      登入
      <div class="spinner-border ms-2" role="status" v-if="isLoading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
  </form>
</template>

<script>
const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      isLoading: false,
      usernameRequir: false,
      passwordRequir: false
    }
  },
  methods: {
    login () {
      this.usernameRequir = this.userInfo.username === ''
      this.passwordRequir = this.userInfo.password === ''
      if (this.usernameRequir || this.passwordRequir) {
        this.alert('需填入帳號和密碼資料，登入失敗', 'danger')
        return
      }

      this.isLoading = true

      const reqData = {
        username: this.userInfo.username,
        password: this.userInfo.password
      }
      this.$http
        .post(`${VITE_APP_URL}/admin/signin`, reqData)
        .then((res) => {
          if (res.status === 200) {
            const { expired, token } = res.data

            // 寫入 cookie token
            // expires 設置有效時間
            document.cookie = `hexToken=${token};expires=${new Date(
              expired
            )}; path=/`
            // window.location = 'products.html'
            this.$router.push('/admin/products')
          } else {
            this.alert('帳號密碼錯誤，登入失敗', 'danger')
          }
        })
        .catch((err) => {
          console.error('err', err)
          this.alert('帳號密碼錯誤，登入失敗', 'danger')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    alert (message, type) {
      const alertPlaceholder = document.getElementById('loginResult')
      const wrapper = document.createElement('div')
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert"> 
          ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `
      alertPlaceholder.append(wrapper)
      setTimeout(() => {
        const alertNode = document.querySelector('.alert')
        const bsAlert = new bootstrap.Alert(alertNode)
        if (alertNode && bsAlert) {
          bsAlert.close()
        }
      }, 3000)
    }
  }
}
</script>
