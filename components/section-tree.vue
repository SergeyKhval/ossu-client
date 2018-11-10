<template>
  <v-expansion-panel>
    <v-expansion-panel-content
      v-for="section in sectionsSubtree(parent)"
      :key="section.id"
    >
      <div slot="header">{{ section.title }}</div>

      <div v-if="section.resources">
        <h2>Resources</h2>
        <resources :resources="section.resources"/>
      </div>

      <v-card>
        <v-card-text>
          <sections-tree :parent="section.id"/>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Resources from './resources'

  export default {
    name: 'SectionsTree',
    components: { Resources },
    props: {
      parent: {
        type: String,
        default: '0',
      },
    },
    computed: {
      ...mapGetters('sections', ['sectionsSubtree']),
    },
  }
</script>
