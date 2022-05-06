export default {
  name: 'cLogin',
  data() {
    return {
      open: false,
      name: `paperhsiao`,
      email: `paper.hsiao@gmail.com`,
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

      console.log(`onLogin / name: ${this.name} / email: ${this.email}`)
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
