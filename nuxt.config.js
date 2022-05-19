import Configure from './assets/js/utils/Configure'

const TITLE = 'Curiosity'
const DESCRIPTION =
  '經歷過隕石亂流的飛行家，阿德瓦。某一天，他持續著日常的飛行練習，突然！他發現了一座，看起來很好玩、很有趣的島嶼，似乎藏著很多神秘的寶物，於是他決定下降停留於這座島嶼上，一⋯⋯探⋯⋯究⋯⋯竟⋯⋯'
const KEY = 'Curiosity, web game'
const WEBSITE_URL = 'https://spring-wine.stackergames.org/'
const IMAGE_URL = 'https://spring-wine.stackergames.org/ogshare.jpg'

export default {
  head: {
    title: TITLE,
    htmlAttrs: {
      lang: 'zh_tw',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION,
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'keyword',
        name: 'keyword',
        content: KEY,
      },
      {
        property: 'og:title',
        content: TITLE,
      },
      {
        property: 'og:description',
        content: DESCRIPTION,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: TITLE,
      },
      {
        property: 'og:image',
        content: IMAGE_URL,
      },
      {
        property: 'og:url',
        content: WEBSITE_URL,
      },
      {
        property: 'og:locale',
        content: 'zh_tw',
      },

      // twitter
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:url',
        content: WEBSITE_URL,
      },
      {
        name: 'twitter:title',
        content: TITLE,
      },
      {
        name: 'twitter:description',
        content: DESCRIPTION,
      },
      {
        name: 'twitter:image',
        content: IMAGE_URL,
      },
      {
        name: 'twitter:image:alt',
        content: DESCRIPTION,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
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
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },

  googleFonts: {
    families: {
      'Oleo+Script': [400, 700],
      'Noto+Sans+TC': [400, 500, 700],
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
