import Configure from './assets/js/utils/Configure'

export default {
  head: {
    title: '',
    htmlAttrs: {
      lang: 'zh-tw',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['swiper/swiper-bundle.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-awesome-swiper.js',
      ssr: false,
    },
    {
      src: '~/plugins/rwd.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
    'nuxt-gsap-module',
    ['@nuxtjs/dotenv', { filename: '.env.' + process.env.ENV }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  googleFonts: {
    families: {
      'Oleo+Script+Swash+Caps': [400, 700],
      // 'Noto+Sans+TC': [400, 500, 700],
    },
  },

  styleResources: {
    scss: [
      '~/assets/scss/_config.scss',
      '~/assets/scss/_mixin.scss',
      '~/assets/scss/_function.scss',
      '~/assets/scss/_keyframe.scss',
    ],
  },

  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true,
    },
  },

  axios: {
    // proxy: true
    baseURL: Configure.SERVER_URL,
  },
}
