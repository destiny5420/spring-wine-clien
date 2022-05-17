/* eslint-disable no-case-declarations */
import { io } from 'socket.io-client'
import { mapGetters } from 'vuex'
import Configure from '~/assets/js/utils/Configure'

export default {
  name: 'cSocketConnect',
  data() {
    return {
      socket: null,
      monogoAPI: null,
      gameAPI: null,
    }
  },
  created() {
    this.$nuxt.$on('API:GameClick', this.onGameClick)
    this.$nuxt.$on('API:LoginHandler', this.onLoginHandler)
    this.$nuxt.$on('API:GetGameStatus', this.onGetGameStatus)

    this.monogoAPI = this.$axios.create({
      baseURL: `${Configure.SERVER_URL}/mongo`,
      headers: { 'Content-Type': 'application/json' },
    })

    this.gameAPI = this.$axios.create({
      baseURL: `${Configure.SERVER_URL}/game`,
      headers: { 'Content-Type': 'application/json' },
    })
  },
  mounted() {
    this.socket = io(Configure.SERVER_URL)
    this.socket.on('connected', this.onConnected)
    this.socket.on('SC_MESSAGE', this.SC_MESSAGE)
  },
  computed: {
    ...mapGetters(['name', 'email']),
  },
  methods: {
    SC_MESSAGE(data) {
      switch (data.type) {
        case 'SC_DashboardNewTopic':
          const { index } = data.data

          // 1. change topic index
          this.$nuxt.$emit('Topic:ChangeIndex', index)

          // 2. show countdown panel
          this.$nuxt.$emit('CountDown:onStart')

          // 3. close popup
          this.$nuxt.$emit('Popup:CloserPanel')

          // 4. close topic
          this.$nuxt.$emit('Topic:onClose')
          break
        case 'SC_GAME_VICTORY':
          const { mail, name, gameStatus } = data.data
          console.log(`有人得獎囉！得獎人: ${name} / mail: ${mail}`)
          this.$nuxt.$emit('Message:Show', `${name} 已經找到囉！你還在等什麼？`)

          switch (gameStatus) {
            case 'Playing':
              this.$nuxt.$emit('Root:CheckVictory', mail)
              break
            default:
              break
          }

          break
        case 'SC_GAME_OVER':
          // 1. set parameter the game start of global in store.js
          this.$store.dispatch('status/updateGameStart', {
            key: false,
          })

          // 2. show message
          this.$nuxt.$emit('Popup:ShowMessage', {
            title: `Round Over`,
            message: `等待主持人出下一題`,
          })

          // 3. close topic ui
          this.$nuxt.$emit('Topic:onClose')
          break
        case 'SC_ShowLeaderBoard':
          const { leaderBoard } = data.data
          console.log(`[SC_ShowLeaderBoard] / leaderboard: `, leaderBoard)
          break
        case 'SC_Animate':
          const animIndex = data.data.index
          this.$nuxt.$emit('Loading:ShowAnimPic', animIndex)
          break
        case 'SC_AnimateClose':
          this.$nuxt.$emit('Loading:Close')
          break
        default:
          break
      }
    },
    CS_MESSAGE(data) {
      this.socket.emit('CS_MESSAGE', data)
    },
    onConnected(data) {
      const { isAnimateEnd } = data

      if (isAnimateEnd) {
        this.$nuxt.$emit('Loading:Close')
      } else {
        this.$nuxt.$emit('Loading:Init')
      }
    },
    onGetGameStatus() {
      const self = this

      this.gameAPI({
        method: 'get',
        url: 'get-game-status',
      }).then(function (response) {
        const { data } = response

        console.log(`data.gameStatus: `, data.gameStatus)
        switch (data.gameStatus) {
          case 'Idle':
            self.$nuxt.$emit('Popup:ShowMessage', {
              title: `遊戲即將開始`,
              message: `請等待主持人出題`,
            })
            break
          case 'Playing':
            self.$nuxt.$emit('Popup:ShowMessage', {
              title: `遊戲進行中`,
              message: `請等待下一局開始`,
            })
            break
          default:
        }
      })
    },
    /**
     * @desc API Methods below
     */
    onLoginHandler({ name, email }) {
      const self = this

      this.monogoAPI({
        method: 'post',
        url: 'register',
        data: {
          name,
          email,
        },
      })
        .then(function (response) {
          const { data } = response
          console.log(`[onLoginHandler] / data: `, data)

          localStorage.setItem(
            Configure.LOCAL_STORAGE_ROOT,
            JSON.stringify({
              name: data.name,
              email: data.email,
            })
          )

          self.$nuxt.$emit('Root:ReadPlayerInfo')
          self.$nuxt.$emit('Login:Close')
        })
        .catch(function (err) {
          console.error(`[onLoginHandler] / err log: ${err}`)
        })
    },
    onGameClick(color) {
      const self = this
      if (color === '#000000') {
        return
      }

      self.$store.dispatch('status/updateCanTouch', {
        key: false,
      })

      this.gameAPI({
        method: 'post',
        url: 'click',
        data: {
          name: self.name,
          email: self.email,
          color,
        },
      })
        .then(function (response) {
          console.log(`[onGameClick] / response: `, response)

          const { valid } = response.data

          if (!valid) {
            return
          }

          const { answerCorrect } = response.data

          if (answerCorrect) {
            self.$store.dispatch('status/updateGameStart', {
              key: false,
            })
          }
        })
        .catch(function (err) {
          console.error(`[onGameClick] / err log: ${err}`)
        })
        .finally(function () {
          self.$store.dispatch('status/updateCanTouch', {
            key: true,
          })
        })
    },
  },
}
