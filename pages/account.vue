<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      md3
    >
      <v-card>
        <v-img
          src="https://avatars.githubusercontent.com/u/16866432?v=3"
          contain
        />
      </v-card>
    </v-flex>

    <v-flex
      xs12
      md9
    >
      <v-card>
        <v-card-text>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link to repository</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <user-course
                v-for="course in userCourses"
                :key="course.id"
                :course="course"
              />
            </tbody>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import UserCourse from '~/components/user-course'

  export default {
    transition: 'page-static',
    // middleware: ['auth'],
    components: { UserCourse },
    computed: {
      ...mapState('user', ['user']),
      ...mapGetters('user', ['userCourses']),
    },
  }
</script>
