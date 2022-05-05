import { io } from 'socket.io-client'
import Configure from '~/assets/js/utils/Configure'

export default {
  name: 'cSocketConnect',
  data() {
    return {
      socket: null,
    }
  },
  created() {
    this.$nuxt.$on('Socket:CS_MESSAGE', this.CS_MESSAGE)
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
          console.log(`新題目囉`)
          // eslint-disable-next-line no-case-declarations
          const { index } = data.data
          this.$nuxt.$emit('Topic:ChangeIndex', index)
          break
        case 'Game:Notice':
          console.log(`遊戲發送通知囉`)
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
      const userRequest = this.$axios.create({
        baseURL: `${Configure.SERVER_URL}/mongo`,
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(`userRequest: `, userRequest)

      userRequest({
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
    onCSMessage() {
      this.$nuxt.$emit('Socket:CS_MESSAGE')
    },
  },
}
