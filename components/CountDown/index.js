export default {
  name: 'cCountDown',
  data() {
    return {
      open: true,
      countDown: {
        animDuration: 1,
        defaultNumber: 3,
        number: 0,
      },
    }
  },
  computed: {
    _classCountDownWrap() {
      return {
        'opacity-1': this.open,
      }
    },
  },
  created() {
    this.$nuxt.$on('CountDown:onStart', this.onStart)
  },
  mounted() {
    this.onClose()
  },
  methods: {
    onStart() {
      this.open = true
      this.countDown.number = this.countDown.defaultNumber
      this.onCountDownAnim()
    },
    onCountDownAnim() {
      const self = this
      const gsap = self.$gsap

      gsap.timeline().fromTo(
        this.$refs['num-text'],
        {
          opacity: 0,
          scale: 0.25,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'power1.out',
          duration: self.countDown.animDuration,

          onComplete: () => {
            self.countDown.number -= 1
            if (self.countDown.number <= 0) {
              self.onCountDownDone()
            } else {
              self.onCountDownAnim()
            }
          },
        }
      )
    },
    onCountDownDone() {
      const self = this
      const gsap = self.$gsap
      self.countDown.number = `Let's go!`

      gsap.timeline().fromTo(
        this.$refs['num-text'],
        {
          opacity: 0,
          scale: 0.25,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
          duration: self.countDown.animDuration,

          onComplete: () => {
            self.onClose()
          },
        }
      )
    },
    onClose() {
      this.open = false
      this.$nuxt.$emit('Topic:onStart', this.onStart)

      // update the parameter of the game start of store.js
      this.$store.dispatch('status/updateGameStart', {
        key: true,
      })
    },
  },
}
