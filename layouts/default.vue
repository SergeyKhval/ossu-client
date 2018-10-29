<template>
  <v-app>
    <v-toolbar
      color="primary"
      fixed
      app
    >
      <v-toolbar-title class="white--text">OSSU</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          color="white"
          to="/"
          flat
        >
          Home
        </v-btn>

        <v-btn
          color="white"
          flat
          to="/curriculum"
        >
          Curriculum
        </v-btn>

        <v-btn
          v-if="isAuthorized"
          color="white"
          flat
          to="/account"
        >
          My progress
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          color="white"
          flat
          to="/about"
        >
          about
        </v-btn>
        <v-btn
          v-if="!isAuthorized"
          color="white"
          flat
          @click="signIn"
        >
          log in with github
        </v-btn>

        <v-btn
          v-else
          color="white"
          flat
          @click="signOut"
        >
          logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="#ededed"
      fixed
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('user', ['isAuthorized']),
    },
    mounted() {
      this.$firebaseApp.auth().onAuthStateChanged(this.onAuthStateChanged)
    },
    methods: {
      ...mapActions('user', ['signIn', 'signOut', 'onAuthStateChanged']),
    },
  }
</script>
