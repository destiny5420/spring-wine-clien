export default {
  name: 'cTopic',
  created() {
    this.$nuxt.$on('Topic:ChangeIndex', this.onChangeIndex)
    this.$nuxt.$on('Topic:onStart', this.onStart)
    this.$nuxt.$on('Topic:onClose', this.onClose)
  },
  data() {
    return {
      open: false,
      curIndex: 0,
      pictures: [
        {
          imgUrl: require(`~/assets/images/characters/character-00.png`),
          imgUrl_m: require(`~/assets/images/characters/character-00.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-01.png`),
          imgUrl_m: require(`~/assets/images/characters/character-01.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-02.png`),
          imgUrl_m: require(`~/assets/images/characters/character-02.png`),
          alt: `pic-character`,
        },
      ],
    }
  },
  computed: {
    _classRoot() {
      return {
        'opacity-1': this.open,
        'opacity-0': !this.open,
      }
    },
    getCharacterImage() {
      return this.pictures[this.curIndex]
    },
  },
  methods: {
    onStart() {
      const self = this
      const gsap = self.$gsap

      gsap.timeline().fromTo(
        this.$refs['a-topic'],
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(1.7)',
        }
      )

      this.onShow()
    },
    onShow() {
      this.open = true
    },
    onClose() {
      this.open = false
    },
    onChangeIndex(index) {
      this.curIndex = index
    },
  },
}
