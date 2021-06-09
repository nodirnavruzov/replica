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
        <p>{{ alertText }}</p>
      </b-alert>
    </b-container>
    <b-container class="container-alert">
      <b-alert
        :show="dismissCountDownReg"
        dismissible
        variant="success"
        @dismissed="dismissCountDownReg = 0"
        @dismiss-count-down-reg="countDownChangedReg"
      >
        <p>{{ alertText }}</p>
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
          <h3>Sign Up</h3>
        </div>
        <div class="login_card-main">
          <b-form-input
            type="email"
            class="register_input"
            placeholder="Email"
            v-model="user.email"
            :state="validEmail"
          ></b-form-input>
          <b-form-input
            type="password"
            class="register_password mt-3"
            :state="validPassword"
            placeholder="(Password) min length 6 words"
            v-model="user.password"
          ></b-form-input>
          <b-form-input
            type="text"
            class="register_name mt-3"
            :state="validName"
            placeholder="Name"
            v-model="user.name"
          ></b-form-input>
          <b-form-input
            type="text"
            class="register_surname mt-3"
            :state="validSurname"
            placeholder="Surname"
            v-model="user.surname"
          ></b-form-input>
        </div>
        <div class="login_card-footer">
          <div @click="signUp" class="bttn login_button mt-4">Sign Up</div>
          <div class="register_link">
            <nuxt-link to="/login">Log In</nuxt-link>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: null,
        name: null,
        surname: null
      },
      dismissSecs: 5,
      dismissSecsReg: 5,
      dismissCountDown: 0,
      dismissCountDownReg: 0,
      alertText: ''
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlertErr() {
      this.alertText = 'Incorrect email or password or email is already busy'

      this.dismissCountDown = this.dismissSecs
    },
    countDownChangedReg(dismissCountDownReg) {
      this.dismissCountDown = dismissCountDown
    },
    showAlertReg() {
      this.alertText = 'You have been successfully registered'
      this.dismissCountDownReg = this.dismissSecsReg
    },
    async signUp() {
      try {
        if (this.validEmail && this.validPassword && this.validName && this.validSurname) {
          await this.$store
            .dispatch('REGISTER', this.user)
            .then(result => {
              console.log(result)
              if (result.status === 201) {
                this.showAlertReg()
                setTimeout(() => {
                  this.$router.push('/login')
                }, 1500)
              }
            })
            .catch(err => {
              console.log(err)
              this.$router.push('/register')
              this.showAlertErr()
            })
        } else {
          this.showAlertErr()
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    validEmail() {
      if (!this.user.email) return null
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.user.email.length > 3 && re.test(this.user.email)) {
        return true
      } else {
        return false
      }
    },
    validPassword() {
      if (!this.user.password) return null
      if (this.user.password && this.user.password.length > 6) {
        return true
      } else {
        return false
      }
    },
    validName() {
      if (!this.user.name) return null
      if (this.user.name) {
        return true
      } else {
        return false
      }
    },
    validSurname() {
      if (!this.user.surname) return null
      if (this.user.surname) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>

<style lang="scss">
.container-alert {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>