<template>
  <div>
    <b-container>
      <b-col md="12">
        <div class="wrapper_error-page">
          <h1 v-if="error.statusCode === 404">Page not found</h1>
          <h1 v-else>An error occurred</h1>
          <NuxtLink to="/">Home page</NuxtLink>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>

<style lang="scss">
.wrapper_error-page {
  justify-content: center;

  h1 {
    text-align: center;
  }
}
</style>