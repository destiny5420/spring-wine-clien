export default {
  name: 'cPopup',
  data() {
    return {
      rootOpen: false,
      introduction: {
        open: false,
        background: {
          imgUrl: require(`~/assets/images/common/pic-panel-bg-01.png`),
          imgUrl_m: require(`~/assets/images/common/pic-panel-bg-01.png`),
          alt: `pic-panel-bg-01`,
        },
        character: {
          imgUrl: require(`~/assets/images/common/pic-character-01.png`),
          imgUrl_m: require(`~/assets/images/common/pic-character-01.png`),
          alt: `pic-character-01`,
        },
        title: {
          imgUrl: require(`~/assets/images/popup/pic-intro-title-text-01.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-intro-title-text-01.png`),
          alt: `pic-intro-title-text-01`,
        },
        arrowBtn: {
          imgUrl: require(`~/assets/images/common/icon-btn-arrow-01.png`),
          imgUrl_m: require(`~/assets/images/common/icon-btn-arrow-01.png`),
          alt: `icon-btn-arrow-01`,
        },
        content: {
          curIndex: 0,
          textList: [
            '充滿好奇心的阿德瓦，與他心愛的飛機降落在神秘、有趣的貝殼島，協助他一起找出島上的寶藏吧！',
            '越快找出指定物品的玩家分數越高',
            '遊戲結束後將取總分前八名玩家，頒發獎金',
            '祝你順利',
          ],
        },
        closeBtn: {
          picture: {
            imgUrl: require(`~/assets/images/common/icon-btn-skip-01.png`),
            imgUrl_m: require(`~/assets/images/common/icon-btn-skip-01.png`),
            alt: `icon-btn-skip-01`,
          },
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
    getIntroContent() {
      return this.introduction.content.textList[
        this.introduction.content.curIndex
      ]
    },
  },
  methods: {
    onIntroNextClick() {
      if (
        this.introduction.content.curIndex + 1 <
        this.introduction.content.textList.length
      ) {
        this.introduction.content.curIndex += 1
      } else {
        this.introduction.content.curIndex = 0
      }
    },
    onIntroPrevClick() {
      if (this.introduction.content.curIndex - 1 > 0) {
        this.introduction.content.curIndex -= 1
      } else {
        this.introduction.content.curIndex =
          this.introduction.content.textList.length - 1
      }
    },
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
