<template>
  <header class="main-header">
    <!-- Top Row: Greeting and User Info -->
    <div class="header-top-row">
      <!-- Left Section: Greeting and Date -->
      <div class="greeting-section">
        <h1 class="greeting-text">Xin chào, Lê Lê</h1>
        <p class="greeting-date">Ngày mới tốt lành</p>
      </div>

      <!-- Right Section: Notifications and User Profile -->
      <div class="user-info-section">
        <!-- 👇 Chuyển đến trang /notifications khi nhấn -->
        <button class="notification-button" @click="router.push('/notifications')">
          <i class="fa-solid fa-bell notification-icon"></i>
          <span class="notification-count">3</span>
        </button>

        <!-- 👇 Chuyển đến trang /profile khi nhấn -->
        <div class="user-profile" @click="router.push('/profile')">
          <img
            src="https://placehold.co/40x40/c0d9ef/2292a7?text=L%C3%8A%20L%C3%8A"
            alt="User Avatar"
            class="user-avatar"
          >
          <div class="user-details">
            <span class="user-name">LÊ LÊ</span>
            <span class="user-role">Admin</span>
          </div>
          <i class="fa-solid fa-chevron-down user-dropdown-icon"></i>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Search and Sort Section -->
    <div class="search-sort-section">
      <!-- Search Input -->
      <div class="search-input-wrapper">
        <input
          type="text"
          placeholder="Tìm kiếm"
          class="search-input"
        >
        <span class="search-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      <!-- Search Button -->
      <button class="search-button">Tìm kiếm</button>

      <!-- Sort Dropdown/Button -->
      <button class="sort-button">
        Sắp xếp <i class="fa-solid fa-chevron-down sort-icon"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.main-header {
  background-color: #f3f4f6;
  padding: 24px;
  font-family: 'Inter', sans-serif;
}

.header-top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.greeting-section {
  display: flex;
  flex-direction: column;
}

.greeting-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.greeting-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
}

.user-info-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-button {
  position: relative;
  padding: 8px;
  color: #4b5563;
  border-radius: 9999px;
  background: none;
  border: none;
  cursor: pointer;
}

.notification-button:hover {
  color: #2563eb;
  background-color: #e5e7eb;
}

.notification-icon {
  font-size: 1.25rem;
}

.notification-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border: 2px solid #60a5fa;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 500;
  color: #374151;
}

.user-role {
  color: #6b7280;
}

.user-dropdown-icon {
  color: #6b7280;
  font-size: 0.75rem;
}

.search-sort-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding-left: 40px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  color: #374151;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-button {
  background-color: #2292A7;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #134e4a;
}

.sort-button {
  background-color: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
}

.sort-button:hover {
  background-color: #f3f4f6;
}

.sort-icon {
  font-size: 0.75rem;
  margin-left: 4px;
}
</style>
