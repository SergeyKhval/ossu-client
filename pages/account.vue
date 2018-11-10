<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      md3
    >
      <v-card>
        <v-avatar
          tile
          size="100%"
        >
          <img :src="user && user.avatar">
        </v-avatar>
      </v-card>
      <h2 class="text-xs-center">{{ user && user.name }}</h2>
    </v-flex>

    <v-flex
      xs12
      md9
    >
      <v-card>
        <v-card-text>
          <p>Link to public profile: <a :href="userProfileLink">link</a></p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link to repository</th>
                <th>Status</th>
                <th/>
              </tr>
            </thead>
            <tbody/>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import get from 'lodash/get'
  import { mapState, mapGetters } from 'vuex'

  export default {
    transition: 'page-static',
    // middleware: ['auth'],
    computed: {
      ...mapState('user', ['user']),
      userProfileLink() {
        const userId = get(this.user, 'id', '')

        return `/profile/${userId}`
      },
    },
  }
</script>
