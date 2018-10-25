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
  fetchCategories({ commit }) {
    this.$firebaseDb.ref('courseCategories').once('value', snapshot => commit('setCategories', snapshot.val()))
  },

  createCategory(store, data) {
    this.$firebaseDb.ref('courseCategories').push(data)
  },
}
