<template>
  <div>
    <p id="path1">path1</p>
    <img src="@images/01.jpg" alt="">
    <el-button @click="getMessage">按钮</el-button>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(_join(['Hello', 'World'], ' '))
  },
  methods: {
    getMessage () {
      // 操作
    }
  }
}
</script>
