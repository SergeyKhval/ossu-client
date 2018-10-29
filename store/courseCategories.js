import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

export const state = () => ({
  categories: {},
})

export const getters = {
  categoriesList(state) {
    return values(mapValues(state.categories, (value, key) => {
      value.id = key

      return value
    }))
  },
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const actions = {
  fetchFirebaseCategories() {
    return new Promise((resolve) => {
      this.$firebaseDb.ref('courseCategories').once('value', data => resolve(data.val()))
    })
  },
  async fetchCategories({ commit, dispatch }) {
    const categories = await dispatch('fetchFirebaseCategories')

    commit('setCategories', categories)
  },

  createCategory(store, data) {
    this.$firebaseDb.ref('courseCategories').push(data)
  },
}
