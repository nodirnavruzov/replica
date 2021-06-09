<template>
  <div class="user-page-wrapper">
    <Personal :userInfo="user" :content="articles" :savedPosts="savedPosts" />
  </div>
</template>

<script>
import Personal from '~/components/User/Personal.vue'
import { mapGetters } from 'vuex'

export default {
  components: { Personal },
  middleware(context) {
    if (!context.store.state.auth_state) {
      return context.redirect('/login')
    }
  },
  data() {
    return {
      user: {},
      articles: [],
      savedPosts: []
    }
  },

  computed: {
    ...mapGetters(['GET_USER', 'GET_USER_POSTS'])
  },
  mounted() {
    this.user = this.GET_USER
    this.$store
      .dispatch('USER_POSTS', this.user.id)
      .then(() => {
        this.articles = this.GET_USER_POSTS
      })
      .catch(err => {
        console.log(err)
      })
    this.$store
      .dispatch('SAVED_POSTS', this.user.id)
      .then(posts => {
        this.savedPosts = posts
      })
      .catch(err => {
        console.log(err)
      })

    this.$store.dispatch('LOADING', false)
  }
}
</script>
