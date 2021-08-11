<template>
 <div class="wrapper-login">
<div class="login-page">
      <transition name="fade">
         <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                  <h1>Sign In</h1>
                  <form class="form-group">
                     <input v-model="userLogin.email" type="email" class="form-control" placeholder="Email" required autocomplete="on">
                     <input v-model="userLogin.password" type="password" class="form-control" placeholder="Password" required autocomplete="on">
                     <input type="submit" class="btn btn-primary" @click.prevent="loginUser">
                     <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                     </p>
                  </form>
               </div>

               <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h1>Sign Up</h1>
                  <form class="form-group">
                     <input v-model="userRegister.emailReg" type="email" :class="{'border-red' : errorValid}" class="form-control" placeholder="Email" required>
                     <input v-model="userRegister.passwordReg" type="password" :class="{'border-red' : errorValid}" class="form-control" placeholder="Password" required>
                     <input v-model="userRegister.confirmPasswordReg" type="password" class="form-control" placeholder="Confirm Password" required>
                     <input v-model="userRegister.nameReg" type="text" :class="{'border-red' : errorValid}" class="form-control" placeholder="Name" required>
                     <input v-model="userRegister.surnameReg" type="text" :class="{'border-red' : errorValid}" class="form-control" placeholder="Surname" required>
                     <input type="submit" class="btn btn-primary" @click.prevent="register">
                     <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      registerActive: false,
      emptyFields: false,
      errorValid: false,
      userLogin: {
        email: '',
        password: '',
      },
      userRegister: {
        emailReg: '',
        passwordReg: '',
        confirmPasswordReg: '',
        nameReg: '',
        surnameReg: '',
      },
    }
  },
  computed: {
    ...mapGetters(['GET_LOGIN_STATE']),
    // comparePassword() {
    //   console.log('qqqqqqq')
    //   if(this.confirmPasswordReg === this.passwordReg) { 
    //     console.log('compare')
    //     return true
    //   } else {
    //     console.log('err compare')
    //     return false
    //   }
    // },
  },

  methods: {
    loginUser() {
      this.$store.dispatch('LOG_IN', this.userLogin).then(res => {
        if (res.status) {
          this.$router.push('/news')
        } else {
          this.emptyFields = true;
          setTimeout(() => {
            this.emptyFields = false;
          }, 500)
        }
      })
    },

    async register() {
      try {
        if (this.validEmail() && this.validPassword() && this.comparePassword()) {
         const result =  await this.$store.dispatch('REGISTER', this.userRegister)
          if (result.status === 201) {
            console.log('result', result)
          }
        } else {
          this.emptyFields = true;
          setTimeout(() => {
            this.emptyFields = false;
          }, 500)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.userRegister = {}
      }
    },

    validEmail() {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(this.userRegister.email) {
        if (this.userRegister.email.length > 3 && re.test(this.userRegister.email)) {
          return true
        } else {
          this.errorValid = true
          setTimeout(() => {
            this.errorValid = false
          }, 2000)
          return false
        }
      }else {
        setTimeout(() => {
          this.errorValid = false
        }, 2000)
        return false
      }
    },

    validPassword() {
      if (this.userRegister.password && this.userRegister.password.length > 6) {
        return true
      } else {
        return false
      }
    },

    comparePassword() {
        console.log('comparePassword')
      if(this.confirmPasswordReg == this.passwordReg) { 
        console.log('compare')
        return true
      } else {
        console.log('err compare')
        return false
      }
    },
  },

  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>


<style lang="scss" scoped>
p {
   line-height: 1rem;
}

.card {
   padding: 20px;
}

.form-group {
   input {
      margin-bottom: 20px;
   }
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
        no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }
  
  .fade-enter-active,
  .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
   
  .wallpaper-register {
    background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
        no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
   animation-name: errorShake;
   animation-duration: 0.3s;
}
.border-red {
  border-color: red;
}

@keyframes errorShake {
   0% {
      transform: translateX(-25px);
   }
   25% {
      transform: translateX(25px);
   }
   50% {
      transform: translateX(-25px);
   }
   75% {
      transform: translateX(25px);
   }
   100% {
      transform: translateX(0);
   }
}

</style>
