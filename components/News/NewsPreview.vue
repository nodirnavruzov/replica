<template>
  <div class="news__preview-container">
    <div class="news__preview-header">
      <div class="news__preview-header-left">
        <nuxt-link class="link_hover" to="">
          <img
            src="~static/img/img-layouts/finance.svg"
            width="25"
            alt=""
            class="news__review-category__icon"
        /></nuxt-link>
        <p class="news__preview-info category">
          <nuxt-link class="link_hover" to=""> {{ news.category }}</nuxt-link>
        </p>
        <p class="news__preview-info author">
          <nuxt-link class="link_hover" to=""> {{ news.author }}</nuxt-link>
        </p>
      </div>
      <div class="news__preview-header-right">
        <p class="news__preview-info date">{{ news.date }}</p>
      </div>
    </div>
    <div v-if="news.img" class="news__preview-image">
      <nuxt-link class="link link-to-content" to="">
        <img :src="news.img" alt="" class="news__preview-small_img" />
      </nuxt-link>
    </div>
    <div class="news__preview-content">
      <nuxt-link class="link" to="">
        <h5>{{ news.title }}</h5>
        <p>{{ news.descr }}</p>
      </nuxt-link>
    </div>

    <div class="news__preview-footer">
      <div class="news__preview-state-left">
        <div class="news__state-view">
          <img width="20" src="~static/img/img-layouts/eye.svg" alt="" />
          <span class="top_view">201</span>
        </div>
        <div class="news__state-comment">
          <img width="20" src="~static/img/img-layouts/comment.svg" alt="" />
          <span class="top_comment">176</span>
        </div>
      </div>
      <div class="news__preview-state-right">
        <div class="news-like">
          <img width="25" src="~static/img/img-layouts/like.svg" alt="" />
        </div>
        <div class="news-bookmark">
          <img width="25" src="~static/img/img-layouts/bookmark.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPreview",
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>