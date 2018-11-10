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
  async fetchUser({ commit, dispatch }, userId) {
    const user = await this.$firebaseDb.fetchResource('users', userId)

    commit('setUser', { ...user, id: userId })
  },
  async onAuthStateChanged({ commit, dispatch }, user) {
    if (user) {
      const userProfile = await this.$firebaseDb.fetchResource('users', user.uid)

      if (!userProfile)
        dispatch('createUser', user)

      dispatch('fetchUser', user.uid)
    }
    else {
      commit('setUser', null)
    }
  },
  async createUser({ dispatch }, user) {
    const courses = await this.$firebaseDb.fetchResources('courses')

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

    this.$firebaseDb.setResource('profiles', user.uid, newProfile)
  },
}
