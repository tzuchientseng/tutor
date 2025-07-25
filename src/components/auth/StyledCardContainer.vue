<script setup lang="ts"></script>

<template>
  <div id="card-container">
    <slot />
  </div>
</template>

<style scoped>
#card-container {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 70px 30px 44px;
  border-radius: 10px;
  width: 100%;
  margin: 0 20px;
  background: rgba(0, 0, 0, 0.17);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: scale(0.8);
  animation: pop-in 1s ease forwards;
}

@media (min-width: 448px) {
  #card-container {
    margin: 0;
    width: 70%;
    min-width: 400px;
  }
}

@media (min-width: 628px) {
  #card-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 44px;
    width: 50%;
    max-width: 500px;
    min-width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
    animation: slide-in 1s ease forwards;
  }
}

#card-container h2 {
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 12px;
  color: white;
}

#card-container h3 {
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 48px;
  font-weight: 400;
  font-size: 16px;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

