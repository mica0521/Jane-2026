<template>
  <div>
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import 'element-plus/dist/index.css'
</script>

<style scoped>
.main-content {
  /* 头部高度为 81px */
  height: calc(100vh - 80px);
  background-color: #f5f5f5;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
}

/* 隐藏滚动条 - 需要时添加到元素上 */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}
</style>
