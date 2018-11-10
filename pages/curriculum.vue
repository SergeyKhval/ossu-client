<template>
  <sections-tree/>
</template>

<script>
  import SectionsTree from '../components/section-tree'

  export default {
    transition: 'page-static',
    components: { SectionsTree },
    async fetch({ store }) {
      await store.dispatch('sections/fetchSections')
    },
  }
</script>
