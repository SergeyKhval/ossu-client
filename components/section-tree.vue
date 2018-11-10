<template>
  <ul>
    <li
      v-for="section in sectionsSubtree(parent)"
      :key="section.id"
    >
      <span>{{ section.title }}</span>

      <sections-tree :parent="section.id"/>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SectionsTree',
    props: {
      parent: {
        type: String,
        default: null,
      },
    },
    computed: {
      ...mapGetters('sections', ['sectionsSubtree']),
    },
  }
</script>
