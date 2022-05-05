export const state = () => ({
  width: 0,
  gameDir: 'vertical'  // vertical | horizontal
})

export const mutations = {
  UPDATE_WIDTH: state => { state.width = window.innerWidth },
  UPDATE_GAME_DIR: state => { state.gameDir = window.innerWidth >= window.innerHeight ? 'vertical' : 'horizontal' }
}
