export const state = () => ({
  name: null,
  email: null,
})

export const mutations = {
  UPDATE_NAME: (state, data) => {
    state.name = data.name
  },
  UPDATE_EMAIL: (state, data) => {
    state.email = data.email
  },
}

export const actions = {
  updateName: ({ commit }, data) => {
    commit('UPDATE_NAME', data)
  },
  updateEmail: ({ commit }, data) => {
    commit('UPDATE_EMAIL', data)
  },
}
