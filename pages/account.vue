<template>
  <v-layout>
    <v-flex xs3>
      <v-card>
        <v-img
          :src="user && user.photoURL"
          contain
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    transition: 'page-static',
    middleware: ['auth'],
    computed: {
      ...mapState('auth', ['user']),
    },
  }
</script>
