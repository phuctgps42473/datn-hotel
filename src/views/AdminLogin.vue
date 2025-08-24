<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">Đăng nhập Admin</h2>

      <form class="login-form" @submit.prevent="handleLogin">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Nhập email" required />

        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="password" placeholder="Nhập mật khẩu" required />

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { fetcher } from '@/utils/fetcher';

const userStore = useUserStore();

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  if (email.value && password.value) {
    try {
      let res = await fetcher("/login", "POST", JSON.stringify({ email: email.value, password: password.value }));
      let data = await res.json();
      if (data.code === 200) {
        let accessToken = data.data.accessToken;
        let user = data.data.userInfo;
        userStore.setAccessToken(accessToken)
        userStore.setUserInfo(user);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!')
  }
}
</script>

<style scoped>
/* Toàn màn hình căn giữa */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to top right, #dbeafe, #ffffff, #bfdbfe);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Khung chính */
.login-container {
  width: 350px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Tiêu đề */
.login-title {
  text-align: center;
  color: #0284c7;
  font-size: 22px;
  margin-bottom: 20px;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
}

.login-form input {
  height: 36px;
  font-size: 14px;
  padding: 6px 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Nút đăng nhập */
.login-form button {
  height: 36px;
  background-color: #0284c7;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #0369a1;
}
</style>
