<template>
  <b-container class="container__content" fluid="md">
    <b-row class="justify-content-md-center">
      <b-col md="10" class="content__wrapper">
        <div class="bc">
          <div class="content__header">
            <div class="content__info">
              <div class="content__info-left">
                <nuxt-link class="link_hover" to="" v-html="content.icon"> </nuxt-link>
                <p class="content-info category">
                  <nuxt-link class="link_no-hover" to="">{{ content.category }}</nuxt-link>
                </p>
                <nuxt-link class="link_no-hover content-info author" :to="userLink">
                  <b-avatar
                    class="news__preview-avatar"
                    size="40"
                    :src="content.avatar ? content.avatar : ''"
                  ></b-avatar>
                  <nuxt-link class="link_no-hover content_user-name" :to="userLink">
                    {{ content.author.firstname }} {{ content.author.lastname }}</nuxt-link
                  >
                </nuxt-link>
              </div>
              <div class="content__info-right">
                <p class="content-info date">{{ content.date }}</p>
              </div>
            </div>
            <h1>
              {{ content.title }}
            </h1>
            <p class="content__header-descr mt-3"></p>
            <div class="content__state-footer">
              <div class="content__state-left">
                <div class="content__state-view">
                  <b-icon icon="eye-fill" font-scale="1.5" aria-hidden="true"></b-icon>
                  <span class="top_view">{{ content.views }}</span>
                </div>
              </div>

              <div class="content__state-right">
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
                  <b-icon v-if="status" icon="bookmark-fill" aria-hidden="true" font-scale="1.3"></b-icon>
                  <b-icon v-else icon="bookmark" font-scale="1.3"></b-icon>
                </div>
              </div>
            </div>
          </div>

          <div class="content__content" v-html="content.post"></div>
        </div>
      </b-col>
    </b-row>
    <b-modal class="modal" ref="my-modal" hide-footer title="Hey Bro 👋">
      <div class="d-block text-center">
        <h3>{{ modalText }} 😉</h3>
      </div>
      <b-button class="mt-3" variant="outline-dark" block @click="goTo()">Go to Login Page</b-button>
      <b-button class="mt-3" variant="outline-dark" block @click="hideModal">Not now</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['content'],
  data() {
    return {
      status: null,
      modalText: '',
      likes: this.content.likes_count,
      isActiveLike: null,
      isActiveDislike: null
    }
  },
  computed: {
    userLink() {
      return `/personal-page/user/${this.content.author.firstname }-${this.content.user_id}`
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
        this.modalText = 'To vote you need to log into your account!'
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
      if (this.GET_USER) {
        const ides = {
          post_id: this.content.id,
          user_id: this.GET_USER.id
        }
        let check_save = await this.$store.dispatch('CHECK_SAVED_POSTS', ides)
        let content_likes = await this.$store.dispatch('CONTENT_LIKES', ides.post_id)
        
        this.likes = content_likes[0].likes_count

        this.status = check_save
      }
    },
    async savePost() {
      if (this.GET_LOGIN_STATE) {
        const ides = {
          post_id: this.content.id,
          user_id: this.GET_USER.id
        }
        const res = await this.$store.dispatch('SAVE_POST', ides)
        this.getCheck()
      } else {
        this.modalText = 'To save you need to login!'
        this.showModal()
      }
    }
  },
  mounted() {
    console.log('content', this.content)
    
    this.user_likes()
    this.getCheck()
  }
}
</script>
