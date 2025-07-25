<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useSignupStore, SignUpForm } from '@/stores/signupStore'

const form = reactive<SignUpForm>({
  name: '',
  phone: '',
  email: '',
  subject: '',
  note: ''
})

const successMessage = ref<string>('')
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)

const store = useSignupStore()

const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  loading.value = true

  try {
    await store.submitForm(form)
    successMessage.value = '報名成功，我們將儘快與您聯繫！'
    // 清空表單
    Object.keys(form).forEach((key) => {
      form[key as keyof SignUpForm] = ''
    })
  } catch (err: any) {
    errorMessage.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signup-form">
    <h2>家教報名表單</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">姓名</label>
        <input v-model="form.name" id="name" required />
      </div>
      <div>
        <label for="phone">電話</label>
        <input v-model="form.phone" id="phone" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="form.email" id="email" type="email" required />
      </div>
      <div>
        <label for="subject">報名科目</label>
        <input v-model="form.subject" id="subject" required />
      </div>
      <div>
        <label for="note">備註</label>
        <textarea v-model="form.note" id="note"></textarea>
      </div>

      <button type="submit" :disabled="loading">送出</button>
      <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.signup-form {
  max-width: 500px;
  margin: 0 auto;
}
.signup-form form div {
  margin-bottom: 1rem;
}
.signup-form label {
  display: block;
  margin-bottom: 0.25rem;
}
.signup-form input,
.signup-form textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
</style>

