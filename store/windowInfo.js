export const state = () => ({
  width: 0
})

export const mutations = {
  UPDATE_WIDTH: state => { state.width = window.innerWidth },
}
