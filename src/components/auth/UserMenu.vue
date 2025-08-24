<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/authStore.ts'

const router = useRouter()
const auth = useAuthStore()
const { user, token } = storeToRefs(auth)

const isAuthenticated = computed(() => !!token.value)
const userName = computed(() => user.value?.name ?? 'Guest')

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

// 點擊外部關閉 dropdown
const onDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.user-menu')) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

const logout = () => {
  auth.logout()
  close()
  router.push({ name: 'Login' })
}
</script>

<template>
  <!-- 只有登入時才顯示整個 user-menu -->
  <div class="user-menu" v-if="isAuthenticated">
    <div class="user-area">
      <button
        class="user-trigger"
        @click="toggle"
        :aria-expanded="open.toString()"
        aria-haspopup="menu"
        aria-label="使用者選單"
      >
        <span class="user-text">Hi~ {{ userName }}!</span>
        <span class="chevron" aria-hidden="true">▾</span>
      </button>

      <ul
        v-show="open"
        class="dropdown"
        role="menu"
      >
        <li role="menuitem">
          <button class="dropdown-item" @click="logout">登出</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 讓整塊在 nav 末端靠右 */
.user-menu {
  margin-left: auto;
}

/* 容器維持 inline-block，以便靠右不撐滿 */
.user-area {
  position: relative;
  display: inline-block;
}

/* ==== 黑色主題按鈕（桌機 / 預設） ==== */
.user-trigger {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  border: 1px solid #1a1a1a;
  background: #111;          /* 黑色主體 */
  color: #fff;               /* 文字白 */
  border-radius: 9999px;     /* 膠囊型 */
  padding: .7rem 1rem;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  transition: transform .08s ease, filter .2s ease, background .2s ease, border-color .2s ease;
  will-change: transform;
}
.user-trigger:hover { filter: brightness(1.05); }
.user-trigger:active { transform: translateY(1px); }
/* 鍵盤可及性 */
.user-trigger:focus-visible {
  outline: 2px solid #3b82f6; /* 藍色聚焦環 */
  outline-offset: 2px;
}

.user-text { white-space: nowrap; }
.chevron { font-size: .8rem; opacity: .9; }

/* ==== Dropdown 黑色主題 ==== */
.dropdown {
  position: absolute;
  right: 0;
  top: 115%;
  min-width: 160px;
  background: #111;                /* 與按鈕一致的黑底 */
  color: #fff;
  border: 1px solid #222;
  border-radius: 10px;
  padding: .25rem;
  box-shadow: 0 10px 28px rgba(0,0,0,.28);
  z-index: 200;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  color: #fff;
  padding: .6rem .7rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background .2s ease, opacity .2s ease;
}
.dropdown-item:hover { background: #1a1a1a; }
.dropdown-item:active { opacity: .85; }

/* ==== 小螢幕 RWD：靠右、縮小、不撐滿 ==== */
@media (max-width: 767px) {
  .user-menu {
    /* 仍然靠右，但不佔滿整列 */
    display: inline-flex;
    justify-content: flex-end;
    width: auto;
    max-width: 100%;
  }

  .user-trigger {
    /* 縮小尺寸 */
    padding: .7rem .65rem;
    font-size: .92rem;
    gap: .3rem;

    /* 讓按鈕在窄螢幕不超出畫面 */
    max-width: calc(100vw - 1.25rem);
  }

  /* 當空間太窄，優先縮短名稱 */
  .user-text {
    max-width: 52vw;            /* 避免過長名字把按鈕撐爆 */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown {
    /* 手機上仍靠右，但視需要可改為 position: fixed */
    right: 0;
    left: auto;
    top: 110%;
    min-width: 140px;
    box-shadow: 0 12px 24px rgba(0,0,0,.32);
  }
}

/* 深色模式偏好（可選） */
@media (prefers-color-scheme: dark) {
  .user-trigger { border-color: #2a2a2a; background: #0f0f10; }
  .dropdown     { background: #0f0f10; border-color: #222; }
}
</style>

