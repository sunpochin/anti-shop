<template>
  <div class="container" style="padding: 4rem 1.5rem; max-width: 480px;">
    <div class="auth-card">
      <h1 style="text-align: center; margin-bottom: 0.5rem;">登入帳號</h1>
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: 2rem;">
        還沒有帳號？
        <NuxtLink to="/register" style="color: var(--color-primary); text-decoration: none;">
          立即註冊
        </NuxtLink>
      </p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="至少 6 個字元"
            required
            minlength="6"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? '登入中...' : '登入' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '登入 - Anti Shop',
  meta: [
    { name: 'description', content: '登入您的 Anti Shop 帳號' }
  ]
})

const router = useRouter()
const route = useRoute()

const formData = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: formData.value
    })

    if (response.success) {
      // 登入成功，導向原來的頁面或首頁
      const redirectTo = (route.query.redirect as string) || '/'
      router.push(redirectTo)
    }
  } catch (error: any) {
    console.error('登入失敗:', error)
    errorMessage.value = error.data?.message || '登入失敗，請檢查您的 Email 和密碼'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
