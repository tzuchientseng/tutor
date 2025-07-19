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
    } as SignUpForm
  }),
  actions: {

  },
})

