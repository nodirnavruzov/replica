<template>
  <form-register @register="onSubmit"/>
</template>

<script>
export default {
  methods: {
    onSubmit (form) {
      try {
        this.$store.dispatch('REGISTER', form).then(res => {
          if (res.status) {
            this.$router.push('/verify')
          } else {
            this.loading = false
          }
        })
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>