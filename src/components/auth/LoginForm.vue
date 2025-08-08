<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores/authStore.ts'

const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')
const stayLoggedIn = ref(false)

const router = useRouter()
const auth = useAuthStore()

async function handleSubmit() {
  Swal.fire({
    title: 'Logging in...',
    text: 'Please wait while we log you in.',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading(),
  })

  const result = await auth.login(username.value, password.value, stayLoggedIn.value)

  Swal.close()

  if (result.success) {
    Swal.fire({
      title: 'Success',
      text: 'Login successful!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      emit('login-success')
      router.push('/student-area')
    })
  } else {
    Swal.fire({
      title: 'Login Failed',
      text: result.message,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    })
  }
}
</script>

<template>
  <form id="login-form" @submit.prevent="handleSubmit">
    <input type="text" v-model="username" placeholder="帳號" required />
    <input type="password" v-model="password" placeholder="密碼" required />

    <label>
      <span class="custom-checkbox-wrapper">
        <input type="checkbox" v-model="stayLoggedIn" />
        <span class="custom-checkbox"></span>
      </span>
      <span class="custom-checkbox-text">保持登入</span>
    </label>

    <button type="submit">登入</button>
  </form>
</template>

<style scoped>
#login-form {
  width: 100%;
  display: grid;
  gap: 16px;
}

#login-form input,
#login-form button {
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: 0;
}

#login-form input {
  color: rgba(255, 255, 255, 0.96);
  background: rgba(255, 255, 255, 0.08);
  font-family: inherit;
  font-size: 16px;
  padding: 0 16px;
}

#login-form input:focus {
  outline: 2px solid #3399ff;
}

#login-form input::placeholder {
  color: rgba(255, 255, 255, 0.38);
}

#login-form button {
  cursor: pointer;
  padding: 0 16px;
  background: #3399ff;
  color: #f9f9f9;
  border: 0;
}

label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 6px 0 8px;
  color: rgba(255, 255, 255, 0.5);
}

.custom-checkbox-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.custom-checkbox-wrapper input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.custom-checkbox {
  display: block;
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  transition: all 0.375s;
}

.custom-checkbox-wrapper input:checked + .custom-checkbox {
  transform: rotate(45deg);
  width: 14px;
  margin-left: 12px;
  margin-top: -2px;
  border-color: #3399ff;
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 0;
}
</style>

