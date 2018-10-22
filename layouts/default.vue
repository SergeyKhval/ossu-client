<template>
  <v-app>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title>OSSU</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          to="/"
          flat
        >
          Home
        </v-btn>

        <v-btn
          flat
          to="/curriculum"
        >
          Curriculum
        </v-btn>

        <v-btn
          v-if="isAuthorized"
          flat
          to="/account"
        >
          My progress
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          flat
          to="/about"
        >
          about
        </v-btn>
        <v-btn
          v-if="!isAuthorized"
          flat
          @click="signIn"
        >
          log in with github
        </v-btn>

        <v-btn
          v-else
          flat
          @click="signOut"
        >
          sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('auth', ['isAuthorized']),
    },
    mounted() {
      this.$firebaseApp.auth().onAuthStateChanged(this.setUser)
    },
    methods: {
      ...mapMutations('auth', ['setUser']),
      ...mapActions('auth', ['signIn', 'signOut']),
    },
  }
</script>
