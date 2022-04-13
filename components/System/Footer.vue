<template>
  <footer v-if="!getLoading">
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
              <a href="https://www.instagram.com/navruzov_n_k/" class="nav-footer" to="">
                <b-icon icon="instagram" aria-hidden="true"></b-icon>
                Instagram</a
              >
            </li>
            <li>
              <a href="https://t.me/genesis_ftw" class="nav-footer" to="">
                <img src="~static/img/img-layouts/telegram-app.svg" alt="" />
                Telegram</a
              >
            </li>
            <li>
              <a href="https://www.linkedin.com/in/nodir-navruzov-705a64202" class="nav-footer" to="">
                <b-icon icon="linkedin" aria-hidden="true"></b-icon>
                LinkedIn</a
              >
            </li>
            <li>
              
              <a href="https://github.com/nodirnavruzov" class="nav-footer">
                <b-icon icon="github" aria-hidden="true"></b-icon>
                GitHub</a
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
    ...mapGetters(['getLoading'])
  }
}
</script>
