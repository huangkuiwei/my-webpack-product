<template>
  <div class="app">
    Hello Webpack
    <img :src="require('../assets/images/01.jpg')">
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .app {
    color: #00000070;
    > img {
      width: 100%;
      transform: rotate(45deg);
    }
  }
</style>