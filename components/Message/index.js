import { Maths } from '@paperhsiao/formula'

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
      textLibrary: [
        '你還在等什麼？',
        '這樣可以嗎？',
        '眼睛也太大了吧！',
        '什麼我不相信！',
        '他說他是神！',
        '誰能比我強？',
        '難道他開外掛？',
      ],
    }
  },
  mounted() {},
  methods: {
    onShow(msg) {
      const randomIndex = Maths.getRandomByInt(0, this.textLibrary.length - 1)
      const text = this.textLibrary[randomIndex]
      this.msg.text = `${msg}${text}`
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
