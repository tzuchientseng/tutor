<script setup lang="ts">
import { ref } from 'vue'

// 定義可發出的事件
const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

function handleRegister(): void {
  if (!username.value || !password.value || !confirmPassword.value) {
    alert('請填寫所有欄位')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('密碼與確認密碼不一致')
    return
  }

  alert(`註冊成功！帳號：${username.value}`)

  username.value = ''
  password.value = ''
  confirmPassword.value = ''

  emit('success')
}

function handleCancel(): void {
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div class="mb-3">
      <label for="username" class="form-label">帳號</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="form-control"
        placeholder="請輸入帳號"
        required
      />
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">密碼</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="form-control"
        placeholder="請輸入密碼"
        required
      />
    </div>

    <div class="mb-3">
      <label for="confirmPassword" class="form-label">確認密碼</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        class="form-control"
        placeholder="再次輸入密碼"
        required
      />
    </div>

    <button type="submit" class="btn btn-primary w-100 mb-2">註冊</button>

    <button type="button" class="btn btn-secondary w-100" @click="handleCancel">返回登入</button>
  </form>
</template>

<style scoped>
form {
  font-size: 14px;
}
</style>

