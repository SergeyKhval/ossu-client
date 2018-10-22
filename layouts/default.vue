<template>
  <v-app dark>
    <v-toolbar
      fixed
      app
    >
      <v-btn @click="signIn">sign in</v-btn>
      <v-btn @click="signOut">sign out</v-btn>
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
  import { mapActions, mapMutations } from 'vuex'

  export default {
    mounted() {
      // this.$firebaseApp.auth().onAuthStateChanged((user) => {
      //   if (user)
      //     this.$store.commit('auth/setUser', user)
      //   else
      //     this.$store.commit('auth/setUser', null)
      // })
    },
    methods: {
      ...mapMutations('auth', ['setUser']),
      ...mapActions('auth', ['signIn', 'signOut']),
    },
  }
</script>
