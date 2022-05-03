<template>
  <div>
    <SocketConnect />
    <Game
      :img-origin="game.imgOrigin"
      :img-map="game.imgMap"
      :pic-scale="game.picScale"
      :bg-color="game.bgColor"
      :click-color.sync="game.clickColor"
    />
    <div ref="testColorDiv" class="testColor"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SocketConnect from '~/components/SocketConnect/index.vue'

export default {
  name: 'IndexPage',
  components: {
    SocketConnect,
  },
  data() {
    return {
      game: {
        imgOrigin: require('./imgs/img.png'),
        imgMap: require('./imgs/img2.png'),
        picScale: 1.3,
        clickColor: null,
        bgColor: 'skyblue',
      },
    }
  },
  watch: {
    'game.clickColor'() {
      const clickColor = this.game.clickColor
      const color = clickColor
        ? `rgb(${clickColor[0]}, ${clickColor[1]}, ${clickColor[2]})`
        : ''
      this.$refs.testColorDiv.style.backgroundColor = color
    },
  },
  mounted() {
    this.updateWindowWidth()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    ...mapMutations({
      updateWindowWidth: 'windowInfo/UPDATE_WIDTH',
    }),
  },
}
</script>
<style lang="scss" scoped>
.testColor {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  width: 100px;
  height: 100px;
  background-color: #f00;
}
</style>
