export default {
  name: 'cTopic',
  created() {
    this.$nuxt.$on('Topic:ChangeIndex', this.onChangeIndex)
  },
  data() {
    return {
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
    getCharacterImage() {
      return this.pictures[this.curIndex]
    },
  },
  methods: {
    onChangeIndex(index) {
      this.curIndex = index
    },
  },
}
