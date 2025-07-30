import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/tutor/users' // `npm run deploy`
const API_URL = 'api/tutor/users';

interface User {
  name: string;
  account: string;
  token: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const savedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
    const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;
    return {
      user: parsedUser,
      token: parsedUser?.token || null,
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserName: (state) => state.user?.name ?? 'Guest',
  },

  actions: {
    async login(account: string, password: string) {
      try {
        const response = await fetch(`${API_URL}/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: account,
            password: password
          }),
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();

        const user: User = {
          name: data.name,
          account: data.account,
          token: data.access,
        };

        this.setUser(user);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error:', error.message);
          return { success: false, message: error.message };
        } else {
          console.error('Unknown error:', error);
          return { success: false, message: 'An unknown error occurred' };
        }
      }
    },

    async register(name: string, account: string, password: string, email: string, phone: string) {
      try {
        const response = await fetch(`${API_URL}/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            account: account,
            password: password,
            email: email,
            phone: phone,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Registration failed');
        }

        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Registration error:', error.message);
          return { success: false, message: error.message };
        } else {
          return { success: false, message: 'An unknown error occurred' };
        }
      }
    },

    setUser(user: User) {
      this.user = user;
      this.token = user.token;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', user.token || '');
    },

    logout() {
      this.user = null;
      this.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
  }
});
