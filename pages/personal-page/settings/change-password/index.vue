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
    <b-container class="change_card-container">
      <b-col md="6" class="change_card-content">
        <div class="change_card-header">
          <h3>Change Password</h3>
        </div>
        <div class="change_card-main">
          <b-form-input
            type="password"
            class="change_input"
            placeholder="Current Password"
            v-model="user.currentPassword"
          ></b-form-input>
          <b-form-input
            type="password"
            class="change_password mt-3"
            placeholder="New Password"
            v-model="user.newPassword"
            :state="validationPassword"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 6 letters
          </b-form-invalid-feedback>
          <b-form-input
            type="password"
            class="change_password mt-3"
            placeholder="Compare Password"
            v-model="user.compare"
            :state="comparePassword"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback"> Password mismatch </b-form-invalid-feedback>
        </div>
        <div class="change_card-footer">
          <div @click.prevent="changePassword" class="bttn change_button mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h9v2h-4v3l-5-5zm5-4V6l5 5H8V9h4z"
              />
            </svg>
            <p>Change</p>
          </div>

          <div class="back_link">
            <nuxt-link to="/personal-page/settings/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
              <p>Back</p>
            </nuxt-link>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {
        currentPassword: null,
        newPassword: null,
        compare: null
      },
      validationPassword: null,
      validationCompare: null,
      dismissSecs: 30,
      dismissCountDown: 0,
      alertText: ''
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    validPassword() {
      if (this.user.currentPassword && this.user.newPassword.length > 6) {
        return true
      } else {
        return false
      }
    },
    comparePassword() {
      if(this.user.compare) {
        return this.user.newPassword === this.user.compare
      }
    }
  },
  methods: {
    changePassword() {
      this.validationPassword = this.validPassword
      if (this.validPassword && this.user.newPassword) { 
        const userForm = {
          id: this.getUser.id,
          current_password: this.user.currentPassword,
          new_password: this.user.newPassword
        }
        this.$store.dispatch('changePassword', { userForm }).then(res => {
          this.showAlert(res.message)
          if (res.status) {
          }
        })
      }
       
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(txt) {
      this.alertText = txt
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style>
</style>