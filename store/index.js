import moment from 'moment'
const url = 'http://localhost:3000/'
// const url = 'http://localhost:8080/'
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
  selected_category: null,
  user_articles_or_bookmark: null
})

export const mutations = {
  SET_ALL_POSTS(state, posts) {
    state.allPosts = posts
  },
  SET_NEWS(state, news) {
    state.news = news
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_USER_POSTS(state, posts) {
    state.user_posts = posts
  },
  SET_USER(state, user) {
    const currUser = user
    const formatedDate = currUser.registration_date.slice(0, 10)
    user.registration_date = formatedDate
    state.user = user
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_LOGIN_STATE(state, auth_state) {
    state.auth_state = auth_state
    if (!auth_state) {
      state.user = null
    }
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_SELECTED_CATEGORY(state, category) {
    state.selected_category = category
  },
  SET_SORT_CATEGORY(state, category) {
    const sorted = state.articles.filter(article => {
      return article.category === category
    })
    state.article = sorted
    console.log(state.article)
  },

  SET_USER_SAVED_POSTS(state, posts) {
    state.saved_posts = posts
  },

  SET_SAVE_POST(state, id) {
    state.saved_posts_id.push(id)
  },

  REMOVE_SAVED_POST(state, id) {
    const post_id = state.saved_posts_id
    state.saved_posts_id = post_id.filter(post_id => post_id != id)
  },

  SET_STATE_USER_ARTICLES_OR_BOOKMARK(state, event_name) {
    state.user_articles_or_bookmark = event_name
  }
}

export const actions = {
  async nuxtClientInit({ commit, getters }) {
    const token = localStorage.getItem('token')
    if (getters.GET_USER) {
      await this.$axios
        .$get(`/api/user/get-user/${getters.GET_USER.id}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          commit('SET_LOGIN_STATE', true)
          commit('SET_USER', res)
        })
        .catch(err => {
          console.log(err)
          commit('SET_LOGIN_STATE', false)
        })
    } else {
      commit('SET_LOGIN_STATE', false)
    }
  },

  async REGISTER({ commit }, user) {
    return await this.$axios.$post(`/api/auth/register`, { ...user }).then(res => {
      return res
    })
  },

  async LOG_IN({ commit }, user) {
    return await this.$axios.$post(`/api/auth/login`, { ...user })
      .then(res => {
        if (res.status) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user[0]))
          commit('SET_USER', res.user[0])
          commit('SET_TOKEN', res.token)
          commit('SET_LOGIN_STATE', true)
          return { status: true }
        }
      })
      .catch(err => {
        commit('SET_LOGIN_STATE', false)
        return { status: false, message: 'Password or email is wrong, try again' }
      })
  },

  async UPDATE_USER({ commit, getters }) {
    const token = getters.GET_USER_TOKEN
    return await this.$axios.$get(`/api/user/upadated-user/${getters.GET_USER.id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        commit('SET_USER', res[0])
        return res[0]
      })
  },

  LOGIN_STATE({ commit }, auth_state) {
    commit('SET_LOGIN_STATE', auth_state)
  },

  LOADING({ commit }, status) {
    commit('SET_LOADING', status)
  },

  // Send Content to DB
  async SEND_CONTENT({ commit, state }, post) {
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
  //       commit('SET_ALL_POSTS', res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },

  async ALL_NEWS({ commit }) {
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
        commit('SET_NEWS', allNews)
        return allNews
      })
      .catch(err => {
        console.log(err)
      })
  },

  async ALL_ARTICLES({ commit }, value) {
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
        commit('SET_ARTICLES', allArticles)
        return allArticles
      })
      .catch(err => {
        console.log(err)
      })
  },

  async USER_POSTS({ commit }, user_id) {
    return await this.$axios.$get(`/api/content/user-posts`, { params: { user_id } })
      .then(posts => {
        commit('SET_USER_POSTS', posts)
        return posts
      })
  },

  SELECTED_CATEGORY({ commit }, category) {
    commit('SET_SELECTED_CATEGORY', category)
  },

  SORT_CATEGORY({ commit }, category) {
    commit('SET_SORT_CATEGORY', category)
  },

  async CHECK_USER({ commit }, id) {
    const token = localStorage.getItem('token')
    return await this.$axios.$get(`/api/user/get-user/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        commit('SET_LOGIN_STATE', true)
        return true
      })
      .catch(err => {
        commit('SET_LOGIN_STATE', false)
        return false
      })
  },

  async SAVE_POST({ commit, state }, ides) {
    return await this.$axios.$post(`/api/content/save-post`, ides, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        if (res.message === 'deleted') {
          commit('REMOVE_SAVED_POST', res.post_id)
          return res
        } else if (res.message === 'added') {
          commit('SET_SAVE_POST', res.post_id)
          return res
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  async SAVED_POSTS({ commit }, user_id) {
    return await this.$axios.$get(`/api/content/user-bookmark`, { params: { user_id } })
      .then(res => {
        commit('SET_USER_SAVED_POSTS', res)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  },

  async CHECK_SAVED_POSTS({ commit }, ides) {
    return await this.$axios.$post(`/api/content/check-saved-posts`, ides)
      .then(res => {
        return res.status
      })
      .catch(err => console.log(err))
  },

  USER_ARTICLES_OR_BOOKMARK({ commit }, event_name) {
    commit('SET_STATE_USER_ARTICLES_OR_BOOKMARK', event_name)
  },

  async CHANGE_SETTINGS({ commit, state }, user_info) {
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

  async CHANGE_PASSWORD({ commit, state }, user_info) {
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

  async UPLOAD_AVATAR({ commit, getters }, file) {
    return await this.$axios.$post(`/api/user/upload-avatar`, file, {
        headers: {
          Authorization: 'Bearer ' + getters.GET_USER_TOKEN,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        return response
      })
      .catch(err => console.log(err))
  },

  async REMOVE_AVATAR({ commit }, user) {
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

  async ADD_LIKE({ commit, state }, params) {
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

  async CONTENT_LIKES({ commit, state }, post_id) {
    
    return await this.$axios.$get(`/api/content/get-content-likes-count`, { params: { post_id } })
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  },
  async USER_LIKES({ commit, state }, params) {
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

  async RESET_PASSWORD({ commit, state }, user) {
    return await this.$axios.$post(`/api/auth/reset-password`, user)
    .then(res => {
      return res
    }).catch(err => {
      console.error(err)
      return false
    })
  },
}

export const getters = {
  GET_ALL_NEWS(state) {
    return state.news
  },
  GET_ALL_ARTICLES(state) {
    return state.articles
  },
  GET_ALL_CONTENT(state) {
    return state.allContent
  },
  GET_TREND_NEWS(state) {
    return state.trend
  },
  GET_LOGIN_STATE(state) {
    return state.auth_state
  },
  GET_USER_TOKEN(state) {
    return state.token
  },
  GET_USER(state) {
    if (typeof state.user === 'object') {
      return state.user
    } else if (typeof state.user === 'string') {
      return JSON.parse(state.user)
    } else {
      return {}
    }
  },
  GET_USER_POSTS(state) {
    return state.user_posts
  },
  GET_SELECTED_CATEGORY(state) {
    return state.selected_category
  },
  GET_ALL_CARD_INFO(state) {
    return state.descr_name
  },
  GET_USER_ARTICLES_OR_BOOKMARK(state) {
    return state.user_articles_or_bookmark
  },
  GET_SAVED_POSTS_IDES(state) {
    return state.saved_posts_id
  },
  GET_LOADING(state) {
    return state.loading
  }
}
