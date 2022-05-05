export const state = () => ({
  gameStart: false,
  canTouch: true,
})

export const mutations = {
  UPDATE_GAME_START: (state, data) => {
    state.gameStart = data.key
  },
  UPDATE_CAN_TOUCH: (state, data) => {
    state.canTouch = data.key
  },
}

export const actions = {
  updateGameStart: ({ commit }, data) => {
    commit('UPDATE_GAME_START', data)
  },
  updateCanTouch: ({ commit }, data) => {
    commit('UPDATE_CAN_TOUCH', data)
  },
}
