<template>
  <form-verify :email="this.$router.currentRoute.query.email" @verify="onSubmit" @reSend="sendEmail"/>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onSubmit (form) {
      console.log('formV', form)
      
      try {
        this.loading = true
        this.$store.dispatch('verifyCode', form).then(res => {
          console.log('resV', res)
          
          if (res.status) {
            this.$router.push('/login')
          } else {
            this.loading = false
          }
        })
      } catch (e) {
        this.loading = false
      }
    },
    sendEmail(email) {
      this.$store.dispatch('sendVerifyEmail', { email })
    }
  }
}
</script>