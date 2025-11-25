<template>
  <div class="container" style="padding: 4rem 1.5rem; max-width: 480px;">
    <div class="auth-card">
      <h1 style="text-align: center; margin-bottom: 0.5rem;">註冊帳號</h1>
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: 2rem;">
        已經有帳號了？
        <NuxtLink to="/login" style="color: var(--color-primary); text-decoration: none;">
          立即登入
        </NuxtLink>
      </p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">姓名</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="您的姓名"
            required
          />
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">確認密碼</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="再次輸入密碼"
            required
            minlength="6"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? '註冊中...' : '註冊' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '註冊 - Anti Shop',
  meta: [
    { name: 'description', content: '註冊 Anti Shop 帳號' }
  ]
})

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    // 驗證密碼一致性
    if (formData.value.password !== formData.value.confirmPassword) {
      errorMessage.value = '密碼與確認密碼不一致'
      return
    }

    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: formData.value.name,
        email: formData.value.email,
        password: formData.value.password
      }
    })

    if (response.success) {
      // 註冊成功，導向首頁
      router.push('/')
    }
  } catch (error: any) {
    console.error('註冊失敗:', error)
    errorMessage.value = error.data?.message || '註冊失敗，請稍後再試'
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
