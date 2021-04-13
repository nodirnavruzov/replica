<template>
  <div class="container">
    <div class="row">
      <div class="news__container col-md-8">
        <div class="news__filter-wrap"></div>
        <NewsPreview v-for="nw in news" :key="nw.id" :news="nw"> </NewsPreview>
      </div>
    </div>
  </div>
</template>

<script>
import NewsPreview from "~/components/News/NewsPreview";

export default {
  components: { NewsPreview },

  props: {
    news: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>