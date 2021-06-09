<template>
  <div class="navbar">
    <div class="container__navbar">
      <div class="logo">
        <div class="logo-wp">
          <!-- <img class="logo" width="40" src="~static/img/test/done_white_24dp.svg" alt="" /> -->
        </div>
      </div>
      <div class="links header__links">
        <!-- <nuxt-link class="link navbar-link" to="/main">Home</nuxt-link> -->
        <nuxt-link class="link navbar-link" to="/news">News</nuxt-link>
        <nuxt-link class="link navbar-link" to="/articles">Articles</nuxt-link>
        <nuxt-link class="link navbar-link" to="/about">About</nuxt-link>
      </div>
      <div class="link link_no-hover" @click="statusChange">
        <div class="header-user-login">
          <b-avatar
            v-if="GET_LOGIN_STATE"
            class="header-avatar"
            size="35"
            :src="GET_USER.avatar ? GET_USER.avatar : ''"
          ></b-avatar>
          <div class="login" v-if="GET_LOGIN_STATE">
            <dropdown :show="status" />
            <span class="name">{{ GET_USER.name }}</span>
          </div>
          <div v-else class="login">
            <nuxt-link class="link link-login" to="/login">
              <span class="name"> Log in</span>
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
import { EventBus } from '~/boot/EventBus'

export default {
  components: { dropdown },
  name: 'Header',
  data() {
    return {
      // user: {},
      status: false
      // userStatus: false
    }
  },

  computed: {
    ...mapGetters(['GET_LOGIN_STATE', 'GET_USER'])
  },

  mounted() {
    // if (this.GET_USER) {
    //   this.user = this.$store.getters.GET_USER
    //   this.userStatus = await this.$store.dispatch('CHECK_USER', this.user.id)
    // }
    EventBus.$on('close-popup', value => {
      this.status = value
    })
  },
  methods: {
    statusChange() {
      if (this.GET_LOGIN_STATE) {
        this.status = !this.status
      }
    }
  }
}
</script>

