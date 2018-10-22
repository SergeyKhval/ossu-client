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
  subscribeToCategories({ commit }) {
    this.$firebaseDb.ref('courseCategories').on('value', snapshot => commit('setCategories', snapshot.val()))
  },
}
