<template>
  <div>
    <img ref="imgShow" class="showImg" :src="imgOrigin" />
    <img ref="imgMap" class="mapImg" :src="imgMap" />
    <canvas ref="canvasShow" class="c-canvas-game c-canvasShow"></canvas>
    <canvas ref="canvasMap" class="c-canvas-game c-canvasMap"></canvas>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Vec2 from './js/Vec2'
import ten2hex from '~/assets/utils/ten2hex.js'

export default {
  props: {
    // 圖片縮放
    picScale: {
      type: Number,
      default: 1,
    },

    // 顯示圖
    imgOrigin: {
      type: String,
      required: true,
    },

    // 映射圖
    imgMap: {
      type: String,
      required: true,
    },

    bgColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 兩個畫布的 context
      ctxShowCanvas: null,
      ctxMapCanvas: null,

      // ww 跟 wh
      numWindowOriginWidth: 0,
      numWindowOriginHeight: 0,

      // 圖片的數據
      numImgOriginWidth: 0,
      numImgOriginHeight: 0,
      numImgRatio: 0,

      // 真正用來畫的數據
      numDisplayWindowWidth: 0,
      numDisplayWindowHeight: 0,
      numDisplayPicWidth: 0,
      numDisplayPicHeight: 0,
      numFreeWidth: 0,
      numFreeHeight: 0,

      // 拖曳照片偏移量
      vec2ScreenOffset: new Vec2(),

      // Drag 使用的滑鼠座標
      vec2DragMousePos: new Vec2(),
      boolDragLock: true,

      // 用來關 draw 的標記
      stop: false,
    }
  },
  computed: {
    ...mapGetters(['winfowGameDir', 'gameStart', 'canTouch']),
  },
  mounted() {
    window.addEventListener('load', this.load)
    window.addEventListener('resize', this.initSize)
  },
  destroyed() {
    this.stop = true
    window.removeEventListener('load', this.load)
    window.removeEventListener('resize', this.initSize)
    window.removeEventListener('mouseup', this.dragMouseUp)
    window.removeEventListener('mousemove', this.dragMouseMove)
    window.removeEventListener('mousedown', this.dragMouseDown)
    window.removeEventListener('mousemove', this.getPixel)
  },
  methods: {
    ...mapMutations({
      updateGameDir: 'windowInfo/UPDATE_GAME_DIR',
    }),
    load() {
      this.init()
      this.draw()
    },
    init() {
      this.initCanvas()
      this.initImg()
      this.initSize()
      this.initDrag()

      this.initGetPixel()
    },

    initCanvas() {
      const canvasShow = this.$refs.canvasShow
      const canvasMap = this.$refs.canvasMap

      // init context
      this.ctxShowCanvas = canvasShow.getContext('2d')
      this.ctxMapCanvas = canvasMap.getContext('2d')
    },

    initImg() {
      const domImgShow = this.$refs.imgShow

      this.numImgOriginWidth = domImgShow.width
      this.numImgOriginHeight = domImgShow.height
      this.numImgRatio = this.numImgOriginWidth / this.numImgOriginHeight
    },

    initSize() {
      this.updateGameDir()

      // init canvas size
      const canvasShow = this.$refs.canvasShow
      const canvasMap = this.$refs.canvasMap
      const picScale = this.picScale

      const numWindowOriginWidth =
        (this.numWindowOriginWidth =
        canvasShow.width =
        canvasMap.width =
          window.innerWidth)
      const numWindowOriginHeight =
        (this.numWindowOriginHeight =
        canvasShow.height =
        canvasMap.height =
          window.innerHeight)

      // init Img Compu Size
      let numDisplayPicWidth = 0
      let numDisplayPicHeight = 0
      let numDisplayWindowWidth
      let numDisplayWindowHeight

      if (this.winfowGameDir === 'vertical') {
        numDisplayWindowWidth = numWindowOriginWidth
        numDisplayWindowHeight = numWindowOriginHeight
      } else {
        numDisplayWindowWidth = numWindowOriginHeight
        numDisplayWindowHeight = numWindowOriginWidth
      }

      numDisplayPicWidth = numDisplayWindowWidth * picScale
      numDisplayPicHeight =
        (numDisplayWindowWidth * picScale) / this.numImgRatio
      this.numFreeWidth = numDisplayPicWidth - numDisplayWindowWidth
      this.numFreeHeight = numDisplayPicHeight - numDisplayWindowHeight

      this.numDisplayWindowWidth = numDisplayWindowWidth
      this.numDisplayWindowHeight = numDisplayWindowHeight
      this.numDisplayPicWidth = numDisplayPicWidth
      this.numDisplayPicHeight = numDisplayPicHeight
      this.vec2ScreenOffset.set(0, 0)
    },

    initDrag() {
      this.vec2DragMousePos.set(0, 0)

      window.addEventListener('mousedown', this.dragMouseDown)
      window.addEventListener('mousemove', this.dragMouseMove)
      window.addEventListener('mouseup', this.dragMouseUp)

      window.addEventListener('touchstart', (ev) =>
        this.dragMouseDown(ev.touches[0])
      )
      window.addEventListener('touchmove', (ev) =>
        this.dragMouseMove(ev.touches[0])
      )
      window.addEventListener('touchend', (ev) =>
        this.dragMouseUp(ev.touches[0])
      )
    },

    dragMouseDown(ev) {
      const x = ev.x || ev.clientX
      const y = ev.y || ev.clientY
      this.vec2DragMousePos.set(x, y)
      this.boolDragLock = false
    },
    dragMouseMove(ev) {
      if (this.boolDragLock || !ev) return false

      const x = ev.x || ev.clientX
      const y = ev.y || ev.clientY

      const numFreeWidth = this.numFreeWidth
      const numFreeHeight = this.numFreeHeight
      const strGameDir = this.winfowGameDir
      const vec2MouseMove = this.vec2DragMousePos.sub({ x, y })

      if (strGameDir === 'horizontal') {
        vec2MouseMove.set(vec2MouseMove.y, -vec2MouseMove.x)
      }

      const vec2Offset = this.vec2ScreenOffset.sub(vec2MouseMove)

      let fixX = vec2Offset.x
      let fixY = vec2Offset.y
      // fix x
      if (numFreeWidth <= 0) {
        fixX = 0
      } else if (fixX > numFreeWidth / 2) {
        fixX = numFreeWidth / 2
      } else if (fixX < -numFreeWidth / 2) {
        fixX = -numFreeWidth / 2
      }

      // fix y
      if (numFreeHeight <= 0) {
        fixY = 0
      } else if (fixY > numFreeHeight / 2) {
        fixY = numFreeHeight / 2
      } else if (fixY < -numFreeHeight / 2) {
        fixY = -numFreeHeight / 2
      }

      this.vec2ScreenOffset.set(fixX, fixY)
      this.vec2DragMousePos.set(x, y)
    },
    dragMouseUp() {
      this.boolDragLock = true
    },

    draw() {
      if (this.stop) return false

      const numWindowOriginWidth = this.numWindowOriginWidth
      const numWindowOriginHeight = this.numWindowOriginHeight
      const domImgShow = this.$refs.imgShow
      const domImgMap = this.$refs.imgMap

      const vec2ScreenOffset = this.vec2ScreenOffset
      const numFreeHeight = this.numFreeHeight
      const numDisplayPicWidth = this.numDisplayPicWidth
      const numDisplayPicHeight = this.numDisplayPicHeight

      this.ctxShowCanvas.fillStyle = this.bgColor
      this.ctxShowCanvas.fillRect(
        0,
        0,
        numWindowOriginWidth,
        numWindowOriginHeight
      )
      this.ctxMapCanvas.clearRect(
        0,
        0,
        numWindowOriginWidth,
        numWindowOriginHeight
      )

      this.ctxShowCanvas.save()
      this.ctxMapCanvas.save()

      this.ctxShowCanvas.translate(
        numWindowOriginWidth / 2,
        numWindowOriginHeight / 2
      )
      this.ctxMapCanvas.translate(
        numWindowOriginWidth / 2,
        numWindowOriginHeight / 2
      )

      if (this.winfowGameDir === 'horizontal') {
        this.ctxShowCanvas.rotate((90 * Math.PI) / 180)
        this.ctxMapCanvas.rotate((90 * Math.PI) / 180)
      }

      this.ctxShowCanvas.drawImage(
        domImgShow,
        -numDisplayPicWidth / 2 + vec2ScreenOffset.x,
        -numDisplayPicHeight / 2 + vec2ScreenOffset.y,
        numDisplayPicWidth,
        numDisplayPicHeight
      )

      this.ctxMapCanvas.drawImage(
        domImgMap,
        -numDisplayPicWidth / 2 + vec2ScreenOffset.x,
        -numDisplayPicHeight / 2 + vec2ScreenOffset.y,
        numDisplayPicWidth,
        numDisplayPicHeight
      )

      this.ctxMapCanvas.restore()
      this.ctxShowCanvas.restore()

      requestAnimationFrame(this.draw)
    },

    initGetPixel() {
      window.addEventListener('mousedown', this.getPixel)
    },
    getPixel(ev) {
      const data = this.ctxMapCanvas.getImageData(ev.x, ev.y, 1, 1).data
      this.sendClickEvent(data)
      this.$emit('update:click-color', data)
    },
    sendClickEvent(colorData) {
      console.log(
        `this.gameStart: ${this.gameStart} / this.canTouch: ${this.canTouch}`
      )
      if (!this.gameStart) {
        return
      }

      if (!this.canTouch) {
        return
      }

      const color = colorData
        ? `#${ten2hex(colorData[0])}${ten2hex(colorData[1])}${ten2hex(
            colorData[2]
          )}`
        : ''
      this.$nuxt.$emit('API:GameClick', color)
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
