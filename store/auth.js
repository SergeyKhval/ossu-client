import firebase from 'firebase'

const githubProvider = new firebase.auth.GithubAuthProvider()

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    console.log('mutating user')
    state.user = user
  },
}

export const actions = {
  async signIn() {
    await firebase.auth().signInWithPopup(githubProvider)
  },
  async signOut() {
    await firebase.auth().signOut()
  },
}
