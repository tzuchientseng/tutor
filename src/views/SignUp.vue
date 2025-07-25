<script setup lang="ts">
import { useSignupStore } from '@/stores/signupStore'
import Swal from 'sweetalert2'

const store = useSignupStore()

const handleSubmit = async () => {
  const success = await store.submitForm()

  if (success) {
    Swal.fire({
      icon: 'success',
      title: '報名成功！',
      text: '我們將盡快與您聯繫，謝謝您。',
      confirmButtonColor: '#28a745' 
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: '報名失敗',
      text: '請確認資料填寫正確，或稍後再試一次。',
      confirmButtonColor: '#dc3545'
    })
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="signup-form">
      <h1>家教報名表單</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">姓名</label>
          <input v-model="store.form.name" id="name" required />
        </div>
        <div>
          <label for="phone">手機</label>
          <input v-model="store.form.phone" id="phone" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="store.form.email" id="email" required />
        </div>
        <button class="btn btn-success mt-3" type="submit" :disabled="store.submitting">
          {{ store.submitting ? '送出中...' : '送出' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.signup-form {
}

.signup-form form div {
  margin: 1rem;
}

.signup-form label {
  display: block;
  margin-bottom: 1rem;
}

.signup-form input {
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
}
</style>

