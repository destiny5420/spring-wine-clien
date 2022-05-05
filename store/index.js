export const getters = {
  gameStart: (state) => state.status.gameStart,
  canTouch: (state) => state.status.canTouch,
  windowWidth: (state) => state.windowInfo.width,
  winfowGameDir: (state) => state.windowInfo.gameDir,
}
