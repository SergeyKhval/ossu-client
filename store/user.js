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
  fetchUser({ commit }, userId) {
    this.$firebaseDb.ref('profiles').child(userId).once('value', (data) => {
      const user = data.val()

      commit('setUser', user)
    })
  },
  onAuthStateChanged({ commit, dispatch }, user) {
    if (user) {
      this.$firebaseDb.ref('profiles').child(user.uid).once('value', data => {
        if (!data.exists())
          dispatch('createUser', user)

        dispatch('fetchUser', user.uid)
        this.$router.push('/account')
      })
    }
    else {
      commit('setUser', null)
      this.$router.push('/')
    }
  },
  createUser(store, user) {
    this.$firebaseDb.ref('courses')
      .once('value', (data) => {
        const courses = data.val()

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
      })
  },
}
