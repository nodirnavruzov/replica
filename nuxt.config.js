export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front-end',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/scss/styles.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-editor.js',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  //
  modules: ['nuxt-client-init-module', 'bootstrap-vue/nuxt', '@nuxtjs/axios'],
  bootstrapVue: {
    components: [
      'b-button',
      'b-form-input',
      'b-avatar',
      'BContainer',
      'BRow',
      'BCol',
      'BCard',
      'BIcon',
      'BIconPersonCircle',
      'BIconChat',
      'BIconEyeFill',
      'BIconEye',
      'BIconShare',
      'BIconBookmark',
      'BIconBookmarkFill',
      'BIconGraphUp',
      'BIconInstagram',
      'BIconFacebook',
      'BIconGithub',
      'BIconLinkedin',
      'BIconGearFill',
      'BIconVectorPen',
      'BIconTypeBold',
      'BIconTypeItalic',
      'BIconTypeStrikethrough',
      'BIconParagraph',
      'BIconListUl',
      'BIconListOl',
      'BIconListTask',
      'BIconCodeSlash',
      'BIconBlockquoteLeft',
      'BIconDistributeVertical',
      'BIconFileBreak',
      'BIconBlockquoteLeft',
      'BIconImageFill',
      'BIconNewspaper',
      'BDropdown',
      'BDropdownItem',
      'BFormTextarea',
      'BModal',
      'BAlert'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,

  },

  proxy: {
    '/api/': {
      target: 'http://localhost:3000/api/',
      pathRewrite: { '^/api/': '' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    linkActiveClass: 'your-custom-active-link',
    linkExactActiveClass: 'your-custom-exact-active-link'
  },

  server: {
    port: 8080, // default: 3000
    timing: false
  }
}
