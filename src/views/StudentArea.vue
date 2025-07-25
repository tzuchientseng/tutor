<script setup lang="ts">
import NavBar from '../components/auth/NavBar.vue'
</script>

<template>
  <NavBar />
  <div id="BannerWrapper">
    <h1 class="title">學生專區</h1>
  </div>
  <div class="main-content">
    <nav class="nav-links">
      <RouterLink to="/">首頁</RouterLink>
      <RouterLink to="/login">登入</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
#BannerWrapper {
  height: 70px;
  border-radius: 12px;
  background-color: #008080;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px;
  box-sizing: border-box;
  /* ✅ padding 和 border 會包含在 width/height 裡
     ❌ margin 不包含在 box-sizing 的計算中
     📌 預設是 content-box（padding 和 border 不包含在寬高中）*/
  width: calc(100% - 20px); /* 預留 margin 左右空間 */
}

.title {
  font-weight: bold;
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
}

.main-content {
  background-color: #0e2a38;
  color: #ffffff;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.nav-links {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #00ffff;
}
</style>

