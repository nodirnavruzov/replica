<template>
  <b-container class="personal_card">
    <b-row>
      <b-col md="3">
        <b-avatar
          :src="userInfo.avatar ? userInfo.avatar : none"
          rounded="sm"
          size="15rem"
          class="personal-avatar"
        >
        </b-avatar>
      </b-col>
      <b-col md="5" class="col_user-info">
        <h2 class="user_name">{{ userInfo.firstname }} {{ userInfo.lastname }}</h2>
        <div class="registered mt-2">
          <p class="registered_title">On Project</p>
          &#9679;
          <p class="registered_text">{{ userInfo.registration_date }}</p>
        </div>
        <div class="post_count mt-2">
          <p class="posts_count_title">Articles</p>
          &#9679;
          <p class="posts_count_text">
            {{ userInfo.post_count }}
          </p>
        </div>
        <div class="votes mt-2" v-if="userInfo.likes_count">
          <p
            class="votes_text"
            :class="{ countGreen: userInfo.likes_count.inc, countRed: userInfo.likes_count.dec }"
          >
            <span class="plus" v-if="userInfo.likes_count.inc">+</span>{{ userInfo.likes_count.count }}
          </p>
        </div>
      </b-col>
      <b-col md="4" class="person">
        <div class="user_right">
          <div class="settings_btn_wrapper">
            <div class="settings" @click="goToSettings">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm2.595 7.812a3.51 3.51 0 0 1 0-1.623l-.992-.573 1-1.732.992.573A3.496 3.496 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573 1 1.732-.992.573a3.51 3.51 0 0 1 0 1.622l.992.573-1 1.732-.992-.573a3.496 3.496 0 0 1-1.405.812V22.5h-2v-1.145a3.496 3.496 0 0 1-1.405-.812l-.992.573-1-1.732.992-.572zM18 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                />
              </svg>
            </div>
          </div>
          <div class="write_btn_wrapper">
            <div class="write" @click="showEditor">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                />
              </svg>
              <p>Write Article</p>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="personal_card-footer mt-1">
        <div class="user_articles cp" @click="showUserArticles()">
          <div class="btn" :class="{ active: openUserArticles }">Articles</div>
        </div>
        <div class="user_articles cp" @click="showUserBookmark()">
          <div class="btn" :class="{ active: openUserSavedPosts }">Bookmark</div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <client-only v-show="openEditor" placeholder="Loading...">
        <b-col class="editor_wrapper" md="12" v-if="openEditor">
          <Editor />
        </b-col>
      </client-only>
    </b-row>
    <div class="news-list-page" v-if="openUserArticles">
      <b-container>
        <b-row class="user_articles-row">
          <b-col md="8" class="user_articles-container">
            <ContentPreview :content="c" v-for="c in content" :key="c.id" />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="news-list-page" v-if="openUserSavedPosts">
      <b-container>
        <b-row class="user_articles-row">
          <b-col md="8" class="user_articles-container">
            <ContentPreview :content="s" v-for="s in savedPosts" :key="s.id" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import Editor from '@/components/Editor/Editor.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Personal',
  components: { Editor },
  props: ['userInfo', 'content', 'savedPosts'],
  data() {
    return {
      openEditor: false,
      openUserArticles: false,
      openUserSavedPosts: false,
      none: ''
    }
  },
  created() {
    this.articlesOrBookmark()
  },
  watch: {
    GET_USER_ARTICLES_OR_BOOKMARK() {
      this.articlesOrBookmark()
    }
  },

  computed: {
    ...mapGetters(['GET_USER_ARTICLES_OR_BOOKMARK'])
  },
  mounted() {},
  methods: {
    showEditor() {
      if (this.openUserArticles === true || this.openUserSavedPosts === true) {
        this.openUserArticles = false
        this.openUserSavedPosts = false
      }
      this.openEditor = !this.openEditor
    },
    goToSettings() {
      const current_rout = this.$router.history.current.path
      this.$router.push(`${current_rout}/settings`)
    },
    showUserArticles() {
      if (this.openEditor === true || this.openUserSavedPosts === true) {
        this.openEditor = false
        this.openUserSavedPosts = false
      }
      this.openUserArticles = true
      this.$store.dispatch('USER_ARTICLES_OR_BOOKMARK', 'open-articles')
    },
    showUserBookmark() {
      if (this.openEditor === true || this.openUserArticles === true) {
        this.openEditor = false
        this.openUserArticles = false
      }
      this.openUserSavedPosts = true
      this.$store.dispatch('USER_ARTICLES_OR_BOOKMARK', 'open-bookmark')
    },
    articlesOrBookmark() {
      if (this.GET_USER_ARTICLES_OR_BOOKMARK == 'open-articles') {
        this.showUserArticles()
      } else if (this.GET_USER_ARTICLES_OR_BOOKMARK == 'open-bookmark') {
        this.showUserBookmark()
      }
    }
  }
}
</script>