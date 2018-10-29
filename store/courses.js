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
  fetchFirebaseCourses() {
    return new Promise((resolve) => {
      this.$firebaseDb.ref('courses').once('value', data => resolve(data.val()))
    })
  },

  async fetchCourses({ commit, dispatch }) {
    const courses = await dispatch('fetchFirebaseCourses')

    commit('setCourses', courses)

    return courses
  },

  createCourse(store, data) {
    this.$firebaseDb.ref('courses').push(data)
  },
}
