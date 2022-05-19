export default {
  name: 'cLogin',
  data() {
    return {
      eye: {
        imgUrl: require(`~/assets/images/login/pic-eyes-01.png`),
        imgUrl_m: require(`~/assets/images/login/pic-eyes-01.png`),
        alt: `pic-eyes-01`,
      },
      textLogin: {
        imgUrl: require(`~/assets/images/login/pic-text-01.png`),
        imgUrl_m: require(`~/assets/images/login/pic-text-01.png`),
        alt: `pic-text-01`,
      },
      textLogin2: {
        imgUrl: require(`~/assets/images/login/pic-text-02.png`),
        imgUrl_m: require(`~/assets/images/login/pic-text-02.png`),
        alt: `pic-text-02`,
      },
      open: false,
      name: ``,
      email: ``,
    }
  },
  computed: {
    _classRoot() {
      return {
        'pointer-events-auto': this.open,
        'opacity-1': this.open,
      }
    },
  },
  created() {
    this.$nuxt.$on('Login:Open', () => {
      this.open = true
    })

    this.$nuxt.$on('Login:Close', () => {
      this.open = false
    })
  },

  mounted() {},
  methods: {
    onLogin(e) {
      e.preventDefault()

      if (!this.name) {
        return
      }

      if (!this.email) {
        return
      }

      this.$nuxt.$emit('API:LoginHandler', {
        name: this.name,
        email: this.email,
      })
    },
  },
}
