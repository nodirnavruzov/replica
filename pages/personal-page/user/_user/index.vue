<template>
  <div class="user-page-wrapper">
    <Users :user="user" :content="articles" />
  </div>
</template>

<script>
import axios from 'axios'

import Users from '@/components/User/Users'
import createIcon from '~/utils/createIcon'

export default {
  components: { Users },
  data() {
    return {
      user: {},
      articles: []
    }
  },

  async asyncData(context) {
    console.log('asyncData')
    let user_id = context.params.user.split('-')[1]
    let articles = await axios.get('/api/content/user-posts', {
      params: { user_id }
    })
    let response = await axios.get(`/api/user/get-user/${user_id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let categoryIcon
    for (let i = 0; i < articles.data.length; i++) {
      const article = articles.data[i];
      switch (article.category) {
        case 'Blog':
          categoryIcon = createIcon.makeBlog()
          article.icon = categoryIcon
          break
        case 'Technology':
          categoryIcon = createIcon.makeTechnology()
          article.icon = categoryIcon
          break
        case 'Design':
          categoryIcon = createIcon.makeDesign()
          article.icon = categoryIcon
          break
        case 'News':
          categoryIcon = createIcon.makeNews()
          article.icon = categoryIcon
          break
        case 'Programming':
          categoryIcon = createIcon.makeProgramming()
          article.icon = categoryIcon
          break
      }
    }
    const user = response.data
    const formatedDate = user.registration_date.slice(0, 10)
    user.registration_date = formatedDate
    console.log(articles);
    return { user, articles }
  },
  mounted() {
    this.$store.dispatch('loading', false)
  }
}
</script>

