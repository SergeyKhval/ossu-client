<template>
  <div>
    <resource
      v-for="id in resourceIds"
      :key="id"
      :id="id"
    />
  </div>
</template>

<script>
  import values from 'lodash/values'
  import Resource from './resource'

  export default {
    name: 'Resources',
    components: { Resource },
    props: {
      resources: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      resourceIds() {
        return values(this.resources)
      },
    },
  }
</script>
