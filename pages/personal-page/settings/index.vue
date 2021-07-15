<template>
  <b-container class="container__settings">
    <b-row class="settings__row justify-content-md-center">
      <b-col md="10" class="col">
        <b-col md="6" class="col-settings-header">
          <div class="settings_header">
            <h2 class="settings__title">Account</h2>
            <div class="wrapper_avatar">
              <div class="avatar_left">
                <b-avatar :src="avatar ? avatar : user.avatar" size="10rem"></b-avatar>
              </div>
              <div class="avatar_right">
                <label for="upload" class="upload_btn file-input-avatar">Upload</label>
                <input id="upload" class="upload_input" type="file" accept="image/jpeg" @change="onUpload" />
                <div class="remove_btn" @click="removeAvatar">Remove</div>
              </div>
            </div>
          </div>
        </b-col>
        <hr class="mt-5 mb-5" />
        <div class="settings_body">
          <b-col md="10">
            <b-row class="my-1">
              <b-col class="col" md="4">
                <label class="label label-name" for="input-name">Name:</label>
              </b-col>
              <b-col md="7">
                <b-form-input
                  :disabled="nameDisable"
                  class="input"
                  id="input-name"
                  placeholder="Name"
                  v-model="user.name"
                ></b-form-input>
              </b-col>
              <div class="btn btn-name" @click="disableBtn('name')">
                <img src="~static/img/img-layouts/pencil-fill.svg" alt="" />
              </div>
            </b-row>
            <b-row class="my-1">
              <b-col class="col" md="4">
                <label class="label label-surname" for="input-surname">Surname:</label>
              </b-col>
              <b-col md="7">
                <b-form-input
                  :disabled="surnameDisable"
                  class="input"
                  id="input-surname"
                  placeholder="Surname"
                  v-model="user.surname"
                ></b-form-input>
              </b-col>
              <div class="btn btn-surname" @click="disableBtn('surname')">
                <img src="~static/img/img-layouts/pencil-fill.svg" alt="" />
              </div>
            </b-row>
            <b-row class="my-1">
              <b-col class="col" md="4">
                <label class="label label-email" for="input-email">Email:</label>
              </b-col>
              <b-col md="7">
                <b-form-input
                  :disabled="emailDisable"
                  class="input"
                  type="email"
                  id="input-email"
                  placeholder="Email"
                  v-model="user.email"
                  :state="validEmail"
                ></b-form-input>
              </b-col>
              <div class="btn btn-email" @click="disableBtn('email')">
                <img src="~static/img/img-layouts/pencil-fill.svg" alt="" />
              </div>
            </b-row>
            <b-row class="my-1">
              <b-col class="col" md="4">
                <label class="label label-current-password" for="input-current-password"
                  >Current Password:</label
                >
              </b-col>
              <b-col md="7">
                <b-form-input
                  v-model="user.current_password"
                  class="input"
                  type="password"
                  id="input-current-password"
                  placeholder="Current password"
                  :state="current_password_state"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="btn_col" md="5">
            <div class="wrapper__btn">
              <div class="change_btn" @click="change">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h9v2h-4v3l-5-5zm5-4V6l5 5H8V9h4z"
                  />
                </svg>
                <p class="btn_title">Change</p>
              </div>
              <div class="reset_password-btn" @click="goTo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
                <p class="btn_title">Change Password</p>
              </div>
            </div>
          </b-col>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware(context) {
    if (!context.store.state.auth_state) {
      return context.redirect('/login')
    }
  },
  data() {
    return {
      user: {
        name: '',
        surname: '',
        email: '',
        current_password: null,
        avatar: null
      },
      nameDisable: true,
      surnameDisable: true,
      emailDisable: true,
      selectedFile: null,
      current_password_state: null,
      img: null,
      form: null
    }
  },
  computed: {
    ...mapGetters(['GET_USER']),
    avatar() {
      return this.img
    },
    validEmail() {
      if (!this.user.email) return null
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.user.email.length > 3 && re.test(this.user.email)) {
        return true
      } else {
        return false
      }
    }
  },

  mounted() {
    this.user = {
      id: this.GET_USER.id,
      name: this.GET_USER.name,
      surname: this.GET_USER.surname,
      email: this.GET_USER.email,
      avatar: this.GET_USER.avatar
    }
  },
  methods: {
    async onUpload(e) {
      this.selectedFile = e.target.files[0]
      this.form = new FormData()
      this.form.append('avatar', this.selectedFile, this.selectedFile.name, this.user)
      this.form.append('user_id', this.user.id)
      const reader = new FileReader()
      reader.onloadend = function () {
        this.img = reader.result
      }

      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile)
      }
      await this.$store
        .dispatch('UPLOAD_AVATAR', this.form)
        .then(res => {
          this.user.avatar = res.data.url
        })
        .catch(err => console.log(err))
    },

    removeAvatar() {
      const user = this.GET_USER
      // const res = await this.$store.dispatch('REMOVE_AVATAR', user)
      // if (res.status) {
      this.user.avatar = `${''}`
      // }
    },
    async change() {
      if(this.user.current_password) {
        const userForm = {
          id: this.GET_USER.id,
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          avatar: this.user.avatar,
          current_password: this.user.current_password
        }
        const result = await this.$store.dispatch('CHANGE_SETTINGS', { userForm })
        if (result.status) {
          await this.$store.dispatch('UPDATE_USER').then(res => {
            this.$router.push('/personal-page')
          })
        } else {
          this.current_password_state = false
        }
      } else {
        this.current_password_state = false
      }
    },
    goTo() {
      this.$router.push('/personal-page/settings/change-password')
    },
    disableBtn(e) {
      switch (e) {
        case 'name':
          this.nameDisable = !this.nameDisable
          break
        case 'surname':
          this.surnameDisable = !this.surnameDisable
          break
        case 'email':
          this.emailDisable = !this.emailDisable
          break
        case 'newPassword':
          this.newPasswordDisable = !this.newPasswordDisable
          break
      }
    }
  }
}
</script>

<style>
</style>