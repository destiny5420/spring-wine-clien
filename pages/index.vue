<template>
  <div class="c-container">
    <div class="l-game user-none">
      <Game
        :img-origin="game.imgOrigin"
        :img-map="game.imgMap"
        :pic-scale="game.picScale"
        :bg-color="game.bgColor"
        :click-color.sync="game.clickColor"
        :drag-speed="game.dragSpeed"
      />
    </div>
    <div v-if="picker.show" ref="testColorDiv" class="testColor">
      <div class="dir">{{ winfowGameDir }}</div>
      <div ref="color" class="color"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Loading from '~/components/Loading/index.vue'
import Popup from '~/components/Popup/index.vue'
import CountDown from '~/components/CountDown/index.vue'
import LeaderBoard from '~/components/LeaderBoard/index.vue'
import Login from '~/components/Login/index.vue'
import Topic from '~/components/Topic/index.vue'
import Message from '~/components/Message/index.vue'
import SocketConnect from '~/components/SocketConnect/index.vue'
import AudioManager from '~/components/AudioManager/index.vue'
import ten2hex from '~/assets/utils/ten2hex.js'
import Configure from '~/assets/js/utils/Configure'

export default {
  name: 'IndexPage',
  components: {
    Loading,
    Popup,
    CountDown,
    LeaderBoard,
    Login,
    Topic,
    Message,
    SocketConnect,
    AudioManager,
  },
  data() {
    return {
      picker: {
        show: false,
      },
      game: {
        imgOrigin: require('~/pages/imgs/picture-origin.jpg'),
        imgMap: require('~/pages/imgs/picture-map.jpg'),
        picScale: 2,
        clickColor: null,
        bgColor: 'skyblue',
        dragSpeed: 1
      },
    }
  },
  computed: {
    ...mapGetters(['winfowGameDir', 'name', 'email']),
  },
  watch: {
    'game.clickColor'() {
      const clickColor = this.game.clickColor
      const color = clickColor
        ? `#${ten2hex(clickColor[0])}${ten2hex(clickColor[1])}${ten2hex(
            clickColor[2]
          )}`
        : ''

      if (this.picker.show) {
        this.$refs.color.textContent = color
        this.$refs.testColorDiv.style.backgroundColor = color
      }
    },
  },
  created() {
    this.$nuxt.$on('Root:ReadPlayerInfo', this.readPlayerInfoFromLocalStorage)
    this.$nuxt.$on('Root:CheckVictory', this.checkVictory)
    this.$nuxt.$on('Root:CheckLoginData', this.checkLogin)
  },
  mounted() {
    this.picker.show = process.env.COLOR_PICKER === 'true'
    this.updateWindowWidth()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    ...mapMutations({
      updateWindowWidth: 'windowInfo/UPDATE_WIDTH',
    }),
    checkLogin(serverLocalStorageIndex) {
      // localStorage.setItem(
      //   Configure.LOCAL_STORAGE_ROOT,
      //   JSON.stringify({
      //     name: 'test@gmail.com',
      //     email: 'test@gmail.com',
      //   })
      // )

      // return

      // eslint-disable-next-line no-unreachable
      const storageData = JSON.parse(
        localStorage.getItem(Configure.LOCAL_STORAGE_ROOT)
      )

      /**
       * 如果沒有資料
       */
      if (!storageData) {
        this.$nuxt.$emit('Login:Open')
      } else if (
        storageData.localStorageIndex === undefined ||
        storageData.localStorageIndex === null ||
        storageData.localStorageIndex !== serverLocalStorageIndex
      ) {
        localStorage.removeItem('spring-wine')
        this.$nuxt.$emit('Login:Open')
      } else {
        this.readPlayerInfoFromLocalStorage()
        this.$nuxt.$emit('Login:Close')
        this.$nuxt.$emit('Loading:CloseRoot')
      }
    },
    readPlayerInfoFromLocalStorage() {
      const data = JSON.parse(
        localStorage.getItem(Configure.LOCAL_STORAGE_ROOT)
      )
      this.$store.dispatch('player/updateName', { name: data.name })
      this.$store.dispatch('player/updateEmail', { email: data.email })

      this.$nuxt.$emit('Popup:ShowIntroduction')
    },
    checkVictory(email) {
      if (this.email === email) {
        // console.log(`中獎人是自己！`)

        // 1. show message
        this.$nuxt.$emit('Popup:ShowWaitPlayer')

        // 2. close topic ui
        this.$nuxt.$emit('Topic:onClose')
      } else {
        // console.log(`中獎人是別人啦！Q_____Q`)
      }
    },
  },
}
</script>
<style lang="scss">
@import '~/assets/scss/main';
.c-container {
  .l-loading {
    @include size(100%);
    position: fixed;
    z-index: $z-loading;
  }

  .l-count-down {
    @include size(100%);

    position: fixed;
    z-index: $z-countdown;
  }

  .l-socket-connect {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .l-audio-manager {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .l-leader-board {
    @include size(100%);

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: $z-leader-board;
    transform: translate(-50%, -50%);
  }

  .l-popup {
    @include size(100%);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: $z-popup;
    transform: translate(-50%, -50%);
  }

  .l-login {
    @include size(100%);

    @include size(100%);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: $z-login;
    transform: translate(-50%, -50%);
  }

  .l-topic {
    position: absolute;
    top: clamp(1px, px2vw(22), 22px);
    left: clamp(1px, px2vw(22), 22px);
    z-index: $z-topic;
  }

  .l-message {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: $z-message;
  }

  .l-game {
    position: relative;
    top: 0;
    left: 0;
    z-index: $z-game;
  }

  .testColor {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: px2vw(200);
    height: px2vw(100);
    background-color: #f00;
    color: #00ffff;
    font-size: px2vw(30);
  }
}
</style>
