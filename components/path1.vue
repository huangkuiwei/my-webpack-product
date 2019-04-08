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
      console.log(_join(['Hello', 'World'], ' '))
    },
    methods: {
      getMessage() {
        this.$http.get('https://api.apiopen.top/likePoetry?name=李白', {lock: true}).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>