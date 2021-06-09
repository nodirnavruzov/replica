<template>
  <div>
    <Content :content="data" />
    <!-- <Comments /> -->
  </div>
</template>

<script>
import Content from '@/components/Content/Content'
import Comments from '@/components/comments/Comments.vue'
import moment from 'moment'
import axios from 'axios'
import createIcon from '~/utils/createIcon'
export default {
  components: { Content, Comments },
  data() {
    return {}
  },
  async asyncData(context) {
    let response = await axios.get(`http://localhost:3000/api/content/get-post/${context.params.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let data = response.data[0]

    let categoryIcon = createIcon.makeNews()
    data.icon = categoryIcon
    const date = data.date

    let dateNow = moment(new Date(), 'DD-MM-YYYY HH:mm')
    let postDate = moment(date, 'DD-MM-YYYY HH:mm')
    let result = dateNow.diff(postDate, 'hours')
    if (result <= 6) {
      const relativeTime = moment(date, 'DD-MM-YYYY HH:mm').fromNow()
      data.date = relativeTime
      return { data }
    }
    return { data }
  },
  mounted() {
    this.$store.dispatch('LOADING', false)
  }
}
</script>

