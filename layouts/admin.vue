<template>
  <v-app>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title>OSSU</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container
        grid-list-md
        fluid
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs2>
            <v-navigation-drawer
              class="blue lighten-3"
              dark
              permanent
            >
              <v-list>
                <v-list-tile
                  v-for="link in links"
                  :key="link.title"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <nuxt-link :to="link.link">{{ link.title }}</nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-navigation-drawer>
          </v-flex>

          <v-flex xs10>
            <nuxt />
          </v-flex>
        </v-layout>

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
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        links: [
          { title: 'curricula', link: '/admin/curricula' },
          { title: 'categories', link: '/admin/categories' },
          { title: 'courses', link: '/admin/courses' },
        ],
      }
    },
    mounted() {
      this.subscribeToCourses()
      this.subscribeToCategories()
    },
    beforeDestroy() {
      this.unsubscribeFromCourses()
      this.unsubscribeFromCategories()
    },
    methods: {
      ...mapActions('courses', ['subscribeToCourses', 'unsubscribeFromCourses']),
      ...mapActions('courseCategories', ['subscribeToCategories', 'unsubscribeFromCategories']),
    },
  }
</script>
