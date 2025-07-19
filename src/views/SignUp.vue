<script setup lang="ts">
import { reactive } from 'vue'
import { useSignupStore, SignUpForm } from '@/stores/signupStore'

const formData = reactive<SignUpForm>({
  name: '',
  phone: '',
  email: '',
})

const store = useSignupStore()

const handleSubmit = async () => {


}

</script>

<template>
  <div class="conainer mt-5">
    <div class="signup-form">
      <h1>家教報名表單</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">姓名</label>
          <input v-model="formData.name" id="name" required/>
        </div>
        <div>
          <label for="phone">手機</label>
          <input v-model="formData.phone" id="phone" required/>
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="formData.email" id="email" required/>
        </div>
        <button class="btn btn-success mt-3" type="submit">送出</button>
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

.signup-form input,
.signup-form textarea {
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box; /*不會因為 padding 而變太寬、跑版*/
}
</style>

