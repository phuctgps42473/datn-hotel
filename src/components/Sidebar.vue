<template>
  <div class="sidebar">
  <div class="sidebar-header">
  <RouterLink to="/" class="block pl-2"> <h2>ELARIS HOTEL</h2>
  </RouterLink>
</div>
    <nav class="nav-links">
      <router-link
        to="/"
        class="nav-link"
        :class="{ active: route.path === '/' }"
      >
        <span class="icon"><i class="fa-solid fa-house"></i></span>
        <span class="label">Trang chủ</span>
      </router-link>

      <router-link
  to="/rooms"
  class="nav-link"
  :class="{ active: route.path.startsWith('/rooms') }"
>
  <span class="icon"><i class="fa-solid fa-door-open"></i></span>
  <span class="label">Danh sách phòng</span>
</router-link>

      <router-link
        to="/employees"
        class="nav-link"
        :class="{ active: route.path.startsWith('/employees') }"
      >
        <span class="icon"><i class="fa-solid fa-user"></i></span>
        <span class="label">Nhân viên</span>
      </router-link>

      <router-link
        to="/customers"
        class="nav-link"
        :class="{ active: route.path.startsWith('/customers') }"
      >
        <span class="icon"><i class="fa-solid fa-user-tie"></i></span>
        <span class="label">Khách hàng</span>
      </router-link>

      <router-link
        to="/room-types"
        class="nav-link"
        :class="{ active: route.path.startsWith('/room-types') }"
      >
        <span class="icon"><i class="fa-solid fa-bed"></i></span>
        <span class="label">Loại phòng</span>
      </router-link>

      <router-link
        to="/booking-details"
        class="nav-link"
        :class="{ active: route.path.startsWith('/booking-details') }"
      >
        <span class="icon"><i class="fa-solid fa-file-lines"></i></span>
        <span class="label">Chi tiết đặt phòng</span>
      </router-link>

      <router-link
        to="/invoices"
        class="nav-link"
        :class="{ active: route.path.startsWith('/invoices') }"
      >
        <span class="icon"><i class="fa-solid fa-receipt"></i></span>
        <span class="label">Hóa đơn</span>
      </router-link>

      <router-link
  to="/refunds"
  class="nav-link"
  :class="{ active: route.path.startsWith('/refunds') }"
>
  <span class="icon"><i class="fa-solid fa-money-check"></i></span>
  <span class="label">Hoàn trả</span>
</router-link>


<router-link
  to="/support"
  class="nav-link"
  :class="{ active: route.path.startsWith('/support') }"
>
  <span class="icon"><i class="fa-solid fa-headset"></i></span>
  <span class="label">Hỗ trợ</span>
</router-link>


      <router-link
        to="/settings"
        class="nav-link"
        :class="{ active: route.path.startsWith('/settings') }"
      >
        <span class="icon"><i class="fa-solid fa-gear"></i></span>
        <span class="label">Cài đặt</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 230px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar-header {
  padding: 22px;
  border-bottom: 1px solid #ddd;
}

.sidebar-header h2 {
  font-size: 20px;
  font-weight: bold;
  color: #2292A7;
  margin: 0;
  margin-left: 10px;
}

.nav-links {
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.nav-links a {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: #555;
  text-decoration: none;
  transition: background-color 0.2s;
  gap: 12px;
}

.nav-links a .icon {
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  font-size: 18px;
}

.nav-links a .label {
  white-space: nowrap;
}

.nav-links a:hover {
  background-color: #f0f0f0;
  border-right: 4px solid #2292A7;
}

.nav-links a.active {
  color: #2292A7;
  font-weight: bold;
  background-color: #e0f2f1;
  border-right: 4px solid #2292A7;
}
</style>
