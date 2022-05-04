<template>
  <div class="c-container">
    <div class="l-topic">
      <Topic />
    </div>
    <div class="l-socket-connect">
      <!-- <SocketConnect /> -->
    </div>
    <div class="l-game">
      <Game
        :img-origin="game.imgOrigin"
        :img-map="game.imgMap"
        :pic-scale="game.picScale"
        :bg-color="game.bgColor"
        :click-color.sync="game.clickColor"
      />
    </div>
    <div ref="testColorDiv" class="testColor"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SocketConnect from '~/components/SocketConnect/index.vue'
import Topic from '~/components/Topic/index.vue'

export default {
  name: 'IndexPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SocketConnect,
    Topic,
  },
  data() {
    return {
      game: {
        imgOrigin: require('~/pages/imgs/picture-origin.jpg'),
        imgMap: require('~/pages/imgs/picture-map.jpg'),
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
<style lang="scss">
@import '~/assets/scss/main';
.c-container {
  .l-topic {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: $z-topic;
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
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
}
</style>
