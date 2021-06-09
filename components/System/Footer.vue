<template>
  <footer v-if="!GET_LOADING">
    <div class="container__footer container">
      <div class="row wrapper__footer">
        <div class="a col-md-4">
          <h5>Navigation</h5>
          <ul class="nav">
            <li>
              <nuxt-link class="nav-footer" to="/news">News</nuxt-link>
            </li>
            <li>
              <nuxt-link class="nav-footer" to="/articles">Articles</nuxt-link>
            </li>
            <li>
              <nuxt-link class="nav-footer" to="/about">About</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="b col-md-4">
          <h5>Social networks</h5>
          <ul class="nav">
            <li>
              <nuxt-link class="nav-footer" to="">
                <b-icon icon="instagram" aria-hidden="true"></b-icon>
                Instagram</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="nav-footer" to="">
                <img src="~static/img/img-layouts/telegram-app.svg" alt="" />
                Telegram</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="nav-footer" to="">
                <b-icon icon="linkedin" aria-hidden="true"></b-icon>
                LinkedIn</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="nav-footer" to="">
                <b-icon icon="github" aria-hidden="true"></b-icon>
                GitHub</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="c col-md-4"></div>
      </div>

      <p class="copyright">© 2021-2021 - All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['GET_LOADING'])
  }
}
</script>
