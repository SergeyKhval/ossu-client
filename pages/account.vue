<template>
  <v-layout>
    <v-flex xs3>
      <v-card>
        <v-img
          src="https://avatars.githubusercontent.com/u/16866432?v=3"
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
    // middleware: ['auth'],
    computed: {
      ...mapState('auth', ['user']),
    },
  }
</script>
