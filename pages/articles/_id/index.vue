<template>
  <div>
    <Content :content="data" />
  </div>
</template>

<script>
import axios from 'axios'

import Content from '@/components/Content/Content'
import moment from 'moment'

import createIcon from '~/utils/createIcon'
export default {
  components: { Content },
  async asyncData({ params }) {
    let response = await axios.get(`/api/content/get-post/${params.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let data = response.data[0]
    let categoryIcon = null
    switch (data.category) {
      case 'Blog':
        categoryIcon = createIcon.makeBlog()
        data.icon = categoryIcon
        break
      case 'Technology':
        categoryIcon = createIcon.makeTechnology()
        data.icon = categoryIcon
        break
      case 'Design':
        categoryIcon = createIcon.makeDesign()
        data.icon = categoryIcon
        break
      case 'Programming':
        categoryIcon = createIcon.makeProgramming()
        data.icon = categoryIcon
        break
    }
    const date = data.date

    let dateNow = moment(new Date(), 'DD-MM-YYYY HH:mm')
    let postDate = moment(date, 'DD-MM-YYYY HH:mm')
    let result = dateNow.diff(postDate, 'hours')
    if (result <= 6) {
      const relativeTime = moment(date, 'DD-MM-YYYY HH:mm').fromNow()
      data.date = relativeTime
      return { data }
    }
    console.log('data', data)
    
    return { data }
  },
  mounted() {
    this.$store.dispatch('loading', false)
  }
}
</script>

