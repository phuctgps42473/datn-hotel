<template>
    <div class="p-6 bg-gray-100 min-h-screen font-inter max-w-3xl">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Thông báo</h2>
  
      <div class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
        >
          <div>
            <p class="notification-title">{{ notification.title }}</p>
            <p class="notification-content">{{ notification.content }}</p>
            <p class="notification-time">{{ notification.time }}</p>
          </div>
          <span v-if="!notification.read" class="unread-dot"></span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const notifications = ref([
    {
      id: 1,
      title: 'Xác nhận đặt phòng thành công',
      content: 'Khách hàng Lê Lê đã đặt Phòng Đôi - 101 vào ngày 20/7.',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: 2,
      title: 'Đơn hoàn trả đã được xử lý',
      content: 'Hệ thống đã xử lý yêu cầu hoàn trả của khách hàng Nguyễn Văn A.',
      time: '1 ngày trước',
      read: true,
    },
    {
      id: 3,
      title: 'Thêm nhân viên mới',
      content: 'Bạn vừa thêm nhân viên "Minh Minh" vào hệ thống.',
      time: '3 ngày trước',
      read: true,
    },
  ])
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
    background-color: #f3f4f6;
    min-height: 100vh;
    padding: 1.5rem;
    max-width: 768px;
  }
  
  /* Tiêu đề căn trái */
  h2.text-2xl.font-bold {
    color: #1f2937;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  /* Danh sách thông báo */
  .space-y-4 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* Mỗi thông báo */
  .notification-item {
    background-color: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: default;
    transition: background-color 0.2s ease;
  
    width: 100%; /* rộng bằng container */
    box-sizing: border-box;
  }
  
  /* Cho phần chứa text chiếm hết không gian bên trái */
  .notification-item > div {
    flex: 1;
  }
  
  /* Hover nhẹ */
  .notification-item:hover {
    background-color: #f9fafb;
  }
  
  /* Tiêu đề thông báo */
  .notification-title {
    font-weight: 600;
    font-size: 1.125rem;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  /* Nội dung thông báo */
  .notification-content {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0;
    line-height: 1.4;
  }
  
  /* Thời gian */
  .notification-time {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.5rem;
  }
  
  /* Chấm đỏ báo chưa đọc */
  .unread-dot {
    flex-shrink: 0;
    margin-left: 0.75rem;
    margin-top: 0.5rem;
    width: 12px;
    height: 12px;
    background-color: #ef4444;
    border-radius: 9999px;
    box-shadow: 0 0 4px #ef4444aa;
  }
  </style>
  