export default {
  name: 'cMessage',
  created() {
    this.$nuxt.$on('Message:Show', this.onShow)
  },
  data() {
    return {
      open: false,
      timeline: null,
      msg: {
        text: ``,
      },
    }
  },
  mounted() {},
  methods: {
    onShow(msg) {
      this.msg.text = msg
      this.onPlayShowAnim()
    },
    onPlayShowAnim() {
      const self = this
      const gsap = self.$gsap

      if (this.timeline !== null) {
        this.timeline.kill()
      }

      this.timeline = gsap
        .timeline()
        .fromTo(
          this.$refs['a-content'],
          {
            xPercent: 100,
            opacity: 0,
          },
          {
            xPercent: 0,

            opacity: 1,
            duration: 0.25,
          }
        )
        .fromTo(
          this.$refs['a-content'],
          {
            xPercent: 0,
            opacity: 1,
          },
          {
            xPercent: -50,
            delay: 2,
            opacity: 0,
            duration: 0.25,
          }
        )
    },
  },
}
