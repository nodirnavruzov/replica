<template>
  <div class="navbar">
    <div class="container__navbar">
      <div class="logo">
        <b-icon font-scale="2" class="person-icon" icon="chat-fill"></b-icon>
      </div>
      <div class="links header__links">
        <nuxt-link class="link navbar-link" to="/main">Main</nuxt-link>
        <nuxt-link class="link navbar-link" to="/news">News</nuxt-link>
        <nuxt-link class="link navbar-link" to="/articles">Articles</nuxt-link>
        <nuxt-link class="link navbar-link" to="">About</nuxt-link>
      </div>
      <div class="header-user-login">
        <b-icon
          font-scale="2"
          class="person-icon"
          icon="person-circle"
        ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";

export default {
  name: "Header",
  components: {
    BIcon,
  },
};
</script>

<style>
</style>