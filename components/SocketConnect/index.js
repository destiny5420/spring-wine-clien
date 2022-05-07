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
    this.$nuxt.$on('Socket:CS_MESSAGE', this.CS_MESSAGE)
    this.$nuxt.$on('API:GameClick', this.onGameClick)
    this.$nuxt.$on('API:LoginHandler', this.onLoginHandler)

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

          this.$nuxt.$emit('Topic:ChangeIndex', index)
          this.$store.dispatch('status/updateGameStart', {
            key: true,
          })
          break
        case 'Game:Notice':
          console.log(`遊戲發送通知囉`)
          break
        case 'SC_GAME_VICTORY':
          const { mail, name } = data.data
          console.log(`有人得獎囉！得獎人: ${name} / mail: ${mail}`)
          this.$nuxt.$emit('Message:Show', `${name} 已經找到囉！你還在等什麼？`)
          this.$nuxt.$emit('Root:CheckVictory', mail)
          break
        default:
          break
      }
    },
    CS_MESSAGE(data) {
      this.socket.emit('CS_MESSAGE', data)
    },
    onConnected(data) {
      const { gameStatus } = data
      console.log(`[onConnected] / gameStatus: `, gameStatus)

      switch (gameStatus) {
        case 'Idle':
          this.$nuxt.$emit('Popup:ShowIntroduction')
          break
        case 'Playing':
          this.$nuxt.$emit('Popup:ShowMessage', {
            title: `遊戲進行中`,
            message: `請等待下一局開始`,
          })
          break
        default:
          break
      }
    },
    onSendMsg() {
      this.socket.emit('chat message', 'Hi, paper')
    },
    onRegister() {
      this.monogoAPI({
        method: 'post',
        url: 'register',
        data: {
          name: 'paper',
          email: 'paper.hsiao@gmail.com',
        },
      }).then(function (response) {
        console.log(`response: `, response)
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
          console.log(`response: `, response)
          const { data } = response

          if (data.answerCorrect) {
            self.$store.dispatch('status/updateGameStart', {
              key: false,
            })
          }
        })
        .catch(function (err) {
          console.error(err)
        })
        .finally(function () {
          self.$store.dispatch('status/updateCanTouch', {
            key: true,
          })
        })
    },

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
          console.log(`[Register] data: `, data)

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
          console.error(err)
        })
    },
    onCSMessage() {
      this.$nuxt.$emit('Socket:CS_MESSAGE')
    },
  },
}
