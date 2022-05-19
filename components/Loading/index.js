import Typewriter from 'typewriter-effect/dist/core'

export default {
  name: 'cLoading',
  data() {
    return {
      root: {
        hidden: false,
      },
      startButton: {
        show: false,
      },
      startWord: {
        show: false,
        typewriter: null,
        text: `故事要從半年前開始說起....`,
      },
      anims: [
        {
          show: false,
          imgUrl: require(`~/assets/images/animation/picture-01.jpg`),
          imgUrl_m: require(`~/assets/images/animation/picture-01.jpg`),
          alt: `picture-01`,
        },
        {
          show: false,
          imgUrl: require(`~/assets/images/animation/picture-02.jpg`),
          imgUrl_m: require(`~/assets/images/animation/picture-02.jpg`),
          alt: `picture-02`,
        },
        {
          show: false,
          imgUrl: require(`~/assets/images/animation/picture-03.jpg`),
          imgUrl_m: require(`~/assets/images/animation/picture-03.jpg`),
          alt: `picture-03`,
        },
        {
          show: false,
          imgUrl: require(`~/assets/images/animation/picture-04.jpg`),
          imgUrl_m: require(`~/assets/images/animation/picture-04.jpg`),
          alt: `picture-04`,
        },
        {
          show: false,
          imgUrl: require(`~/assets/images/animation/picture-05.jpg`),
          imgUrl_m: require(`~/assets/images/animation/picture-05.jpg`),
          alt: `picture-05`,
        },
      ],
    }
  },
  created() {
    const self = this

    this.$nuxt.$on('Loading:ShowAnimPic', (pictureIndex) => {
      self.onCloseButton()
      self.onCloseStartWord()
      self.showAnimPic(pictureIndex)
    })
    this.$nuxt.$on('Loading:Close', () => {
      this.onCloseButton()
      this.onCloseStartWord()
      this.closeRoot()
    })
    this.$nuxt.$on('Loading:Init', () => {
      this.setup()
    })
  },
  mounted() {},
  computed: {
    _classRoot() {
      return {
        'is-hidden': this.root.hidden,
        'pointer-events-none': this.root.hidden,
      }
    },
    _classButtonStart() {
      return {
        'is-active': this.startButton.show,
        'pointer-events-auto': this.startButton.show,
      }
    },
    _classStartWord() {
      return {
        'is-active': this.startWord.show,
      }
    },
    _classAnim() {
      return function (index) {
        return {
          'is-active': this.anims[index].show,
        }
      }
    },
  },
  methods: {
    setup() {
      const self = this
      const gsap = self.$gsap

      gsap.delayedCall(1, this.onShowStart)

      const el = this.$refs['start-word']
      this.startWord.typewriter = new Typewriter(el, {
        delay: 100,
      })
      this.startWord.typewriter.pauseFor(1500).typeString(this.startWord.text)
    },
    onShowStart() {
      this.startButton.show = true
    },
    onStartButtonClick() {
      this.startWord.show = true
      this.onCloseButton()
      this.startWord.typewriter.start()
    },
    onCloseButton() {
      this.startButton.show = false
    },
    onCloseStartWord() {
      this.startWord.show = false
    },
    closeAllAnim() {
      this.anims.forEach((el) => {
        el.show = false
      })
    },
    showAnimPic(pictureIndex) {
      this.closeAllAnim()
      this.anims[pictureIndex].show = true
    },
    closeRoot() {
      const self = this
      self.root.hidden = true
    },
  },
}
