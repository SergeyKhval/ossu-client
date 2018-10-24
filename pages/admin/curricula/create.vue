<template>
  <div>
    <v-text-field
      v-model="title"
      label="title"
    />

    <v-btn>create</v-btn>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {
      return {
        title: '',
      }
    },
  }
</script>
