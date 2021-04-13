<template>
  <NewsList :news="articlesLoaded" />
</template>

<script>
import NewsList from "@/components/News/NewsList";
export default {
  components: { NewsList },

  computed: {
    articlesLoaded() {
      return this.$store.getters.getArticles;
    },
  },
};
</script>

