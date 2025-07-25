<script setup lang="ts"></script>

<template>
  <div id="background">
    <slot />
  </div>
</template>

<style scoped>
#background {
  display: grid;
  place-items: center;
  margin: 0;
  height: 100vh;
  padding: 0 24px;
  background-image: url('bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(139, 138, 136);
  font-family: 'Poppins', sans-serif;
  color: #f9f9f9;
}

* {
  box-sizing: border-box;
}
</style>

