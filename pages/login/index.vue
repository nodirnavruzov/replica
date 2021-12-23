<template>
  <form-login @login="onSubmit"/>
</template>


<script>
import {  mapGetters } from 'vuex'

export default {
  name: 'Login',
  metaInfo: { title: 'Sign in to Replica' },
  data () {
    return {
      loading: false,
      password: true
    }
  },
  computed: {
    ...mapGetters({
      getVerifyState: 'getVerifyState',
      getLoginState: 'getLoginState'
    })
  },
  destroyed () {
    this.loading = false
  },
  methods: {
    onSubmit (form) {
      try {
        this.loading = true
        this.$store.dispatch('login', form).then(res => {
          if (res.status && this.getVerifyState) {
            this.$router.push('/news')
          } else if (res.status && !this.getVerifyState){
            this.$store.dispatch('sendVerifyEmail', form)
            this.$router.push({path: '/verify', query: {email: form.email}})
          }
        })
      } catch (e) {
        this.loading = false
      }

    }
  }
}
</script>
