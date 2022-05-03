import { io } from 'socket.io-client'

export default {
  name: 'cSocketConnect',
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    console.log(`socket-connect mounted!`)
    this.socket = io('http://localhost:9000', {
      path: '',
    })

    console.log(`socket: `, this.socket)
  },
}
