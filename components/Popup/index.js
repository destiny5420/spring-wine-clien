export default {
  name: 'cPopup',
  data() {
    return {
      open: true,
      title: {
        text: `遊戲介紹`,
      },
      introduction: {
        text: `這是一款很好玩的遊戲這是一款很好玩的遊戲這是一款很好玩的遊戲這是一款很好玩的遊戲這是一款很好玩的遊戲這是一款很好玩的遊戲`,
      },
      closeBtn: {
        text: `略過`,
        onClickHandler: this.onSkipClick,
      },
    }
  },
  computed: {
    _classRoot() {
      return {
        'pointer-events-auto': this.open,
        'opacity-1': this.open,
      }
    },
  },
  methods: {
    onSkipClick() {
      this.open = false

      this.$nuxt.$emit('Message:Show', '關閉視窗')
    },
  },
}
