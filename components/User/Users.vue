<template>
  <b-container class="user_card">
    <b-row>
      <b-col md="3">
        <b-avatar :src="user.avatar ? user.avatar : none" rounded="sm" size="15rem" class="personal-avatar">
        </b-avatar>
      </b-col>
      <b-col md="5" class="col_user-info">
        <h2 class="user_name">{{ user.firstname }} {{ user.lastname }}</h2>
        <div class="registered mt-2">
          <p class="registered_title">On Project</p>
          &#9679;
          <p class="registered_text">{{ user.registration_date }}</p>
        </div>
        <div class="post_count mt-2">
          <p class="posts_count_title">Articles</p>
          &#9679;
          <p class="posts_count_text">
            {{ user.post_count }}
          </p>
        </div>
        <div class="votes mt-2">
          <p class="votes_text" :class="{ countGreen: user.likes_count.inc, countRed: user.likes_count.dec }">
            <span class="plus" v-if="user.likes_count.inc">+</span>{{ user.likes_count.count }}
          </p>
        </div>
      </b-col>
      <b-col md="4" class="person">
        <div class="user_right"></div>
      </b-col>
    </b-row>

    <div class="user_articles">
      <b-container>
        <b-row class="user_articles-row">
          <b-col md="12" class="p-0">
            <div class="border-bottom mt-4 mb-4"></div>
          </b-col>
          <b-col md="8" class="user_articles-container">
            <ContentPreview :content="c" v-for="c in content.data" :key="c.id" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>

export default {
  name: 'Users',
  props: ['user', 'content'],
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      none: '',
    }
  },
}
</script>