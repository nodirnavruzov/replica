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
    ...mapGetters(['getUser', 'getUserPosts'])
  },
  mounted() {
    this.user = this.getUser
    this.$store
      .dispatch('userPosts', this.user.id)
      .then(articles => {
        this.articles = articles
      })
      .catch(err => {
        console.log(err)
      })
    this.$store
      .dispatch('savedPosts', this.user.id)
      .then(posts => {
        this.savedPosts = posts
      })
      .catch(err => {
        console.log(err)
      })

    this.$store.dispatch('loading', false)
  }
}
</script>
