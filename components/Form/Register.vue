<template>
  <div>
    <b-form @submit.prevent="onSubmit"  class="container-login--password">
      <b-form-group
        ref="login"
        :model="form"
        class="form-login--password"
        aria-autocomplete="list"
        @submit.native.prevent="onSubmit"
      >
        <div class="form-logo">
          <h2 class="title">
            Register
          </h2>
        </div>
          <b-form-input
            v-model="form.firstname"
            placeholder="First name"
            type="text"
            name="firstname"
            class="email-item"
          >
          </b-form-input>
          <b-form-input
            v-model="form.lastname"
            placeholder="Last name"
            type="text"
            name="lastname"
            class="email-item"
          >
          </b-form-input>
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
          <b-form-input
            v-model="form.comparePassword"
            placeholder="Compare password"
            :type="password ? 'password' : 'text'"
            name="comparepassword"
            class="password-item"
          >
          </b-form-input>
          <nuxt-link class="forget-link float-r" to="/login">
            Login
          </nuxt-link>
          <b-button
            :loading="loading"
            native-type="submit"
            type="primary"
            class="btn-login"
          >
            Register
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
  name: 'Register',
  metaInfo: { title: 'Register in to Replica' },
  data () {
    return {
      form: { 
        firstname: '', 
        lastname: '', 
        email: '', 
        password: '',
        comparePassword: ''
      },
      loading: false,
      password: true
    }
  },
  destroyed () {
    this.loading = false
  },
  methods: {
    onSubmit () {
      this.$emit('register', this.form)
    }
  }
}
</script>
