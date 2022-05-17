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
        {
          imgUrl: require(`~/assets/images/characters/character-03.png`),
          imgUrl_m: require(`~/assets/images/characters/character-03.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-04.png`),
          imgUrl_m: require(`~/assets/images/characters/character-04.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-05.png`),
          imgUrl_m: require(`~/assets/images/characters/character-05.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-06.png`),
          imgUrl_m: require(`~/assets/images/characters/character-06.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-07.png`),
          imgUrl_m: require(`~/assets/images/characters/character-07.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-08.png`),
          imgUrl_m: require(`~/assets/images/characters/character-08.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-09.png`),
          imgUrl_m: require(`~/assets/images/characters/character-09.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-10.png`),
          imgUrl_m: require(`~/assets/images/characters/character-10.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-11.png`),
          imgUrl_m: require(`~/assets/images/characters/character-11.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-12.png`),
          imgUrl_m: require(`~/assets/images/characters/character-12.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-13.png`),
          imgUrl_m: require(`~/assets/images/characters/character-13.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-14.png`),
          imgUrl_m: require(`~/assets/images/characters/character-14.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-15.png`),
          imgUrl_m: require(`~/assets/images/characters/character-15.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-16.png`),
          imgUrl_m: require(`~/assets/images/characters/character-16.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-17.png`),
          imgUrl_m: require(`~/assets/images/characters/character-17.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-18.png`),
          imgUrl_m: require(`~/assets/images/characters/character-18.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-19.png`),
          imgUrl_m: require(`~/assets/images/characters/character-19.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-20.png`),
          imgUrl_m: require(`~/assets/images/characters/character-20.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-21.png`),
          imgUrl_m: require(`~/assets/images/characters/character-21.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-22.png`),
          imgUrl_m: require(`~/assets/images/characters/character-22.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-23.png`),
          imgUrl_m: require(`~/assets/images/characters/character-23.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-24.png`),
          imgUrl_m: require(`~/assets/images/characters/character-24.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-25.png`),
          imgUrl_m: require(`~/assets/images/characters/character-25.png`),
          alt: `pic-character`,
        },
      ],
    }
  },
  mounted() {
    this.onClose()
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
