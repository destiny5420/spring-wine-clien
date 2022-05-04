import { io } from 'socket.io-client'
import Configure from '~/assets/js/utils/Configure'

export default {
  name: 'cSocketConnect',
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    console.log(`socket-connect mounted!`)
    this.socket = io(Configure.SERVER_URL, {
      // path: '',
    })

    this.socket.on('chat message', function (msg) {
      console.log('server messenger: ', msg)
    })

    console.log(`socket: `, this.socket)
  },
  methods: {
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
  },
}
