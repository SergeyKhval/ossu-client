<template>
  <div v-if="resource">
    {{ resource.url }}
    {{ resource.title }}
    {{ resource.notes }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Resource',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters('resources', ['resourceById']),
      resource() {
        return this.resourceById(this.id)
      },
    },
  }
</script>
