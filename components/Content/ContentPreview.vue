<template>
  <div class="news__preview-container">
    <div class="news__preview-header">
      <div class="news__preview-header-left">
        <p v-html="content.icon"></p>
        <div class="newsPreview__info category">{{ content.category }}</div>
        <nuxt-link class="user__link" :to="userLink">
          <b-avatar
            class="news__preview-avatar"
            size="35"
            :src="content.avatar ? content.avatar : ''"
          ></b-avatar>
          <p class="newsPreview__info author">{{ content.author.firstname }} {{ content.author.lastname }}</p>
        </nuxt-link>
      </div>
      <div class="news__preview-header-right">
        <div class="newsPreview__info date">{{ content.date }}</div>
      </div>
    </div>

    <nuxt-link class="go_to_link" :to="getLink">
      <div class="news__preview-image" v-if="content.image_preview" v-html="content.image_preview"></div>
    </nuxt-link>

    <div class="news__preview-content">
      <nuxt-link class="link_no-hover title" :to="getLink" v-html="content.title" style="display: block"
        >{{ content.title }}
      </nuxt-link>
      <nuxt-link class="link_no-hover description" :to="getLink" v-html="content.description_preview">
      </nuxt-link>
    </div>

    <div class="news__preview-footer">
      <div class="news__preview-state-left">
        <div class="news__state-view">
          <b-icon icon="eye-fill" font-scale="1.5" aria-hidden="true"></b-icon>
          <span class="top_view">{{ content.views }}</span>
        </div>
      </div>

      <div class="news__preview-state-right">
        <div class="content-like">
          <div class="dislike" :class="{ disLikeSelected: isActiveDislike }" @click="vote('dislike')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </div>
          <div :class="{ countGreen: likes.inc, countRed: likes.dec }">
            <span class="plus" v-if="likes.inc">+</span>{{ likes.count }}
          </div>
          <div class="like" :class="{ likeSelected: isActiveLike }" @click="vote('like')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
            </svg>
          </div>
        </div>
        <div class="news-bookmark" @click="savePost()">
          <b-icon v-if="status" icon="bookmark-fill" font-scale="1.3"></b-icon>
          <b-icon v-else icon="bookmark" font-scale="1.3"></b-icon>
        </div>
      </div>
    </div>
    <b-modal class="modal" ref="my-modal" hide-footer title="Hey Bro 👋">
      <div class="d-block text-center">
        <h3>{{ modalText }} 😉</h3>
      </div>
      <b-button class="mt-3" variant="outline-dark" block @click="goTo()">Go to Login Page</b-button>
      <b-button class="mt-3" variant="outline-dark" block @click="hideModal">Not now</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContentPreview',
  props: ['content'],
  data() {
    return {
      status: null,
      likes: this.content.likes_count,
      modalText: '',
      isActiveLike: null,
      isActiveDislike: null
    }
  },
  computed: {
    getLink() {
      if (
        this.$router.history.current.fullPath != `/news/${this.content.id}` ||
        this.$router.history.current.fullPath != `/articles/${this.content.id}`
      ) {
        if (this.content.category == 'News') {
          return `/news/${this.content.id}`
        } else {
          return `/articles/${this.content.id}`
        }
      }
      // else {
      //   return `${this.$router.history.current.fullPath}/${this.content.id}`
      // }
    },
    userLink() {
      return `/personal-page/user/${this.content.name}-${this.content.user_id}`
    },
    ...mapGetters(['GET_USER', 'GET_LOGIN_STATE', 'GET_SAVED_POSTS_IDES'])
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    goTo() {
      this.$router.push('/login')
    },
    async user_likes() {
      if (!this.GET_LOGIN_STATE) return
      await this.$store
        .dispatch('USER_LIKES', {
          post_id: this.content.id,
          user_id: this.GET_USER.id
        })
        .then(response => {
          if (response.status == null) {
            this.isActiveLike = null
            this.isActiveDislike = null
          } else if (response.status == true) {
            this.isActiveLike = true
            this.isActiveDislike = null
          } else if (response.status == false) {
            this.isActiveLike = null
            this.isActiveDislike = true
          }
        })
    },
    async vote(eventName) {
      if (!this.GET_LOGIN_STATE) {
        this.modalText = 'To vote you need to login your account!'
        this.showModal()
        return
      }
      if (eventName == 'like') {
        await this.$store.dispatch('ADD_LIKE', {
          post_id: this.content.id,
          user_id: this.GET_USER.id,
          value: 'like'
        })
      } else if (eventName == 'dislike') {
        await this.$store.dispatch('ADD_LIKE', {
          post_id: this.content.id,
          user_id: this.GET_USER.id,
          value: 'dislike'
        })
      }
      this.user_likes()
      this.getCheck()
    },
    async getCheck() {
      const ides = {
        post_id: this.content.id
      }
      if (this.GET_LOGIN_STATE) {
        let check_save = await this.$store.dispatch('CHECK_SAVED_POSTS', {
          ...ides,
          user_id: this.GET_USER.id
        })
        this.status = check_save
      }
      let content_like = await this.$store.dispatch('CONTENT_LIKES', ides.post_id)
      
      this.likes = content_like[0].likes_count
    },
    async savePost() {
      if (this.GET_LOGIN_STATE) {
        const ides = {
          post_id: this.content.id,
          user_id: this.GET_USER.id
        }
        const res = await this.$store.dispatch('SAVE_POST', ides)
        console.log(res)
        this.getCheck()
      } else {
        this.modalText = 'To save you need to login!'
        this.showModal()
      }
    }
  },
  mounted() {
    this.user_likes()
    this.getCheck()
  }
}
</script>

<style lang="scss">
.modal-dialog {
  margin: 6.75rem auto !important;
}
</style>