<template>
  <div>
    <h1>Computer Science</h1>
    <h2>Curriculum</h2>
    <p>37 courses in 30 categories</p>
    <v-card
      v-for="category in categoriesList"
      :key="category.id"
    >
      <v-card-title>
        <h3>{{ category.title }}</h3>
      </v-card-title>

      <v-card-text>
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Duration</td>
              <td>Effort</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="course in getCategoryCourses(category.title)"
              :key="course.id"
            >
              <td><a :href="course.link">{{ course.title }}</a></td>
              <td>{{ course.duration }}</td>
              <td>{{ course.effort }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
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
    beforeDestroy() {
      this.unsubscribeFromCourses()
      this.unsubscribeFromCategories()
    },
    methods: {
      ...mapActions('courses', ['subscribeToCourses', 'unsubscribeFromCourses']),
      ...mapActions('courseCategories', ['subscribeToCategories', 'unsubscribeFromCategories']),
      getCategoryCourses(categoryName) {
        return this.coursesList.filter(course => course.category === categoryName)
      },
    },
  }
</script>
