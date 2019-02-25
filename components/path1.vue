<template>
  <div>
    <p>path1</p>
    <img src="@images/01.jpg">
  </div>
</template>

<script>
  export default {
    created() {
      let a;
      a = _.join(['Hello', 'World'], ' ');
      console.log(a)
    }
  }
</script>

<style scoped>

</style>