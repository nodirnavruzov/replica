<template>
  <div>
    <b-container class="wrapper__page-card mt-2 mb-4">
      <Card :info="page_info" />
    </b-container>
    <template v-if="!isLoading">
      <Panel :categories="categories" :sortBy="sort" />
    </template>
    <div class="wrapper_articles-page_content-list">
      <ContentList :news="art" :user="user" />
    </div>
    <b-container v-if="!isLoading">
      <b-row class="row__show-more justify-content-md-center">
        <b-col md="8">
          <div class="wrapper">
            <div v-if="showBtn" class="btn-showmore" @click="showMore()">Show more</div>
            <nuxt-link v-else class="go_to" to="/news">
              <div class="thats_all-text">
                {{ thatsAllText }}
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
import { EventBus } from '@/boot/EventBus'
import Card from '~/components/PageCard/Card.vue'
import Panel from '@/components/Panel/Panel.vue'
import createIcon from '~/utils/createIcon'
import { mapGetters } from 'vuex'

export default {
  components: { ContentList, Card, Panel },
  data() {
    return {
      user: {},
      data: [],
      posts: [],
      categories: ['All', 'Blog', 'Technology', 'Design', 'Programming'],
      currentCategory: 'All',
      sort: ['Recent', 'Most views', 'Top'],
      currentSort: 'Recent',
      page_info: {
        title: 'Articles',
        description:
          'Copyright materials from the editor. Your opinion, your analytics, your forecasts. Collaboration with market experts.',
        image: require('~/static/img/img-layouts/namroud-gorguis.jpg')
      },
      thatsAllText: `For now that's all ! Go to News ?`,
      pageNumber: 1,
      size: 2,
      showBtn: true,
      isLoading: true,
      art: []
    }
  },
  computed: {
    ...mapGetters(['GET_USER', 'GET_ALL_ARTICLES'])
  },
  mounted() {
    this.user = this.GET_USER
    this.$store.dispatch('ALL_ARTICLES').then(res => {
      this.data = res
      let categoryIcon = null
      for (let i = 0; i < this.data.length; i++) {
        const article = this.data[i]
        switch (article.category) {
          case 'Blog':
            categoryIcon = createIcon.makeBlog()
            this.data[i].icon = categoryIcon
            break
          case 'Technology':
            categoryIcon = createIcon.makeTechnology()
            this.data[i].icon = categoryIcon
            break
          case 'Design':
            categoryIcon = createIcon.makeDesign()
            this.data[i].icon = categoryIcon
            break
          case 'Programming':
            categoryIcon = createIcon.makeProgramming()
            this.data[i].icon = categoryIcon
            break
        }
      }
      this.isLoading = false
      this.paginatedData()
    })
    EventBus.$on('select-category', this.sortCategory)
    EventBus.$on('search-post', this.searchAricles)
    EventBus.$on('sort-by', this.sortBy)
    this.$store.dispatch('LOADING', false)
  },

  methods: {
    sortBy(value) {
      let arr = this.posts.slice()
      if (value === 'Top') {
        this.currentSort = value
        arr.sort((a, b) => {
          return b.likes_count - a.likes_count
        })
      } else if (value === 'Most views') {
        this.currentSort = value
        arr.sort((a, b) => {
          return b.views - a.views
        })
      } else {
        this.currentSort = value
        arr = this.GET_ALL_ARTICLES
      }
      this.data = arr
      this.paginatedData()
    },

    showMore() {
      this.pageNumber++
      this.sortCategory(this.currentCategory)
    },

    paginatedData() {
      if (this.isLoading) return
      const start = 0
      this.posts = this.data
      const end = this.pageNumber * this.size
      const paginatedData = this.posts.slice(start, end)
      this.art = paginatedData
      if (paginatedData.length == this.data.length) {
        this.showBtn = false
      } else if (paginatedData.length != this.data.length) {
        this.showBtn = true
      }
    },

    sortCategory(category) {
      if (this.currentCategory !== category) {
        this.pageNumber = 1
        this.currentCategory = category
      }
      let articles = null
      if (category === 'All') {
        this.paginatedData()
      } else {
        articles = this.posts
        const filtered = articles.filter(post => post.category === category)
        const end = this.pageNumber * this.size
        this.art = filtered.slice(0, end)
        if (this.art.length == filtered.length) {
          this.showBtn = false
        } else if (this.art.length != filtered.length) {
          this.showBtn = true
        }
      }
    },

    searchAricles(words) {
      let articles = null
      articles = this.$store.getters.GET_ALL_ARTICLES
      const foundPosts = articles.filter(post => {
        return post.title.toLowerCase().includes(words)
      })
      const end = this.pageNumber * this.size
      this.art = foundPosts.slice(0, end)
    }
  }
}
</script>
