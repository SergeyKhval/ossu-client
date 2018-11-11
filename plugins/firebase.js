import { initializeApp, database } from 'firebase'

const config = {
  apiKey: 'AIzaSyCAdnXPZMx-xn8lcXPqQ2w6v-C9gfr_D5w',
  authDomain: 'ossu-dev.firebaseapp.com',
  databaseURL: 'https://ossu-dev.firebaseio.com',
  projectId: 'ossu-dev',
}

const firebaseApp = initializeApp(config)
const db = database()

class FirebaseDB {
  constructor(firebaseDb) {
    this.firebaseDb = firebaseDb
  }

  fetchResources(resourceRef) {
    return new Promise((resolve) => {
      this.firebaseDb.ref(resourceRef).once('value', data => resolve(data.val()))
    })
  }

  subscribeToResources(event, resourceRef, callback) {
    this.firebaseDb.ref(resourceRef).on(event, data => callback(data.val()))
  }

  unsubscribeFromResources(event, resourceRef) {
    this.firebaseDb.ref(resourceRef).off(event)
  }

  fetchResource(resourceRef, id) {
    return new Promise((resolve) => {
      this.firebaseDb.ref(resourceRef).child(id).once('value', data => {
        if (data.exists())
          resolve(data.val())
        else
          resolve(null)
      })
    })
  }

  createResource(resourceRef, data) {
    this.firebaseDb.ref(resourceRef).push(data)
  }

  setResource(resourceRef, resourceId, data) {
    this.firebaseDb.ref(resourceRef).child(resourceId).set(data)
  }

  removeResource(resourceRef, resourceId) {
    return this.firebaseDb.ref(resourceRef).child(resourceId).remove()
  }

  addResourceToSection(sectionId, resourceId) {
    this.firebaseDb.ref('sections').child(sectionId).child('resources').push(resourceId)
  }
}

export default ({ app }, inject) => {
  inject('firebaseDb', new FirebaseDB(db))
  inject('firebaseApp', firebaseApp)
}
