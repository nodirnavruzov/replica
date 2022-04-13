import moment from 'moment'
export const state = () => ({
  allPosts: [],
  news: [],
  articles: [],
  user_posts: [],
  saved_posts: [],
  saved_posts_id: [],
  loading: true,
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') || null,
  auth_state: false,
  verify_state: false,
  selected_category: null,
  user_articles_or_bookmark: null
})

export const mutations = {
  setAllPosts(state, posts) {
    state.allPosts = posts
  },
  setNews(state, news) {
    state.news = news
  },
  setArticles(state, articles) {
    state.articles = articles
  },
  setUserPosts(state, posts) {
    state.user_posts = posts
  },
  setUser(state, user) {
    const currUser = user
    const formatedDate = currUser.registration_date.slice(0, 10)
    user.registration_date = formatedDate
    state.user = user
  },
  setLoading(state, status) {
    state.loading = status
  },
  setLoginState(state, auth_state) {
    state.auth_state = auth_state
    if (!auth_state) {
      state.user = null
    }
  },
  set_verify_state(state, verify) {
    state.verify_state = verify
  },
  setToken(state, token) {
    state.token = token
  },
  setSelectedCategory(state, category) {
    state.selected_category = category
  },
  setSortCategory(state, category) {
    const sorted = state.articles.filter(article => {
      return article.category === category
    })
    state.article = sorted
    console.log(state.article)
  },

  setUserSavedPosts(state, posts) {
    state.saved_posts = posts
  },

  setSavePost(state, id) {
    state.saved_posts_id.push(id)
  },

  removeSavedPost(state, id) {
    const post_id = state.saved_posts_id
    state.saved_posts_id = post_id.filter(post_id => post_id != id)
  },

  setStateUserArticlesOrBookmark(state, event_name) {
    state.user_articles_or_bookmark = event_name
  }
}

export const actions = {
  // need refactor
  async nuxtClientInit({ commit, getters }) {
    const userId = getters.getUser?.id
    const token = localStorage.getItem('token')
    if (getters.getUser) {
      await this.$axios
        .$get(`/api/user/get-user/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          commit('setLoginState', true)
          commit('setUser', res)
        })
        .catch(err => {
          console.error(err)
          commit('setLoginState', false)
        })
    } else {
      commit('setLoginState', false)
    }
  },

  async register({ commit }, user) {
    return await this.$axios.$post(`/api/auth/register`, { ...user }).then(res => {
      return res
    }).catch(err => console.log('error', err)
    )
  },

  async login({ commit }, user) {
    return await this.$axios.$post(`/api/auth/login`, { ...user })
      .then(res => {
        if (res.status && res.verify) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))
          commit('setUser', res.user)
          commit('setToken', res.token)
          commit('setLoginState', true)
          commit('set_verify_state', true)
        } else if (!res.verify && res.status) {
          commit('set_verify_state', false)
        } else if (!res.status) {
          commit('setLoginState', false)
        }
        return res
      })
      .catch(err => {
        commit('setLoginState', false)
        return { status: false, message: 'Password or email is wrong, try again' }
      })
  },

  async updateUser({ commit, getters }) {
    const token = getters.getUserToken
    return await this.$axios.$get(`/api/user/upadated-user/${getters.getUser.id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        commit('setUser', res[0])
        return res[0]
      })
  },

  loginState({ commit }, auth_state) {
    commit('setLoginState', auth_state)
  },

  loading({ commit }, status) {
    commit('setLoading', status)
  },

  // Send Content to DB
  async sendContent({ commit, state }, post) {
    let token = state.token
    return await this.$axios.$post(`/api/content/add-posts`, post, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.status) {
          const u = res.user[0]
          localStorage.setItem('user', JSON.stringify(u))
          return true
        }
      })
  },

  // Get all content
  // Not used
  // async ALL_POSTS({ commit }) {
  //   return await axios
  //     .get('/api/content/all-posts')
  //     .then(res => {
  //       commit('setAllPosts', res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },

  async allNews({ commit }) {
    return await this.$axios.$get(`/api/content/all-news`)
      .then(res => {
        const allNews = []
        for (const iterator of res) {
          const element = iterator
          let dateNow = moment(new Date(), 'DD-MM-YYYY HH:mm')
          let postDate = moment(element.date, 'DD-MM-YYYY HH:mm')
          let result = dateNow.diff(postDate, 'hours')
          if (result < 6) {
            const relativeTime = moment(element.date, 'DD-MM-YYYY HH:mm').fromNow()
            element.date = relativeTime
            allNews.push(element)
          } else {
            allNews.push(element)
          }
        }
        commit('setNews', allNews)
        return allNews
      })
      .catch(err => {
        console.log(err)
      })
  },

  async allArticles({ commit }, value) {
    return await this.$axios.$get(`/api/content/all-articles`)
      .then(res => {
        const allArticles = []
        for (const iterator of res) {
          const element = iterator
          let dateNow = moment(new Date(), 'DD-MM-YYYY HH:mm')
          let postDate = moment(element.date, 'DD-MM-YYYY HH:mm')
          let result = dateNow.diff(postDate, 'hours')
          if (result < 6) {
            const relativeTime = moment(element.date, 'DD-MM-YYYY HH:mm').fromNow()
            element.date = relativeTime
            allArticles.push(element)
          } else {
            allArticles.push(element)
          }
        }
        commit('setArticles', allArticles)
        return allArticles
      })
      .catch(err => {
        console.log(err)
      })
  },

  async userPosts({ commit }, user_id) {
    return await this.$axios.$get(`/api/content/user-posts`, { params: { user_id } })
      .then(posts => {
        commit('setUserPosts', posts)
        return posts
      })
  },

  selectedCategory({ commit }, category) {
    commit('setSelectedCategory', category)
  },

  sortCategory({ commit }, category) {
    commit('setSortCategory', category)
  },

  async checkUser({ commit }, id) {
    const token = localStorage.getItem('token')
    return await this.$axios.$get(`/api/user/get-user/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        commit('setLoginState', true)
        return true
      })
      .catch(err => {
        commit('setLoginState', false)
        return false
      })
  },

  async savePost({ commit, state }, ides) {
    return await this.$axios.$post(`/api/content/save-post`, ides, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        if (res.message === 'deleted') {
          commit('removeSavedPost', res.post_id)
          return res
        } else if (res.message === 'added') {
          commit('setSavePost', res.post_id)
          return res
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  async savedPosts({ commit }, user_id) {
    return await this.$axios.$get(`/api/content/user-bookmark`, { params: { user_id } })
      .then(res => {
        commit('setUserSavedPosts', res)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  },

  async checkSavedPosts({ commit }, ides) {
    return await this.$axios.$post(`/api/content/check-saved-posts`, ides)
      .then(res => {
        return res.status
      })
      .catch(err => console.log(err))
  },

  userArticlesOrBookmark({ commit }, event_name) {
    commit('setStateUserArticlesOrBookmark', event_name)
  },

  async changeSettings({ commit, state }, user_info) {
    return await this.$axios.$post(`/api/user/change-settings`, user_info, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        return res
      })
      .catch(err => console.log(err))
  },

  async changePassword({ commit, state }, user_info) {
    return await this.$axios.$post(`/api/user/change-password`, user_info, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        return res
      })
      .catch(err => console.log(err))
  },

  async uploadAvatar({ commit, getters }, file) {
    return await this.$axios.$post(`/api/user/upload-avatar`, file, {
        headers: {
          Authorization: 'Bearer ' + getters.getUserToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        return response
      })
      .catch(err => console.log(err))
  },

  async removeAvatar({ commit }, user) {
    return await this.$axios
      .$delete(`/api/user/remove-avatar`, {
        params: { id: user.id }
      })
      .then(result => {
        return result
      })
      .catch(err => { console.log('Error', err)
      })
  },

  async addLike({ commit, state }, params) {
    return await this.$axios
      .$patch(`/api/content/content-like`, params, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(result => {})
      .catch(err => {
        console.log(err)
      })
  },

  async contentLikes({ commit, state }, post_id) {
    
    return await this.$axios.$get(`/api/content/get-content-likes-count`, { params: { post_id } })
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  },
  async userLikes({ commit, state }, params) {
    return await this.$axios.$get(`/api/content/get_user_likes`, {
        params: { user_id: params.user_id, post_id: params.post_id }
      })
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  },

  async sendResetEmail({ commit, state }, params) {
    return await this.$axios.$post('/api/auth/send-reset-email', params)
  },

  async resetPassword({ commit, state }, form) {
    return await this.$axios.$post('/api/auth/reset-password', form)
  },

  async sendVerifyEmail({ commit, state }, form) {
    return await this.$axios.$post('/api/auth/send-verify-email', form)
  },
  
  async verifyCode({ commit }, form) {
    return await this.$axios.$post(`/api/auth/verify-code`, { ...form }).then(res => {
      return res
    })
  },
}

export const getters = {
  getAllNews(state) {
    return state.news
  },
  getAllArticles(state) {
    return state.articles
  },
  // GET_ALL_CONTENT(state) {
  //   return state.allContent
  // },
  // GET_TREND_NEWS(state) {
  //   return state.trend
  // },
  getLoginState(state) {
    return state.auth_state
  },
  getUserToken(state) {
    return state.token
  },
  getUser(state) {
    if (typeof state.user === 'object') {
      return state.user
    } else if (typeof state.user === 'string') {
      return JSON.parse(state.user)
    } else {
      return {}
    }
  },
  getUserPosts(state) {
    return state.user_posts
  },
  // GET_SELECTED_CATEGORY(state) {
  //   return state.selected_category
  // },
  // GET_ALL_CARD_INFO(state) {
  //   return state.descr_name
  // },
  getUserArticlesOrBookmark(state) {
    return state.user_articles_or_bookmark
  },
  getSavedPostsIdes(state) {
    return state.saved_posts_id
  },
  getLoading(state) {
    return state.loading
  },
  getVerifyState(state) {
    return state.verify_state
  }
}
