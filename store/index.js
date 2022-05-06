export const getters = {
  name: (state) => state.player.name,
  email: (state) => state.player.email,
  gameStart: (state) => state.status.gameStart,
  canTouch: (state) => state.status.canTouch,
  windowWidth: (state) => state.windowInfo.width,
  winfowGameDir: (state) => state.windowInfo.gameDir,
}
