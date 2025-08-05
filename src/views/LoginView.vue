<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterModal from '../components/auth/RegisterModal.vue'
import StyledBackground from '../components/auth/StyledBackground.vue'
import StyledCardContainer from '../components/auth/StyledCardContainer.vue'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const isAuthenticated = computed<boolean>(() => auth.isAuthenticated)
const userName = computed<string>(() => auth.getUserName)

const showRegisterModal = ref<boolean>(false)

function handleLogout(): void {
  auth.logout()
  router.push('/')
}

function openRegisterModal(): void {
  showRegisterModal.value = true
}

function closeRegisterModal(): void {
  showRegisterModal.value = false
}
</script>

<template>
  <StyledBackground>
    <StyledCardContainer>
      <template v-if="isAuthenticated">
        <h2>
          歡迎 ~ <span class="user-name">{{ userName }}</span> !
        </h2>
        <h3>您已登入</h3>
        <button class="logout-button" @click="handleLogout">登出</button>
      </template>

      <!-- 只有在未登入 & 沒有開啟註冊視窗時才顯示登入 -->
      <template v-else-if="!showRegisterModal">
        <h2>歡迎登入!</h2>
        <h3>請填寫帳號密碼</h3>
        <LoginForm />

        <p class="text-center mt-3 p-1">
          還沒有帳號？
          <a href="#" class="register-link" @click.prevent="openRegisterModal">點此註冊</a>
        </p>
      </template>

      <!-- 註冊 Modal -->
      <RegisterModal v-if="showRegisterModal" @cancel="closeRegisterModal" />

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

.user-name {
  font-weight: 700;
  font-size: 30px;
  color: black;
  margin-left: 8px;
}

h3 {
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 48px;
  font-weight: 400;
  font-size: 16px;
}

.register-hint {
  font-size: 1rem;
  color: #555;
}

.register-link {
  color: #0d6efd;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}

.register-link:hover {
  color: #0a58ca;
  text-decoration: none;
}
</style>

