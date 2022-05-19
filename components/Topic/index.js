export default {
  name: 'cTopic',
  created() {
    this.$nuxt.$on('Topic:ChangeIndex', ({ index, topicNum }) => {
      this.topicNum = topicNum
      this.onChangeIndex(index)
    })
    this.$nuxt.$on('Topic:onStart', this.onStart)
    this.$nuxt.$on('Topic:onClose', this.onClose)
    this.$nuxt.$on('Topic:onClose', this.onClose)
  },
  data() {
    return {
      open: false,
      curIndex: 0,
      topicNum: '',
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
        {
          imgUrl: require(`~/assets/images/characters/character-26.png`),
          imgUrl_m: require(`~/assets/images/characters/character-26.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-27.png`),
          imgUrl_m: require(`~/assets/images/characters/character-27.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-28.png`),
          imgUrl_m: require(`~/assets/images/characters/character-28.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-29.png`),
          imgUrl_m: require(`~/assets/images/characters/character-29.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-30.png`),
          imgUrl_m: require(`~/assets/images/characters/character-30.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-31.png`),
          imgUrl_m: require(`~/assets/images/characters/character-31.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-32.png`),
          imgUrl_m: require(`~/assets/images/characters/character-32.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-33.png`),
          imgUrl_m: require(`~/assets/images/characters/character-33.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-34.png`),
          imgUrl_m: require(`~/assets/images/characters/character-34.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-35.png`),
          imgUrl_m: require(`~/assets/images/characters/character-35.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-36.png`),
          imgUrl_m: require(`~/assets/images/characters/character-36.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-37.png`),
          imgUrl_m: require(`~/assets/images/characters/character-37.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-38.png`),
          imgUrl_m: require(`~/assets/images/characters/character-38.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-39.png`),
          imgUrl_m: require(`~/assets/images/characters/character-39.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-40.png`),
          imgUrl_m: require(`~/assets/images/characters/character-40.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-41.png`),
          imgUrl_m: require(`~/assets/images/characters/character-41.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-42.png`),
          imgUrl_m: require(`~/assets/images/characters/character-42.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-43.png`),
          imgUrl_m: require(`~/assets/images/characters/character-43.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-44.png`),
          imgUrl_m: require(`~/assets/images/characters/character-44.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-45.png`),
          imgUrl_m: require(`~/assets/images/characters/character-45.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-46.png`),
          imgUrl_m: require(`~/assets/images/characters/character-46.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-47.png`),
          imgUrl_m: require(`~/assets/images/characters/character-47.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-48.png`),
          imgUrl_m: require(`~/assets/images/characters/character-48.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-49.png`),
          imgUrl_m: require(`~/assets/images/characters/character-49.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-50.png`),
          imgUrl_m: require(`~/assets/images/characters/character-50.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-51.png`),
          imgUrl_m: require(`~/assets/images/characters/character-51.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-52.png`),
          imgUrl_m: require(`~/assets/images/characters/character-52.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-53.png`),
          imgUrl_m: require(`~/assets/images/characters/character-53.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-54.png`),
          imgUrl_m: require(`~/assets/images/characters/character-54.png`),
          alt: `pic-character`,
        },
        {
          imgUrl: require(`~/assets/images/characters/character-55.png`),
          imgUrl_m: require(`~/assets/images/characters/character-55.png`),
          alt: `pic-character`,
        },
      ],
      bg: {
        imgUrl: require(`~/assets/images/topic/pic-bg-01.png`),
        imgUrl_m: require(`~/assets/images/topic/pic-bg-01.png`),
        alt: `pic-bg-01`,
      },
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
