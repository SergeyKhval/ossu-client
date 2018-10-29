import firebase from 'firebase'
import get from 'lodash/get'
import values from 'lodash/values'
import mapValues from 'lodash/mapValues'

const githubProvider = new firebase.auth.GithubAuthProvider()

export const state = () => ({
  user: null,
  isAuthenticated: false,
})

export const getters = {
  isAuthorized(state) {
    return state.isAuthenticated
  },
  userCourses(state) {
    const userCourses = get(state, 'user.courses', {})

    return values(mapValues(userCourses, (value, key) => {
      value.id = key

      return value
    }))
  },
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = user
      state.isAuthenticated = true
    } else {
      state.user = null
      state.isAuthenticated = false
    }
  },
}

export const actions = {
  async signIn() {
    await firebase.auth().signInWithPopup(githubProvider)
  },
  async signOut() {
    await firebase.auth().signOut()
  },
  fetchFirebaseUser(store, userId) {
    return new Promise((resolve) => {
      this.$firebaseDb.ref('profiles').child(userId).once('value', data => {
        if (data.exists())
          resolve(data.val())
        else
          resolve(null)
      })
    })
  },
  async fetchUser({ commit, dispatch }, userId) {
    const user = await dispatch('fetchFirebaseUser', userId)

    commit('setUser', { ...user, id: userId })
  },
  async onAuthStateChanged({ commit, dispatch }, user) {
    if (user) {
      const userProfile = await dispatch('fetchFirebaseUser')

      if (!userProfile)
        dispatch('createUser', user)

      dispatch('fetchUser', user.uid)
    }
    else {
      commit('setUser', null)
    }
  },
  async createUser({ dispatch }, user) {
    const courses = await dispatch('courses/fetchCourses', null, { root: true })

    for (const key in courses) {
      if (Object.prototype.hasOwnProperty.call(courses, key)) {
        const course = courses[key]

        course.repo = ''
        course.status = 'Not started'

        Reflect.deleteProperty(course, 'duration')
        Reflect.deleteProperty(course, 'effort')
      }
    }

    const newProfile = {
      avatar: get(user, 'providerData.0.photoURL'),
      name: get(user, 'providerData.0.displayName'),
      courses,
    }

    this.$firebaseDb.ref('profiles').child(user.uid).set(newProfile)
  },
}
