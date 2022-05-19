import { Format } from '@paperhsiao/formula'
export default {
  name: 'cLeaderBoard',
  data() {
    return {
      show: false,
      decoTop: {
        imgUrl: require(`~/assets/images/leaderBoard/pic-deco-top-01.png`),
        imgUrl_m: require(`~/assets/images/leaderBoard/pic-deco-top-01.png`),
        alt: `pic-deco-top-01`,
      },
      list: [],
    }
  },
  created() {
    this.$nuxt.$on('LeaderBoard:onShow', this.onShow)
  },
  computed: {
    _classRoot() {
      return {
        'opacity-1': this.show,
        'pointer-events-auto': this.show,
      }
    },
    _classNumText() {
      return function (num) {
        return {
          'opacity-0': num === 1 || num === 2 || num === 3,
        }
      }
    },
    _classPlayer() {
      return function (num) {
        return {
          'c-player-winner': num === 1 || num === 2 || num === 3,
        }
      }
    },
  },
  methods: {
    showAward(num) {
      switch (num) {
        case 1:
        case 2:
        case 3:
          return true

        default:
          return false
      }
    },
    getAward(num) {
      return require(`~/assets/images/leaderBoard/pic-award-0${num}.png`)
    },
    getScore(value) {
      return Format.addComma(value)
    },
    onShow(leaderBoardData) {
      this.show = true
      this.list = leaderBoardData
    },
    onClose() {
      this.show = false
    },
  },
}
