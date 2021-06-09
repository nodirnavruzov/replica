<template>
  <div class="news-list-page">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="8" class="news__container">
          <ContentPreview :content="content" v-for="content in news" :key="content.id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ContentPreview from '~/components/Content/ContentPreview.vue'

export default {
  components: { ContentPreview },
  props: ['news']
}
</script>
