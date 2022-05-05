/* eslint-disable no-case-declarations */
import { io } from 'socket.io-client'
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
    console.log(`socket-connect mounted!`)
    this.socket = io(Configure.SERVER_URL)

    this.socket.on('SC_MESSAGE', this.SC_MESSAGE)
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

          console.log(`有人得獎囉！得獎人: ${name}`)
          break
        default:
          break
      }
    },
    CS_MESSAGE(data) {
      this.socket.emit('CS_MESSAGE', data)
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
          name: 'paper',
          email: 'paper.hsiao@gmail.com',
          color,
        },
      })
        .then(function (response) {
          console.log(`response: `, response)
          const { data } = response

          if (data.answerCorrect) {
            // 答對流程
          } else {
            // 錯誤流程
            console.log(data.result)
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
    onCSMessage() {
      this.$nuxt.$emit('Socket:CS_MESSAGE')
    },
  },
}
