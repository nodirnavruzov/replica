<template>
  <form-email-send @send="onSubmit"/>
</template>

<script>
export default {
  methods: {
    // need refactor
    onSubmit (form) {
      try {
        this.loading = true
        console.log('sendResetEmail', form)
        this.$store.dispatch('sendResetEmail', form).then(res => {
          if (res.status) {
            this.$router.push('/login')
          } else {
            this.$router.push('/reset-password')
          }
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