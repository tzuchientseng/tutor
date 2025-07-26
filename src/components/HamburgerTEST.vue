<!-- NavBar.vue -->
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
      <li><RouterLink to="/about">關於</RouterLink></li>
      <li><RouterLink to="/contact">聯絡</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function updateScreenSize() {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) isOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.menu-icon {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  background: none;
  cursor: pointer;
}

.bar {
  width: 40px;
  height: 5px;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
}

.menu-icon.active .top {
  transform: translateY(17px) rotate(45deg);
}

.menu-icon.active .middle {
  opacity: 0;
}

.menu-icon.active .bottom {
  transform: translateY(-17px) rotate(-45deg);
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

@media (max-width: 767px) {
  .nav-links {
    flex-direction: column;
  }
}
</style>
