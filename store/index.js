import axios from 'axios'
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
      await axios
        .get(`http://localhost:3000/api/user/get-user/${getters.GET_USER.id}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          console.log(res)
          commit('SET_LOGIN_STATE', true)
          commit('SET_USER', res.data)
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
    return await axios.post('http://localhost:3000/api/auth/register', { ...user }).then(res => {
      return res
    })
  },

  async LOG_IN({ commit }, user) {
    return await axios
      .post('http://localhost:3000/api/auth/login', { ...user })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user[0]))
          commit('SET_USER', res.data.user[0])
          commit('SET_TOKEN', res.data.token)
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
    return await axios
      .get(`http://localhost:3000/api/user/upadated-user/${getters.GET_USER.id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        commit('SET_USER', res.data[0])
        return res.data[0]
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
    return await axios
      .post('http://localhost:3000/api/content/add-posts', post, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.data.status) {
          const u = res.data.user[0]
          localStorage.setItem('user', JSON.stringify(u))
          return true
        }
      })
  },

  // Get all content
  // Not used
  // async ALL_POSTS({ commit }) {
  //   return await axios
  //     .get('http://localhost:3000/api/content/all-posts')
  //     .then(res => {
  //       commit('SET_ALL_POSTS', res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },

  async ALL_NEWS({ commit }) {
    return await axios
      .get('http://localhost:3000/api/content/all-news')
      .then(res => {
        const allNews = []
        for (const iterator of res.data) {
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
    return await axios
      .get('http://localhost:3000/api/content/all-articles')
      .then(res => {
        const allArticles = []
        console.log('all-articles', res)
        for (const iterator of res.data) {
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
    return await axios
      .get('http://localhost:3000/api/content/user-posts', { params: { user_id } })
      .then(posts => {
        commit('SET_USER_POSTS', posts.data)
        return posts.data
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
    return await axios
      .get(`http://localhost:3000/api/user/get-user/${id}`, {
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
    return await axios
      .post('http://localhost:3000/api/content/save-post', ides, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data.message === 'deleted') {
            commit('REMOVE_SAVED_POST', res.data.post_id)
            return res.data
          } else if (res.data.message === 'added') {
            commit('SET_SAVE_POST', res.data.post_id)
            return res.data
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  async SAVED_POSTS({ commit }, user_id) {
    return await axios
      .get('http://localhost:3000/api/content/user-bookmark', { params: { user_id } })
      .then(res => {
        commit('SET_USER_SAVED_POSTS', res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
  },

  async CHECK_SAVED_POSTS({ commit }, ides) {
    return await axios
      .post('http://localhost:3000/api/content/check-saved-posts', ides)
      .then(res => {
        return res.data.status
      })
      .catch(err => console.log(err))
  },

  USER_ARTICLES_OR_BOOKMARK({ commit }, event_name) {
    commit('SET_STATE_USER_ARTICLES_OR_BOOKMARK', event_name)
  },

  async CHANGE_SETTINGS({ commit, state }, user_info) {
    console.log(state.user)

    return await axios
      .post('http://localhost:3000/api/user/change-settings', user_info, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  },

  async CHANGE_PASSWORD({ commit, state }, user_info) {
    return await axios
      .post('http://localhost:3000/api/user/change-password', user_info, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  },

  async UPLOAD_AVATAR({ commit, getters }, file) {
    return await axios
      .post('http://localhost:3000/api/user/upload-avatar', file, {
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
    return await axios
      .delete('http://localhost:3000/api/user/remove-avatar', {
        params: { id: user.id }
      })
      .then(result => {
        return result.data
      })
      .catch(err => { })
  },

  async ADD_LIKE({ commit, state }, params) {
    console.log('params', params)
    return await axios
      .patch('http://localhost:3000/api/content/content-like', params, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then(result => {
        // console.log('result', result)
      })
      .catch(err => {
        console.log(err)
      })
  },

  async CONTENT_LIKES({ commit, state }, post_id) {
    return await axios
      .get('http://localhost:3000/api/content/get-content-likes-count', { params: { post_id } })
      .then(result => {
        return result.data[0]
      })
      .catch(err => {
        console.log(err)
      })
  },
  async USER_LIKES({ commit, state }, params) {
    return await axios
      .get('http://localhost:3000/api/content/get_user_likes', {
        params: { user_id: params.user_id, post_id: params.post_id }
      })
      .then(result => {
        return result.data
      })
      .catch(err => {
        console.log(err)
      })
  },

  async FORGOT_PASSWORD() {
    return await axios.get('http://localhost:3000/api/forgot/forgot-password')
      .then(res => {
        console.log(res)
      }).catch(err => console.log(err))
  }
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
