<template>
  <form-reset-password :data="data" @reset="onSubmit"/>
</template>


<script>
import axios from 'axios'
export default {
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    console.log('token', params)
    
    let { data } = await axios.get(`/api/auth/check-reset-token/${params.token}`)
    if (data.email) {
      return { data }
    } else {
      error()
    }
  },
  methods: {
    onSubmit (form) {
      console.log('form', form)
      
      try {
        this.$store.dispatch('resetPassword', form).then(res => {
          console.log('reset-password', res)
        })
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

