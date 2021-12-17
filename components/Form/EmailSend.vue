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
            Send Email
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
          <nuxt-link class="forget-link float-r" to="/login">
            Login
          </nuxt-link>
        or
          <nuxt-link class="forget-link float-l" to="/register">
            Register
          </nuxt-link>
          <b-button
            :loading="loading"
            native-type="submit"
            type="primary"
            class="btn-login"
          >
            Send
          </b-button>
      </b-form-group>
      <div class="app-copyright">
        <small>© 2021 Replica</small>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'EmailSend',
  metaInfo: { title: 'Reset password' },
  data () {
    return {
      form: { email: ''},
      loading: false,
      password: true
    }
  },
  destroyed () {
    this.loading = false
  },
  methods: {
    ...mapActions({}),
    // отправляем почту
    onSubmit () {
      this.$emit('send', this.form)
    }
  }
}
</script>
