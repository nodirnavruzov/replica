<template>
  <b-col md="12">
    <img class="page__card-img" :src="info.image" alt="no photo" />
    <div class="page__card-content">
      <div class="category-header">
        <h5 class="category">{{ info.title }}</h5>
      </div>
      <p class="category-description">{{ info.description }}</p>
    </div>
  </b-col>
</template>

<script>
export default {
  props: ['info'],
  mounted() {}
}
</script>

<style>
</style>