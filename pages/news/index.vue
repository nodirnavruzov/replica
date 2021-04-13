<template>
  <div class="wrapper">
    <NewsList :news="newsLoaded" />
  </div>
</template>

<script>
import NewsList from "@/components/News/NewsList";
export default {
  components: { NewsList },

  computed: {
    newsLoaded() {
      return this.$store.getters.getNews;
    },
  },
};
</script>
