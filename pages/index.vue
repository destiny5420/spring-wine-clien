<template>
  <Game
    :imgOrigin="game.imgOrigin"
    :imgMap="game.imgMap"
    :picScale="game.picScale"/>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      game: {
        imgOrigin: require('./imgs/img.png'),
        imgMap: require('./imgs/img2.png'),
        picScale: 1.3
      }
    }
  }
}
</script>
