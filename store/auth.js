import firebase from 'firebase'

const githubProvider = new firebase.auth.GithubAuthProvider()

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthorized(state) {
    return state.user && state.user.uid
  },
}

export const mutations = {
  setUser(state, user) {
    if (user && user.providerData) {
      state.user = user.providerData[0]
    }
    else {
      state.user = null
      this.$router.push('/')
    }
  },
}

export const actions = {
  async signIn() {
    await firebase.auth().signInWithPopup(githubProvider)
    this.$router.push('/account')
  },
  async signOut() {
    await firebase.auth().signOut()
  },
}
