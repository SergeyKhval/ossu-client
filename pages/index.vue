<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <h1>hello ossu</h1>
      <ul>
        <li
          v-for="course in coursesList"
          :key="course.id"
        >
          {{ course.title }}
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('courses', ['coursesList']),
    },
    mounted() {
      this.subscribeToCourses()
    },
    methods: {
      ...mapActions('courses', ['subscribeToCourses']),
    },
  }
</script>
