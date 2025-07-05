<template>
    <div class="p-6 bg-gray-100 min-h-screen font-inter">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">Yêu cầu hỗ trợ</h3>
  
      <div class="flex flex-col gap-y-6">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="ticket-card"
        >
          <!-- Nội dung chính -->
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <p class="ticket-title">
                {{ ticket.subject }}
              </p>
              <p class="ticket-meta">
                <span class="customer-name">{{ ticket.customer }}</span> • Gửi lúc {{ ticket.date }}
              </p>
              <p class="ticket-message">
                {{ ticket.message }}
              </p>
            </div>
  
            <span
              class="ticket-status"
              :class="{
                'status-pending': ticket.status === 'Chờ xử lý',
                'status-done': ticket.status === 'Đã xử lý'
              }"
            >
              {{ ticket.status }}
            </span>
          </div>
  
          <!-- Nút phản hồi -->
          <div class="text-right mt-4">
            <button
              class="reply-button"
              :disabled="ticket.status === 'Đã xử lý'"
            >
              {{ ticket.status === 'Đã xử lý' ? 'Đã phản hồi' : 'Phản hồi ngay' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tickets = ref([
    {
      id: 1,
      subject: 'Không nhận được email xác nhận',
      customer: 'NGUYỄN THỊ HOA',
      message: 'Tôi đã đặt phòng nhưng không nhận được email xác nhận.',
      date: '01/07/2025',
      status: 'Chờ xử lý',
    },
    {
      id: 2,
      subject: 'Phòng không đúng như mô tả',
      customer: 'TRẦN VĂN B',
      message: 'Phòng tôi đặt khác với hình ảnh trên web.',
      date: '30/06/2025',
      status: 'Đã xử lý',
    },
    {
      id: 3,
      subject: 'Cần hóa đơn VAT',
      customer: 'LÊ THỊ C',
      message: 'Xin cung cấp hóa đơn VAT cho đặt phòng ngày 25/6.',
      date: '29/06/2025',
      status: 'Chờ xử lý',
    },
  ]);
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  /* Card */
  .ticket-card {
    background-color: #fff;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  /* Tiêu đề */
  .ticket-title {
    font-size: 18px;
    font-weight: 600;
    color: #006D77;
    margin-bottom: 6px;
  }
  
  /* Thông tin khách */
  .ticket-meta {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 6px;
  }
  
  .customer-name {
    color: #007C91;
    font-weight: 600;
  }
  
  /* Tin nhắn */
  .ticket-message {
    font-size: 14px;
    color: #374151;
  }
  
  /* Trạng thái */
  .ticket-status {
    font-size: 13px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 9999px;
    white-space: nowrap;
  }
  
  .status-pending {
    background-color: #fef9c3;
    color: #92400e;
  }
  
  .status-done {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  /* Nút */
  .reply-button {
    background-color: #199DB2;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: background-color 0.2s;
    border: none;
  }
  
  .reply-button:hover {
    background-color: #147e90;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  