<template>
  <div>
    <b-form class="container-login--password">
      <b-form-group
      ref="login"
      :model="form"
      class="form-login--password"
      aria-autocomplete="list"
      @submit.native.prevent="onSubmit"
    >
      <div class="form-logo">
        <h2 class="title">
          Verify Email
        </h2>
      </div>
        <b-form-input
          v-model="form.code"
          placeholder="Code"
          type="text"
          name="code"
          class="email-item"
        >
        </b-form-input>
        <nuxt-link class="forget-link float-r" to="/login">
          Login
        </nuxt-link>
        <b-button
          :loading="loading"
          native-type="submit"
          @click.prevent="onSubmit"
          type="primary"
          class="btn-login"
        >
          Verify
        </b-button>
        <b-button
          :loading="loading"
          native-type="submit"
          @click.prevent="onReSend"
          type="primary"
          class="btn-login"
          :disabled="disabled"
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

export default {
  name: 'Verify',
  props: ['email'],
  data () {
    return {
      form: { code: '', email: ''},
      loading: false,
      password: true,
      disabled: false,
    }
  },
  destroyed () {
    this.loading = false
  },
  methods: {
    onSubmit () {
      this.$emit('verify', this.form)
    },
    onReSend () {
      this.disabled = true
      this.$emit('reSend', this.form.email = this.email)
    }
  }
}
</script>
