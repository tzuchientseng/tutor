<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const showIntro = ref(true)
const showMain = ref(false)
const displayedText = ref('')
const fadeOut = ref(false)
const fadeIn = ref(false)
const showAuthor = ref(false)

const greet = "學習的最佳夥伴 !"

onMounted(() => {
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')

  if (hasSeenIntro) {
    showIntro.value = false
    showMain.value = true
    fadeIn.value = true
  } else {
    let index = 0
    const interval = setInterval(() => {
      displayedText.value = greet.slice(0, index + 1)
      index++
      if (index >= greet.length) {
        clearInterval(interval)
        showAuthor.value = true

        setTimeout(() => {
          fadeOut.value = true
          setTimeout(() => {
            showIntro.value = false
            showMain.value = true
            setTimeout(() => {
              fadeIn.value = true
            }, 100)
          }, 1200)
        }, 1000)
      }
    }, 70)

    sessionStorage.setItem('hasSeenIntro', 'true')
  }

  // 預加載頁面組件資源
  import('./views/MainView.vue')
  import('./views/LoginView.vue')
  import('./views/SignUp.vue')
  import('./views/StudentArea.vue')
})
</script>

<template>
  <!-- 打字動畫 Intro -->
  <div v-if="showIntro" :class="{ 'fade-out': fadeOut }" class="intro-screen">
    <div class="text-center">
      <h1>{{ displayedText }}</h1>
      <p :class="['author-text', { 'author-visible': showAuthor }]">- by Sunny Tseng -</p>
    </div>
  </div>

  <!-- 主畫面 Router -->
  <div v-if="showMain" :class="{ 'fade-in': fadeIn }" class="main-screen">
    <RouterView />
  </div>
</template>

<style scoped>
.intro-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #171921;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  transition: opacity 1.2s ease-in-out;
  text-align: center;
  flex-direction: column;
}

.fade-out {
  animation: fadeOutAnim 1.2s forwards;
}

.main-screen {
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.fade-in {
  animation: fadeInAnim 1.2s forwards;
}

.author-text {
  margin-top: 1rem;
  font-size: 1rem;
  color: gold;
  opacity: 0;
  visibility: hidden;
  transition: all 0.8s ease;
  transform: translateY(10px);
}

.author-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

@keyframes fadeOutAnim {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes fadeInAnim {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

