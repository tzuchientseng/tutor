/*
{
  "account": "0912345678",
  "password": "yourpassword"
}
{
  "refresh": "....",
  "access": "....",
  "user": {
    "id": 1,
    "account": "0912345678",
    "email": "example@gmail.com",
    "name": "Sunny"
  }
}
*/

// const API_URL = 'https://home.sunnytseng.com/api/tutor' // `npm run deploy`
const API_URL = 'api/tutor/'

import { defineStore } from 'pinia'

export interface SignUpForm {
  name: string
  phone: string
  email: string
}

export const useSignupStore = defineStore('signUp', {
  state: () => ({
    form: {
      name: '',
      phone: '',
      email: '',
    } as SignUpForm,
    submitting: false,
  }),

  actions: {
    async submitForm(): Promise<boolean> {
      this.submitting = true
      try {
        const response = await fetch(`${API_URL}/registration/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('API Error:', errorData)
          return false
        }

        // 成功後清空表單
        this.form.name = ''
        this.form.phone = ''
        this.form.email = ''
        return true
      } catch (error) {
        console.error('Network error:', error)
        return false
      } finally {
        this.submitting = false
      }
    }
  }
})

