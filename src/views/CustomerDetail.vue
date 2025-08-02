<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <!-- Header + Nút thêm -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-3 mb-10">
      <h3 class="text-xl md:text-2xl font-semibold text-gray-800">Chi tiết khách hàng</h3>
    </div>

    <!-- Danh sách khách hàng -->
    <div class="flex flex-col gap-y-6 ">
      <div
        v-for="customer in customers"
        :key="customer.id"
        class="bg-card customer-card"
      >
        <!-- Cột 1: Avatar + tên -->
        <div class="customer-info">
          <img
            :src="customer.avatar"
            alt="Avatar"
            class="customer-avatar"
          />
          <div class="customer-details">
            <p class="customer-name truncate">{{ customer.name }}</p>
            <p class="customer-email">{{ customer.email }}</p>
          </div>
        </div>

        <!-- Cột 2: Thông tin -->
        <div class="customer-meta">
          <p><span>SĐT:</span> {{ customer.phone }}</p>
          <p><span>Ngày sinh:</span> {{ customer.birthdate }}</p>
          <p><span>Giới tính:</span> {{ customer.gender }}</p>
          <p><span>Địa chỉ:</span> {{ customer.address }}</p>
        </div>

        <!-- Cột 3: Nút -->
        <div class="action-button-wrapper">
          <button class="action-button">Lịch sử đặt phòng</button>
          <button class="edit-button">Chỉnh sửa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  {
    id: 1,
    name: 'NGUYỄN THỊ HOA',
    email: 'hoa.nguyen@gmail.com',
    phone: '0901234567',
    birthdate: '12/12/1990',
    gender: 'Nữ',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    avatar: 'https://placehold.co/80x80/87c6d2/ffffff?text=H',
  },
  {
    id: 2,
    name: 'TRẦN VĂN B',
    email: 'tranb@gmail.com',
    phone: '0912345678',
    birthdate: '05/03/1988',
    gender: 'Nam',
    address: '45 Nguyễn Huệ, Đà Nẵng',
    avatar: 'https://placehold.co/80x80/2d9cdb/ffffff?text=B',
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
h3{
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
.bg-card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.customer-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .customer-card {
    display: grid;
    grid-template-columns: 1.3fr 2fr auto;
    align-items: center;
    gap: 1.5rem;
  }
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.customer-avatar {
  width: 52px;
  height: 52px;
  border-radius: 9999px;
  object-fit: cover;
  border: 1.5px solid #cbd5e1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}

.customer-details {
  overflow: hidden;
}

.customer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #006d77;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.customer-email {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.customer-meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #374151;
  line-height: 1.4;
}

.customer-meta span {
  font-weight: 600;
  color: #007c91;
}

@media (min-width: 768px) {
  .customer-meta {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Nút hành động */
.action-button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.action-button,
.edit-button {
  width: 180px;
  text-align: center;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

/* Nút lịch sử */
.action-button {
  background-color: #199db2;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.action-button:hover {
  background-color: #147e90;
}

/* Nút chỉnh sửa */
.edit-button {
  background-color: #e0f2f1;
  color: #007c91;
  border: 1px solid #b2dfdb;
}

.edit-button:hover {
  background-color: #b2dfdb;
}

/* Nút thêm */
.add-button {
  background-color: #007c91;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #006072;
}
</style>
