<template>
  <div>
    <v-text-field
      v-model="course.title"
      label="title"
    />

    <v-text-field
      v-model="course.link"
      label="link"
    />

    <v-text-field
      v-model="course.duration"
      label="duration"
    />

    <v-text-field
      v-model="course.effort"
      label="effort"
    />

    <v-text-field
      v-model="course.prerequisites"
      label="prerequisites"
    />

    <v-text-field
      v-model="course.category"
      label="category"
    />

    <v-text-field
      v-model="course.curriculum"
      label="curriculum"
    />

    <v-btn @click="addCourse">create</v-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    layout: 'admin',
    data() {
      return {
        course: {
          title: '',
          link: '',
          duration: '',
          effort: '',
          prerequisites: '',
          category: '',
          curriculum: '',
        },
      }
    },
    methods: {
      ...mapActions('courses', ['createCourse']),
      addCourse() {
        this.createCourse(this.course)
      },
    },
  }
</script>
