import firebase from 'firebase'

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
  async signIn({ dispatch }) {
    const { user } = await firebase.auth().signInWithPopup(githubProvider)
    await dispatch('fetchUser', user.uid)
    this.$router.push('/account')
  },
  async signOut() {
    await firebase.auth().signOut()
  },
  async fetchUser({ commit }, userId) {
    this.$firebaseDb.ref('profiles').child(userId).once('value', (data) => {
      const user = data.val()

      commit('setUser', user)
    })
  },
  async onAuthStateChanged({ commit, dispatch }, user) {
    if (user) {
      await dispatch('fetchUser', user.uid)
    }
    else {
      commit('setUser', null)
      this.$router.push('/')
    }
  },
}
