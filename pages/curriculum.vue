<template>
  <div>
    <h1>Computer Science</h1>
    <h2>Curriculum</h2>
    <p>37 courses in 30 categories</p>
    <hr>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    transition: 'page-static',
    computed: {
      ...mapGetters('courses', ['coursesList']),
      ...mapGetters('courseCategories', ['categoriesList']),
    },
    mounted() {
      this.subscribeToCourses()
      this.subscribeToCategories()
    },
    methods: {
      ...mapActions('courses', ['subscribeToCourses']),
      ...mapActions('courseCategories', ['subscribeToCategories']),
    },
  }
</script>
