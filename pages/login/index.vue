<template>
 <div class="wrapper-login">
    <a href="https://front.codes/" class="logo" target="_blank">
      <img src="https://assets.codepen.io/1462889/fcy.png" alt="">
    </a>

    <div class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 text-center align-self-center py-5">
            <div class="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 class="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"  v-model="checkbox"/>
              <label for="reg-log"></label>
              <div class="card-3d-wrap mx-auto">
                <div class="card-3d-wrapper">
                  <div class="card-front">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <p class="alert p-0" :class="success ? 'alert-success' : 'alert-danger' " v-if="alert"> {{alertText}} </p>
                        <h4 class="mb-4 pb-3">Log In</h4>
                        <div class="form-group">
                          <input v-model="userLogin.email" type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off">
                        </div>	
                        <div class="form-group mt-2">
                          <input v-model="userLogin.password" type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off">
                        </div>
                        <div href="#" class="btn mt-4" @click="loginUser">Login</div>
                            <!-- <p class="mb-0 mt-4 text-center"><nuxtLink to="reset-password" class="link">Forgot your password?</nuxtLink></p> -->
                          </div>
                        </div>
                  </div>
                  <div class="card-back">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <p class="alert p-0" :class="success ? 'alert-success' : 'alert-danger' " v-if="alert"> {{alertText}} </p>
                        <h4 class="mb-2 pb-3">Sign Up</h4>
                        <div class="form-group">
                          <input v-model="userRegister.email" type="email" name="regemail" class="form-style" placeholder="Your Email" id="regemail" autocomplete="off">
                        </div>	
                        <div class="form-group mt-2">
                          <input v-model="userRegister.password" type="password" name="regpass" class="form-style" placeholder="Your Password" id="regpass" autocomplete="off">
                        </div>	
                        <div class="form-group mt-2">
                          <input v-model="userRegister.name" type="text" name="regname" class="form-style" placeholder="Your Full Name" id="regname" autocomplete="off">
                        </div>
                        <div class="form-group mt-2">
                          <input v-model="userRegister.surname" type="text" name="regsurname" class="form-style" placeholder="Your Surname" id="regsurname" autocomplete="off">
                        </div>
                        <div class="btn mt-4" @click="signUp">Register</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      success: null,
      checkbox: false,
      alert: false,
      alertText: '',
      userLogin: {
        email: '',
        password: null
      },
      userRegister: {
        email: '',
        password: null,
        name: null,
        surname: null
      },
    }
  },
  watch: {
    checkbox() {
      this.alert = false
    }
  },
  computed: {
    ...mapGetters(['GET_LOGIN_STATE']),
    validEmail() {
      if (!this.userRegister.email) return null
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.userRegister.email.length > 3 && re.test(this.userRegister.email)) {
        return true
      } else {
        return false
      }
    },
    validPassword() {
      if (!this.userRegister.password) return null
      if (this.userRegister.password && this.userRegister.password.length > 6) {
        return true
      } else {
        return false
      }
    },
    validName() {
      if (!this.userRegister.name) return null
      if (this.userRegister.name) {
        return true
      } else {
        return false
      }
    },
    validSurname() {
      if (!this.userRegister.surname) return null
      if (this.userRegister.surname) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    loginUser() {
      this.$store.dispatch('LOG_IN', this.userLogin).then(res => {
        if (res.status) {
          this.$router.push('/news')
        } else {
          this.userLogin.password = ''          
          this.success = false
          this.alertText = 'Email or password is wrong'
          this.alert = true
        }
      })
    },
    async signUp() {
      try {
        if (this.validEmail && this.validPassword && this.validName && this.validSurname) {
          await this.$store
            .dispatch('REGISTER', this.userRegister)
            .then(result => {
              if (result.status === 201) {
                this.success = true
                this.alertText = 'Registration completed successfully'
                this.alert = true
                setTimeout(() => {
                  this.checkbox = false
                }, 2000)
              }
            })
            .catch(err => {
              console.log(err)
              this.success = true
              this.alertText = 'Registration completed successfully'
              this.alert = true
              this.checkbox = true
            })
        } else {
          console.log('ERROR Valid')
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.userRegister = {}
      }
    }
  },

  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>


<style lang="scss" scoped>
.wrapper-login {
  background-color: #2e353d !important;
  color: #fff;
}

a {
	cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
	text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #5fbd67;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #69849b;
  font-family: 'unicons';
  content: '\2196';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 450px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}


.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: rgb(219, 209, 209);
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #69849b;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #69849b;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #69849b;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #69849b;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #5fbd67;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{  
  background-color: #69849b;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}




.logo {
	position: absolute;
	top: 30px;
	right: 30px;
	display: block;
	z-index: 100;
	transition: all 250ms linear;
}
.logo img {
	height: 26px;
	width: auto;
	display: block;
}
.alert {
  margin-bottom: 10px;
  font-size: 16px;
}
.uil-at:before {
    content: '\e9bf';
}
[class^=uil-]:before, [class*=" uil-"]:before {
    font-family: unicons;
    font-style: normal;
    font-weight: 400;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
    -webkit-font-smoothing: antialiased;
}
</style>
