<template>
  <div class="user-page-wrapper">
    <Users :user="user" :content="articles" />
  </div>
</template>

<script>
import axios from 'axios'
import Users from '@/components/User/Users'
export default {
  // TODO Need add userpage
  components: { Users },
  data() {
    return {
      user: {},
      articles: []
    }
  },

  async asyncData(context) {
    let user_id = context.params.user.split('-')[1]
    let articles = await axios.get('http://localhost:3000/api/content/user-posts', {
      params: { user_id }
    })
    let response = await axios.get(`http://localhost:3000/api/user/get-user/${user_id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const user = response.data
    const formatedDate = user.registration_date.slice(0, 10)
    user.registration_date = formatedDate
    return { user, articles }
  },
  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>

