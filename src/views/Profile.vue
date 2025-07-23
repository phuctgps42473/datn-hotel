<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <div class="max-w-4xl mx-auto p-10">
      <h3 class="text-3xl font-bold text-gray-800 mb-10 text-center">Thông tin tài khoản</h3>

      <div class="bg-white p-10 rounded-2xl shadow-lg border border-gray-300 space-y-12">
        <!-- Ảnh đại diện -->
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <img
            :src="user.avatar"
            alt="Avatar"
            class="w-24 h-24 rounded-full border-4 border-[#199DB2] object-cover shadow-md"
          />
          <div class="text-center sm:text-left">
            <p class="text-2xl font-semibold text-[#199DB2] mb-1">{{ user.name }}</p>
            <p class="text-gray-500 mb-2">{{ user.role }}</p>
            <label class="block text-sm text-[#199DB2] cursor-pointer hover:underline select-none">
              <input type="file" hidden @change="updateAvatar" />
              Thay đổi ảnh đại diện
            </label>
          </div>
        </div>

        <!-- Thông tin cá nhân -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="label" for="name">Họ và tên</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              class="input-field"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label class="label" for="email">Email</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="input-field"
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label class="label" for="phone">Số điện thoại</label>
            <input
              id="phone"
              v-model="user.phone"
              type="tel"
              class="input-field"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label class="label" for="bio">Mô tả</label>
            <input
              id="bio"
              v-model="user.bio"
              type="text"
              class="input-field"
              placeholder="Mô tả về bạn"
            />
          </div>
        </div>

        <!-- Đổi mật khẩu -->
        <div>
          <h4 class="text-xl font-semibold text-[#199DB2] mb-6">🔐 Đổi mật khẩu</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="label" for="currentPassword">Mật khẩu hiện tại</label>
              <input
                id="currentPassword"
                v-model="user.currentPassword"
                type="password"
                class="input-field"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div>
              <label class="label" for="newPassword">Mật khẩu mới</label>
              <input
                id="newPassword"
                v-model="user.newPassword"
                type="password"
                class="input-field"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
          </div>
        </div>

        <!-- Nút lưu + đăng xuất -->
        <div class="flex justify-end mt-6 gap-4">
          <button @click="logout" class="button-logout">🚪 Đăng xuất</button>
          <button @click="saveProfile" class="button-save">💾 Lưu thay đổi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const user = reactive({
  name: 'LÊ LÊ',
  email: 'lele@example.com',
  phone: '0909999999',
  bio: 'Quản trị viên hệ thống khách sạn ELARIS.',
  role: 'Admin',
  avatar: 'https://placehold.co/120x120/c0d9ef/2292a7?text=LÊ+LÊ',
  currentPassword: '',
  newPassword: '',
})

function saveProfile() {
  alert('Thông tin tài khoản đã được cập nhật!')
}

function updateAvatar(event) {
  const file = event.target.files[0]
  if (file) {
    const url = URL.createObjectURL(file)
    user.avatar = url
  }
}

function logout() {
  if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    alert('Bạn đã đăng xuất!')
    router.push('/admin-login')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f9fafb;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #9ca3af;
}

.input-field:focus {
  border-color: #199DB2;
  box-shadow: 0 0 8px rgba(25, 157, 178, 0.3);
  background-color: #fff;
}

button.button-save {
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 700;
  background-color: #199DB2;
  color: white;
  box-shadow: 0 5px 12px rgba(25, 157, 178, 0.35);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  border: none;
}

button.button-save:hover {
  background-color: #147e90;
  box-shadow: 0 6px 14px rgba(20, 126, 144, 0.6);
}

button.button-logout {
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 700;
  background-color: #e11d48;
  color: white;
  box-shadow: 0 5px 12px rgba(225, 29, 72, 0.35);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  border: none;
}

button.button-logout:hover {
  background-color: #be123c;
  box-shadow: 0 6px 14px rgba(190, 18, 60, 0.6);
}

.flex.justify-end.mt-6 {
  margin-top: 1.5rem;
}

.bg-white.p-10.rounded-2xl.shadow-lg.border {
  padding: 2.5rem !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 10px 20px rgba(25, 157, 178, 0.1) !important;
  border-color: #cbd5e1 !important;
}

.flex.flex-col.sm\:flex-row.items-center.gap-6 {
  gap: 1.5rem;
}

.flex.flex-col.sm\:flex-row.items-center.gap-6 > div label {
  margin-left: 0;
  display: inline-block;
  margin-top: 6px;
}

@media (min-width: 640px) {
  .flex.flex-col.sm\:flex-row.items-center.gap-6 > div label {
    margin-left: 1.2rem;
    margin-top: 0;
  }
}

@media (max-width: 640px) {
  .grid.grid-cols-1.md\:grid-cols-2.gap-6 {
    grid-template-columns: 1fr !important;
  }
}
</style>
