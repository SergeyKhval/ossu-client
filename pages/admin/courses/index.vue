<template>
  <div>
    <v-btn to="/admin/courses/create">new</v-btn>

    <table>
      <tbody>
        <tr
          v-for="course in coursesList"
          :key="course.id"
        >
          <td> {{ course.title }}</td>
          <td> {{ course.duration }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'admin',
    computed: {
      ...mapGetters('courses', ['coursesList']),
    },
  }
</script>
