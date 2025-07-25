<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
import StyledBackground from '../components/auth/StyledBackground.vue'
import StyledCardContainer from '../components/auth/StyledCardContainer.vue'

const router = useRouter()
const isAuthenticated = ref<boolean>(false)

const handleLogout = () => {
  isAuthenticated.value = false
  router.push('/')
}
</script>

<template>
  <StyledBackground>
    <StyledCardContainer>
      <template v-if="isAuthenticated">
        <h2>歡迎!</h2>
        <h3>已登入</h3>
        <button class="logout-button" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <h2>歡迎登入!</h2>
        <h3>請填寫帳號密碼</h3>
        <LoginForm @login-success="isAuthenticated = true" />
      </template>
    </StyledCardContainer>
  </StyledBackground>
</template>

<style scoped>
.logout-button {
  cursor: pointer;
  padding: 10px 20px;
  background: #ff3333;
  color: #fff;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}

h2 {
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 12px;
  color: white;
}

h3 {
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 48px;
  font-weight: 400;
  font-size: 16px;
}

</style>

