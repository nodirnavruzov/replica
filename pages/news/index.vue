<template>
  <div>
    <!-- <b-container class="wrapper__page-card mt-2 mb-4">
      <Card :info="page_info" />
    </b-container> -->
    <template v-if="!isLoading">
      <Panel :sortBy="sort" />
    </template>
    <div class="wrapper_news-page_content-list">
      <ContentList :news="news" />
    </div>
    <b-container v-if="!isLoading">
      <b-row class="row__show-more justify-content-md-center">
        <b-col md="8">
          <div class="wrapper">
            <div v-if="showBtn" class="btn-showmore" @click="showMore()">Show more</div>
            <nuxt-link v-else class="go_to" to="/articles">
              <div class="thats_all-text">
                For now that's all !
                <br />
                Go to Articles ?
              </div>
            </nuxt-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ContentList from '@/components/Content/ContentList'
import createIcon from '@/utils/createIcon'
import Panel from '@/components/Panel/Panel.vue'
import { EventBus } from '@/boot/EventBus'
import { mapGetters } from 'vuex'
import Card from '~/components/PageCard/Card.vue'

export default {
  components: { ContentList, Panel, Card },
  data() {
    return {
      data: [],
      news: [],
      isLoading: true,
      content: [],
      sort: ['Recent', 'Most views', 'Top'],
      currentSort: 'Recent',
      page_info: {
        title: 'News',
        description:
          'Major events around the global IT industry. Only the freshest and most valuable information.',
        image: require('~/static/img/img-layouts/namroud-gorguis.jpg')
      },
      pageNumber: 1,
      size: 10,
      isLoading: true,
      showBtn: true,
      news: []
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getAllNews'])
  },
  mounted() {
    this.$store.dispatch('allNews').then(res => {
      if (res.length) {
        this.data = this.getAllNews
        let categoryIcon = null
        for (let i = 0; i < this.data.length; i++) {
          categoryIcon = createIcon.makeNews()
          this.data[i].icon = categoryIcon
        }
        this.isLoading = false
        this.paginatedData()
      } else {
        this.showBtn = false
      }
    })

    setTimeout(() => {
      this.data.forEach(element => {
        switch (element.category) {
          case 'Programming':
            this.icon = createIcon.makeProgramming()
            break
          case 'Design':
            this.icon = createIcon.makeDesign()
            break
          case 'Technology':
            this.icon = createIcon.makeTechnology()
            break
          case 'Blog':
            this.icon = createIcon.makeBlog()
            break
          case 'News':
            this.icon = createIcon.makeNews()
            break
          default:
            return ''
        }
      })
    }, 500)
    EventBus.$on('search-post', this.searchAricles)
    EventBus.$on('sort-by', this.sortBy)
    this.$store.dispatch('loading', false)
  },
  methods: {
    sortBy(value) {
      let arr = this.posts.slice()
      if (value === 'Top') {
        this.currentSort = value
        arr.sort((a, b) => {
          return b.likes_count.count - a.likes_count.count
        })
      } else if (value === 'Most views') {
        this.currentSort = value
        arr.sort((a, b) => {
          return b.views - a.views
        })
      } else {
        this.currentSort = value
        arr = this.getAllNews
      }
      this.data = arr
      this.paginatedData()
    },
    showMore() {
      this.pageNumber++
      this.paginatedData()
    },
    paginatedData() {
      if (this.isLoading) return
      const start = 0
      this.posts = this.data
      const end = this.pageNumber * this.size
      const paginatedData = this.posts.slice(start, end)
      if (paginatedData.length == this.data.length) {
        this.showBtn = false
      }
      this.news = paginatedData
    },
    searchAricles(words) {
      let news = null
      news = this.$store.getters.getAllNews
      const foundPosts = news.filter(post => {
        return post.title.toLowerCase().includes(words)
      })
      const end = this.pageNumber * this.size
      this.news = foundPosts.slice(0, end)
    }
  }
}
</script>
