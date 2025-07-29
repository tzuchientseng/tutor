<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
  <nav class="navbar">
    <!-- 漢堡按鈕（手機版） -->
    <button
      class="menu-icon"
      :class="{ active: isOpen }"
      @click="toggleMenu"
      aria-label="切換選單"
      :aria-expanded="isOpen.toString()"
    >
      <span class="bar top"></span>
      <span class="bar middle"></span>
      <span class="bar bottom"></span>
    </button>

    <!-- 導覽連結 -->
    <ul v-if="isOpen || isDesktop" class="nav-links">
      <li><RouterLink to="/">首頁</RouterLink></li>
      <li><RouterLink to="/login">帳號登入</RouterLink></li>
      <li><RouterLink :to="{ name: 'CourseIntro' }">課程介紹</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  z-index: 100;
}

/* 漢堡按鈕 */
.menu-icon {
  width: 40px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 110;
}

.bar {
  width: 34px;
  height: 5px;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
}

.menu-icon.active .top {
  transform: translateY(7px) rotate(45deg);
}

.menu-icon.active .middle {
  opacity: 0;
}

.menu-icon.active .bottom {
  transform: translateY(-17px) rotate(-45deg);
}

/* 導覽連結容器 */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 個別 li 優化 */
.nav-links li {
  list-style: none;
  padding: 0rem 0.7rem;
}

/* link 樣式 */
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #007acc;
}

/* 桌機版樣式 */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex: 1;
  }

  .navbar {
    justify-content: center;
  }

  .menu-icon {
    display: none;
  }
}

/* 手機版樣式 */
@media (max-width: 767px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.);
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
  }
}
</style>

