<template>
  <div>
    <p id="path1">path1</p>
    <img src="@images/01.jpg">
  </div>
</template>

<script>
  export default {
    created() {
      let a;
      a = _.join(['Hello', 'World'], ' ');
      console.log(a)
    },
    mounted() {
      $('#path1').css('color', 'red')
    }
  }
</script>

<style scoped>

</style>