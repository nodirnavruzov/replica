<template>
  <div class="navbar">
    <div class="container__navbar">
      <div class="logo">
        <div class="logo-wp">
        </div>
      </div>
      <div class="links header__links">
        <!-- <nuxt-link class="link navbar-link" to="/main">Home</nuxt-link> -->
        <nuxt-link class="link navbar-link" to="/news">NEWS</nuxt-link>
        <nuxt-link class="link navbar-link" to="/articles">ARTICLES</nuxt-link>
        <nuxt-link class="link navbar-link" to="/about">ABOUT</nuxt-link>
      </div>
      <div class="link link_no-hover" @click="statusChange">
        <div class="header-user-login">
          <b-avatar
            v-if="getLoginState"
            class="header-avatar"
            size="35"
            :src="getUser.avatar ? getUser.avatar : ''"
          ></b-avatar>
          <div class="login" v-if="getLoginState">
            <dropdown :show="status" />
            <span class="name">{{ getUser.firstname }}</span>
          </div>
          <div v-else class="login">
            <nuxt-link class="link link-login" to="/login">
              <span class="name"> Login</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from '@/components/DropDown/dropdown'
import { mapGetters } from 'vuex'

export default {
  components: { dropdown },
  name: 'Header',
  data() {
    return {
      status: false
    }
  },

  computed: {
    ...mapGetters(['getLoginState', 'getUser'])
  },
  methods: {
    statusChange() {
      if (this.getLoginState) {
        this.status = !this.status
        console.log(this.status)
      }
    }
  }
}
</script>

