<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Danh sách Hoàn trả</h3>

    <div class="flex flex-col gap-y-8">
      <div
        v-for="refund in refunds"
        :key="refund.id"
        class="refund-card flex flex-col md:flex-row md:items-start justify-between gap-6"
      >
        <!-- Hình ảnh -->
        <div class="flex-shrink-0">
          <img
            :src="refund.image"
            alt="Phòng"
            class="room-image"
          />
        </div>

        <!-- Nội dung -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-800 w-full">
          <div>
            <p class="room-title">{{ refund.roomName }}</p>
            <p><span class="label">Mã hóa đơn:</span> <span class="value">{{ refund.invoiceId }}</span></p>
            <p><span class="label">Khách hàng:</span> <span class="value">{{ refund.customerName }}</span></p>
            <p><span class="label">Lý do hoàn trả:</span> <span class="value">{{ refund.reason }}</span></p>
          </div>
          <div>
            <p><span class="label">Ngày yêu cầu:</span> <span class="value">{{ refund.requestDate }}</span></p>
            <p><span class="label">Số tiền hoàn:</span> <span class="value">{{ refund.amount }}</span></p>
            <p><span class="label">Trạng thái:</span> <span class="value">{{ refund.status }}</span></p>
            <p><span class="label">Xử lý bởi:</span> <span class="value">{{ refund.staff }}</span></p>
          </div>
        </div>

        <!-- Nút xử lý -->
        <div class="mt-6 md:mt-0 md:ml-6">
          <button
            class="process-btn"
            :disabled="refund.status === 'Đã hoàn'"
          >
            {{ refund.status === 'Đã hoàn' ? 'Đã xử lý' : 'Xác nhận hoàn tiền' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const refunds = ref([
  {
    id: 1,
    roomName: 'Phòng Gia Đình - 205',
    invoiceId: 'HD-205',
    customerName: 'TRẦN THỊ B',
    reason: 'Hủy đặt phòng do thay đổi kế hoạch',
    requestDate: '11/6/2025',
    amount: '2.500.000 VND',
    status: 'Chờ xử lý',
    staff: 'Lan Anh',
    image: 'https://placehold.co/192x128/d1e7dd/006D77?text=PHONG+205',
  },
  {
    id: 2,
    roomName: 'Phòng Đôi - 101',
    invoiceId: 'HD-101',
    customerName: 'NGUYỄN VĂN A',
    reason: 'Không hài lòng với dịch vụ',
    requestDate: '18/5/2025',
    amount: '800.000 VND',
    status: 'Đã hoàn',
    staff: 'Minh Minh',
    image: 'https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg',
  },
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.refund-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.room-image {
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  max-width: 192px;
  height: 128px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.room-title {
  font-size: 20px;
  color: #006D77;
  font-weight: 700;
  margin-bottom: 8px;
}

.label {
  color: #4b5563;
  font-weight: 500;
}

.value {
  color: #007C91;
  font-weight: 600;
}

.process-btn {
  background-color: #199DB2;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.process-btn:hover {
  background-color: #147e90;
}

button:disabled {
  background-color: #d1d5db !important;
  color: white;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
