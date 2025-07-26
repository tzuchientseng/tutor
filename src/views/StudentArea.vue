<script setup lang="ts">
</script>

<template>
  <!-- 導覽列區塊 -->
  <nav class="nav-links" @click="handle">
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/login">登入</RouterLink>
  </nav>

  <!-- 學生專區區塊 -->
  <section class="main-content student-section">
    <div id="BannerWrapper">
      <h1 class="title">學生專區</h1>
    </div>
  </section>

  <!-- 老師時段區塊 -->
  <section class="main-content teacher-section">
    <h1 class="title">老師時段</h1>
  </section>
</template>

<style scoped>
.nav-links {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #004d4d;
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

.main-content {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

/* 學生專區樣式 */
.student-section {
  background-color: #0e2a38;
  min-height: calc(50vh - 35px);
}

#BannerWrapper {
  height: 70px;
  border-radius: 12px;
  background-color: #008080;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px;
  width: calc(100% - 20px);
}

/* 老師時段樣式 */
.teacher-section {
  background-color: #1a3c4d;
  min-height: calc(50vh - 35px);
  width: 100%;
}

.title {
  font-weight: bold;
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
}
</style>

