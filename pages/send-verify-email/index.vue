<template>
  <form-email-send @send="onSubmit"/>
</template>

<script>
export default {
  methods: {
    onSubmit (form) {
      try {
        this.loading = true
        this.$store.dispatch('sendVerifyEmail', form).then(res => {
          // this.loading = false
          // this.$router.push('/')
        })
      } catch (e) {
        this.loading = false
      }
    }
  },
}
</script>

<style>

</style>