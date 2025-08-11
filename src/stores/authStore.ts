import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/tutor/users' // `npm run deploy`
const API_URL = 'api/tutor/users/'

interface User {
  id: number;
  name: string;
  account: string;
  is_superuser: boolean;
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
    isSuperuser:    (state) => !!state.user?.is_superuser,
    getUserName:    (state) => state.user?.name ?? 'Guest',
    authHeader:     (state) => state.token ? { Authorization: `Bearer ${state.token}` } : {},
  },

  actions: {
    async login(account: string, password: string, remember = false) {
      try {
        const response = await fetch(`${API_URL}/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ account, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          const detail = data.detail || 'Login failed';
          if (detail.includes('not found')) throw new Error('Account does not exist');
          else if (detail.includes('disabled') || detail.includes('inactive')) throw new Error('Account is not active');
          else if (detail.includes('password')) throw new Error('Incorrect password');
          else throw new Error(detail);
        }

        const user: User = {
          id: data.user.id,
          name: data.user.name,
          account: data.user.account,
          is_superuser: !!data.user.is_superuser, // 後端有回傳這個欄位
          token: data.access,
        };

        this.setUser(user, remember);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error:', error.message);
          return { success: false, message: error.message };
        } else {
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
          body: JSON.stringify({ name, account, password, email, phone }),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // 將錯誤格式化成 HTML 清單
          const message = Object.entries(errorData)
            .map(
              ([field, messages]) =>
                `<li><strong>${field}</strong>: ${(messages as string[]).join(', ')}</li>`
            )
            .join('');

          throw new Error(`<ul style="text-align:left;">${message}</ul>`);
        }

        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, message: error.message };
        } else {
          return { success: false, message: 'An unknown error occurred' };
        }
      }
    },

    setUser(user: User, remember = false) {
      this.user = user;
      this.token = user.token;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(user));
      storage.setItem('token', user.token || '');
    },

    logout() {
      this.user = null;
      this.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

