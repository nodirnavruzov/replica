<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col md="8" class="about_page-col">
        <h1 class="about_title">About Project</h1>
        <p class="about_text">
          We are glad to see you in our cozy edition! Here we talk about the most relevant news from the IT
          world. Western and domestic news, history of startups, joint study of unique technologies, from
          programming to artificial intelligence - faster than many and more convenient for everyone, only
          here! Welcome!
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('loading', false)
  }
}
</script>
<style lang="scss" scoped>
.justify-content-md-center {
  margin: 125px 0;
}
.about_page-col {
  .about_title {
    color: #5e646e;
    text-align: center;
  }
  .about_text {
    color: #8d99ae;
    margin-top: 50px;
    font-weight: 500;
    font-size: 25px;
  }
}
</style>

