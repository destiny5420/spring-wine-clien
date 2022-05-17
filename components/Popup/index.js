export default {
  name: 'cPopup',
  data() {
    return {
      rootOpen: false,
      introduction: {
        open: false,
        title: {
          text: `遊戲介紹`,
        },
        content: {
          text: `充滿好奇心的阿德瓦，與他心愛的飛機降落在神秘、有趣的貝殼島，協助他一起找出島上的寶藏吧！`,
        },
        closeBtn: {
          text: `skip`,
          onClickHandler: this.onSkipClick,
        },
      },
      message: {
        open: false,
        title: {
          text: ``,
        },
        content: {
          text: ``,
        },
      },
    }
  },
  created() {
    this.$nuxt.$on('Popup:ShowIntroduction', () => {
      this.onClosePopup()
      this.onShowIntroduction()
    })
    this.$nuxt.$on('Popup:ShowMessage', (data) => {
      this.onClosePopup()
      this.onShowMessage(data)
    })
    this.$nuxt.$on('Popup:CloserPanel', this.onClosePopup)
  },
  mounted() {
    this.onClosePopup()
  },
  computed: {
    _classRoot() {
      return {
        'pointer-events-auto': this.rootOpen,
        'opacity-1': this.rootOpen,
      }
    },
    _classIntroduction() {
      return {
        'pointer-events-auto': this.introduction.open,
        'opacity-1': this.introduction.open,
      }
    },
    _classMessage() {
      return {
        'touch-action-none': this.message.open,
        'pointer-events-auto': this.message.open,
        'opacity-1': this.message.open,
      }
    },
  },
  methods: {
    onSkipClick() {
      this.onClosePopup()
      this.$nuxt.$emit('API:GetGameStatus')
    },
    onShowIntroduction() {
      this.introduction.open = true
      this.rootOpen = true
    },
    onShowMessage({ title, message }) {
      this.message.title.text = title
      this.message.content.text = message
      this.message.open = true
      this.rootOpen = true
    },
    onClosePopup() {
      this.rootOpen = false
      this.message.open = false
      this.introduction.open = false
    },
  },
}
