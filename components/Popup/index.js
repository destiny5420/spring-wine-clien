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
            '充滿好奇心的阿德瓦，駕駛著飛機降落在神秘、有趣的貝殼島，協助他一起找出島上的寶藏吧！',
            '遊戲總共 <span class="font-bold">15</span> 回合<br/>需大家幫阿德瓦找物品',
            '每回合，<span class="font-bold">越快</span> 找出指定物品的玩家<br/>獲得的 <span class="font-bold">分數越高</span>',
            '每回合當有十名玩家找到物品後<br/>該局 <span class="font-bold">遊戲結束</span>',
            '十五回合後<br/><span class="font-bold">分數最高前八名，頒發名次獎金</span>',
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
      findPanel: {
        open: false,
        background: {
          imgUrl: require(`~/assets/images/popup/pic-find-panel-01.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-find-panel-01.png`),
          alt: `pic-find-panel-01`,
        },
        deco1: {
          imgUrl: require(`~/assets/images/popup/pic-deco-01.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-01.png`),
          alt: `pic-deco-01`,
        },
        deco2: {
          imgUrl: require(`~/assets/images/popup/pic-deco-02.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-02.png`),
          alt: `pic-deco-02`,
        },
        deco3: {
          imgUrl: require(`~/assets/images/popup/pic-deco-03.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-03.png`),
          alt: `pic-deco-03`,
        },
        deco4: {
          imgUrl: require(`~/assets/images/popup/pic-deco-04.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-04.png`),
          alt: `pic-deco-04`,
        },
        deco5: {
          imgUrl: require(`~/assets/images/popup/pic-deco-05.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-05.png`),
          alt: `pic-deco-05`,
        },
        deco6: {
          imgUrl: require(`~/assets/images/popup/pic-deco-06.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-06.png`),
          alt: `pic-deco-06`,
        },
        deco7: {
          imgUrl: require(`~/assets/images/popup/pic-deco-07.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-deco-07.png`),
          alt: `pic-deco-07`,
        },
        content: {
          text: `請等待其他玩家完成 ...`,
        },
      },
      message: {
        open: false,
        background: {
          imgUrl: require(`~/assets/images/popup/pic-message-panel-01.png`),
          imgUrl_m: require(`~/assets/images/popup/pic-message-panel-01.png`),
          alt: `pic-message-panel-01`,
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
    this.$nuxt.$on('Popup:ShowWaitPlayer', this.onShowWaitPlayer)
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
    _classFind() {
      return {
        'opacity-1': this.findPanel.open,
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
      this.$nuxt.$emit('AudioManager:Play', 'Click')
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
      this.$nuxt.$emit('AudioManager:Play', 'Click')
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
      this.$nuxt.$emit('AudioManager:Play', 'Click')
    },
    onShowIntroduction() {
      this.introduction.open = true
      this.rootOpen = true
    },
    onShowMessage({ message }) {
      this.message.content.text = message
      this.message.open = true
      this.rootOpen = true
    },
    onShowWaitPlayer() {
      this.findPanel.open = true
      this.rootOpen = true
    },
    onClosePopup() {
      this.rootOpen = false
      this.findPanel.open = false
      this.message.open = false
      this.introduction.open = false
    },
  },
}
