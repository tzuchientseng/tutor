<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores/authStore'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

const name = ref('')
const email = ref('')
const phone = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

async function handleRegister(): Promise<void> {
  if (!name.value || !email.value || !phone.value || !username.value || !password.value || !confirmPassword.value) {
    await Swal.fire({
      icon: 'warning',
      title: '欄位未填寫完整',
      text: '請確認所有欄位皆已填寫',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    })
    return
  }

  if (password.value !== confirmPassword.value) {
    await Swal.fire({
      icon: 'error',
      title: '密碼不一致',
      text: '密碼與確認密碼不相符，請重新確認',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    })
    return
  }

  isLoading.value = true

  const { success, message } = await authStore.register(
    name.value,
    username.value,
    password.value,
    email.value,
    phone.value
  )

  isLoading.value = false

  if (success) {
    await Swal.fire({
      icon: 'success',
      title: '註冊成功',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    })

    name.value = ''
    email.value = ''
    phone.value = ''
    username.value = ''
    password.value = ''
    confirmPassword.value = ''

    emit('success')
  } else {
    await Swal.fire({
      icon: 'error',
      title: '註冊失敗',
      html: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    })
  }
}

function handleCancel(): void {
  emit('cancel')
}
</script>

<template>
  <div class="form-wrapper">
    <h2 class="form-title">註冊帳號</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">姓名</label>
        <input id="name" v-model="name" type="text" placeholder="請輸入姓名" required />
      </div>

      <div class="form-group">
        <label for="username">帳號</label>
        <input id="username" v-model="username" type="text" placeholder="請輸入帳號" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="請輸入 Email" required />
      </div>

      <div class="form-group">
        <label for="phone">手機號碼</label>
        <input id="phone" v-model="phone" type="tel" placeholder="請輸入手機號碼" required />
      </div>

      <div class="form-group">
        <label for="password">密碼</label>
        <input id="password" v-model="password" type="password" placeholder="請輸入密碼" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">確認密碼</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="再次輸入密碼" required />
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '註冊中...' : '註冊' }}
      </button>

      <button type="button" class="cancel" @click="handleCancel" :disabled="isLoading">
        返回登入
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  box-sizing: border-box;
}

.form-title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

label {
  font-weight: bold;
  font-size: 14px;
}

input {
  font-size: 14px;
  padding: 0.45rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  font-size: 14px;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.cancel {
  background-color: #6c757d;
  margin-top: 0.4rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* RWD */
@media (max-width: 480px) {
  .form-wrapper {
    padding: 0rem 1rem;
  }

  .form-title {
    font-size: 1.4rem;
  }

  input,
  button {
    font-size: 13px;
  }

  .form-group {
    gap: 0.2rem;
  }

}
</style>

