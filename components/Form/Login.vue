<template>
  <div>
    <b-form @submit.prevent="onSubmit"  class="container-login--password">
      <b-form-group
        ref="login"
        :model="form"
        class="form-login--password"
        aria-autocomplete="list"
      >
        <div class="form-logo">
          <h2 class="title">
            Login
          </h2>
        </div>
          <b-form-input
            v-model="form.email"
            placeholder="Email"
            type="email"
            name="email"
            class="email-item"
          >
          </b-form-input>
          <b-form-input
            v-model="form.password"
            placeholder="Password"
            :type="password ? 'password' : 'text'"
            name="password"
            class="password-item"
          >
          </b-form-input>
          <nuxt-link class="forget-link float-r" to="/register">
            Register
          </nuxt-link>
          or
          <nuxt-link class="forget-link float-r" to="/reset-password">
            Forgot Password
          </nuxt-link>
          <b-button
            :loading="loading"
            native-type="submit"
            type="primary"
            class="btn-login"
          >
            Login
          </b-button>
      </b-form-group>
      <div class="app-copyright">
        <small>© 2021 Replica</small>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  metaInfo: { title: 'Sign in to Replica' },
  data () {
    return {
      form: { email: '', password: '' },
      loading: false,
      password: true
    }
  },
  destroyed () {
    this.loading = false
  },
  methods: {
    onSubmit () {
      this.$emit('login', this.form)
    }
  }
}
</script>
