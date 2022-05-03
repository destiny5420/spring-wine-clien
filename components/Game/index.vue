<template>
  <div>
    <img ref="imgShow" class="showImg" :src="imgOrigin">
    <img ref="imgMap" class="mapImg" :src="imgMap">
    <canvas ref="canvasShow" class="c-canvasShow"></canvas>
    <canvas ref="canvasMap" class="c-canvasMap"></canvas>
  </div>
</template>
<script>
import Vec2 from './js/Vec2'


export default {
  props: {
    // 圖片縮放
    picScale: {
      type: Number,
      default: 1
    },

    // 顯示圖
    imgOrigin: {
      type: String,
      required: true
    },

    // 映射圖
    imgMap: {
      type: String,
      required: true
    },

    bgColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 兩個畫布的 context
      ctxShowCanvas: null,
      ctxMapCanvas: null,

      // ww 跟 wh
      numWindowWidth: 0,
      numWindowHeight: 0,

      // 圖片的數據
      numImgWidth: 0,
      numImgHeight: 0,
      numImgRatio: 0,

      // 真正用來畫的數據
      numDisplayWidth: 0,
      numDisplayHeight: 0,
      numFreeWidth: 0,
      numFreeHeight: 0,

      // 拖曳照片偏移量
      vec2ScreenOffset: new Vec2,

      // Drag 使用的滑鼠座標
      vec2DragMousePos: new Vec2,
      boolDragLock: true,

      // 用來關 draw 的標記
      stop: false
    }
  },
  mounted() {
    window.addEventListener('load', this.load)
    window.addEventListener('resize', this.init)
  },
  destroyed() {
    this.stop = true
    window.removeEventListener('load', this.load)
    window.removeEventListener('resize', this.init)
    window.removeEventListener('mouseup',   this.dragMouseUp)
    window.removeEventListener('mousemove', this.dragMouseMove)
    window.removeEventListener('mousedown', this.dragMouseDown)
    window.removeEventListener('mousemove', this.getPixel)
  },
  methods: {
    load() {
      this.init()
      this.draw()
    },
    init() {
      this.initCanvas()
      this.initImg()
      this.initDrag()

      this.initGetPixel()
    },

    initCanvas() {
      const canvasShow = this.$refs.canvasShow
      const canvasMap  = this.$refs.canvasMap

      // init w h
      this.numWindowWidth  = canvasShow.width  = canvasMap.width  = window.innerWidth
      this.numWindowHeight = canvasShow.height = canvasMap.height = window.innerHeight

      // init context
      this.ctxShowCanvas = canvasShow.getContext('2d');
      this.ctxMapCanvas  = canvasMap.getContext('2d');
    },

    initImg() {
      const domImgShow = this.$refs.imgShow
      const domImgMap  = this.$refs.imgMap
      const picScale       = this.picScale
      const numWindowWidth = this.numWindowWidth
      const numWindowHeight = this.numWindowHeight

      this.numImgWidth  = domImgShow.width
      this.numImgHeight = domImgShow.height
      this.numImgRatio  = this.numImgWidth / this.numImgHeight;

      this.numDisplayWidth  = numWindowWidth * picScale;
      this.numDisplayHeight = ((numWindowWidth * picScale) / this.numImgRatio)

      this.numFreeWidth = this.numDisplayWidth - numWindowWidth
      this.numFreeHeight = numWindowHeight - this.numDisplayHeight

      this.vec2ScreenOffset.set(0, 0)
    },

    initDrag() {
      this.vec2DragMousePos.set(0, 0);

      window.addEventListener('mouseup',   this.dragMouseUp)
      window.addEventListener('mousemove', this.dragMouseMove)
      window.addEventListener('mousedown', this.dragMouseDown)

    },

    dragMouseDown(ev) {
      this.vec2DragMousePos.set(ev.x, ev.y)
      this.boolDragLock = false
    },
    dragMouseMove(ev) {
      if (this.boolDragLock) return false;

      const numFreeWidth = this.numFreeWidth
      const numFreeHeight = this.numFreeHeight
      const vec2MouseMove = this.vec2DragMousePos.sub({ x: ev.x, y: ev.y })
      const vec2Offset = this.vec2ScreenOffset.sub(vec2MouseMove)

      // fix x
      if (vec2Offset.x > 0) {
          vec2Offset.x = 0
      } else if (vec2Offset.x < -numFreeWidth) {
          vec2Offset.x = -numFreeWidth
      }

      // fix y
      if (vec2Offset.y < numFreeHeight) {
          vec2Offset.y = numFreeHeight
      } else if (vec2Offset.y > 0) {
          vec2Offset.y = 0
      }

      this.vec2ScreenOffset.set(vec2Offset.x, vec2Offset.y)
      this.vec2DragMousePos.set(ev.x, ev.y)
    },
    dragMouseUp() {
      this.boolDragLock = true
    },

    draw() {

      if (this.stop) return false;

      const numWindowWidth  = this.numWindowWidth
      const numWindowHeight = this.numWindowHeight
      const domImgShow = this.$refs.imgShow
      const domImgMap = this.$refs.imgMap

      const vec2ScreenOffset = this.vec2ScreenOffset
      const numFreeHeight = this.numFreeHeight
      const numDisplayWidth = this.numDisplayWidth
      const numDisplayHeight = this.numDisplayHeight


      this.ctxShowCanvas.fillStyle = this.bgColor
      this.ctxShowCanvas.fillRect(0, 0, numWindowWidth, numWindowHeight)
      this.ctxMapCanvas.clearRect(0, 0, numWindowWidth, numWindowHeight)

      this.ctxShowCanvas.drawImage(
          domImgShow,
          vec2ScreenOffset.x,
          numFreeHeight > 0 ? numFreeHeight / 2 : vec2ScreenOffset.y,
          numDisplayWidth,
          numDisplayHeight
      );

      this.ctxMapCanvas.drawImage(
          domImgMap,
          vec2ScreenOffset.x,
          numFreeHeight > 0 ? numFreeHeight / 2 : vec2ScreenOffset.y,
          numDisplayWidth,
          numDisplayHeight
      );

      requestAnimationFrame(this.draw)
    },


    initGetPixel() {
      window.addEventListener('mousedown', this.getPixel)
    },
    getPixel(ev) {
      const data = this.ctxMapCanvas.getImageData(ev.x, ev.y, 1, 1).data
      this.$emit('update:click-color', data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
