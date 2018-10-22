import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

export const state = () => ({
  courses: {},
})

export const getters = {
  coursesList(state) {
    return values(mapValues(state.courses, (value, key) => {
      value.id = key

      return value
    }))
  },
}

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
}

export const actions = {
  subscribeToCourses({ commit }) {
    this.$firebaseDb.ref('courses').on('value', snapshot => commit('setCourses', snapshot.val()))
  },
}
