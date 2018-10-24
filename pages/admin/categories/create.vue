<template>
  <div>
    <v-text-field
      v-model="title"
      label="title"
    />

    <v-btn @click="addCategory">create</v-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    layout: 'admin',
    data() {
      return {
        title: '',
      }
    },
    methods: {
      ...mapActions('courseCategories', ['createCategory']),
      addCategory() {
        this.createCategory({ title: this.title, active: true })
      },
    },
  }
</script>
