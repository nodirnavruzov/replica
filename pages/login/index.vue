<template>
  <div>
    <b-container class="container-alert">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ alertText }}
      </b-alert>
    </b-container>
    <b-container class="login_card-container">
      <b-col md="6" class="login_card-info">
        <img
          src="https://images.unsplash.com/photo-1583361704493-d4d4d1b1d70a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
          alt=""
        />
      </b-col>
      <b-col md="6" class="login_card-content">
        <div class="login_card-header">
          <h3>Sign In</h3>
        </div>
        <div class="login_card-main">
          <b-form-input
            type="email"
            class="login_input"
            placeholder="Email"
            v-model="user.email"
          ></b-form-input>
          <b-form-input
            type="password"
            class="login_password mt-3"
            placeholder="Password"
            v-model="user.password"
          ></b-form-input>
        </div>
        <div class="login_card-footer">
          <div @click="loginUser" class="bttn login_button mt-4">LOGIN</div>
          <div class="register_link">
            <nuxt-link to="/register">Register</nuxt-link>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '~/boot/EventBus'
export default {
  data() {
    return {
      user: {
        email: '',
        password: null
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      alertText: ''
    }
  },
  computed: {
    ...mapGetters(['GET_LOGIN_STATE'])
  },
  methods: {
    loginUser() {
      this.$store.dispatch('LOG_IN', this.user).then(res => {
        if (res.status) {
          this.$router.push('/news')
        } else {
          this.showAlert(res.message)
        }
      })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(txt) {
      this.alertText = txt
      this.dismissCountDown = this.dismissSecs
    }
  },

  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>

<style>
</style>