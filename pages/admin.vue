<template>
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
      <nuxt/>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    async fetch({ store }) {
      store.dispatch('sections/subscribeToSections')
      store.dispatch('resources/subscribeToResources')
    },
    data() {
      return {
        links: [
          { title: 'sections', link: '/admin/sections' },
          { title: 'resources', link: '/admin/resources' },
        ],
      }
    },
    beforeDestroy() {
      this.$firebaseDb.unsubscribeFromResources('value', 'resources')
      this.$firebaseDb.unsubscribeFromResources('value', 'sections')
    },
  }
</script>
