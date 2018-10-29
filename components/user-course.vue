<template>
  <tr>
    <td>
      <a :href="course.link">
        {{ course.title }}
      </a>
    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      course: {
        type: Object,
        default: () => ({ title: '' }),
      },
    },
  }
</script>
