const audioBGM = require('~/assets/audio/src_audio_GameBGM01.mp3').default
const audioClick = require('~/assets/audio/src_audio_click.wav').default

export default {
  name: 'cAudioManager',
  data() {
    return {
      source: {
        audioClick,
        audioBGM,
      },
      player: {
        audioClick,
        audioBGM,
      },
    }
  },
  created() {
    this.$nuxt.$on('AudioManager:Play', this.onPlay)
  },
  mounted() {
    this.player.audioClick = new Audio(this.source.audioClick)

    this.player.audioBGM = new Audio(this.source.audioBGM)
    this.player.audioBGM.volume = 0.5
    this.player.audioBGM.loop = true
  },
  methods: {
    onPlay(audioName) {
      console.log(`onPlay / audioName: `, audioName)
      switch (audioName) {
        case 'Click':
          this.player.audioClick.play()
          break
        case 'BGM':
          this.player.audioBGM.play()
          break
        case 'Tick':
          break
        default:
          break
      }
    },
  },
}
