<template>
  <div>
    <p id="path1">path1</p>
    <img src="@images/01.jpg">
    <el-button @click="getMessage">按钮</el-button>
  </div>
</template>

<script>
  export default {
    created() {
      let a;
      a = _join(['Hello', 'World'], ' ');
      console.log(a);
    },
    mounted() {
      $('#path1').css('color', 'red')
    },
    methods: {
      getMessage() {
        this.$http.get('https://api.apiopen.top/likePoetry?name=%E6%9D%8E%E7%99%BD', {lock: true}).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>

<style scoped>

</style>