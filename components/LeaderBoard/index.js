export default {
  name: 'cLeaderBoard',
  data() {
    return {
      show: false,
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
  },
  methods: {
    onShow(leaderBoardData) {
      this.show = true
      this.list = leaderBoardData
    },
    onClose() {
      this.show = false
    },
  },
}
