<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/System/Header'
import Footer from '@/components/System/Footer'
export default {
  components: { Header, Footer }
}
</script>
