import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCAdnXPZMx-xn8lcXPqQ2w6v-C9gfr_D5w',
  authDomain: 'ossu-dev.firebaseapp.com',
  databaseURL: 'https://ossu-dev.firebaseio.com',
  projectId: 'ossu-dev',
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export default ({ app }, inject) => {
  inject('firebaseDb', db)
  inject('firebaseApp', firebaseApp)
}
