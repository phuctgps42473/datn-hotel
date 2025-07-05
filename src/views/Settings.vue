<template>
    <div class="p-6 bg-gray-100 min-h-screen font-inter">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">Cài đặt hệ thống</h3>
  
      <div class="settings-card">
        <!-- Thông tin khách sạn -->
        <div>
          <h4 class="section-title">Thông tin khách sạn</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="input-label">Tên khách sạn</label>
              <input v-model="settings.hotelName" type="text" class="input-setting" />
            </div>
            <div>
              <label class="input-label">Địa chỉ</label>
              <input v-model="settings.address" type="text" class="input-setting" />
            </div>
          </div>
        </div>
  
        <!-- Ngôn ngữ -->
        <div>
          <h4 class="section-title">Ngôn ngữ</h4>
          <select v-model="settings.language" class="input-setting w-full max-w-xs">
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
  
        <!-- Mật khẩu -->
        <div>
          <h4 class="section-title">Thay đổi mật khẩu</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="input-label">Mật khẩu hiện tại</label>
              <input type="password" v-model="settings.currentPassword" class="input-setting" />
            </div>
            <div>
              <label class="input-label">Mật khẩu mới</label>
              <input type="password" v-model="settings.newPassword" class="input-setting" />
            </div>
          </div>
        </div>
  
        <!-- Nút lưu -->
        <div class="text-right">
          <button
            @click="saveSettings"
            class="bg-[#199DB2] text-white px-6 py-3 rounded-lg hover:bg-[#147e90] transition duration-200 font-semibold shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const settings = reactive({
    hotelName: 'ELARIS HOTEL',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    language: 'vi',
    currentPassword: '',
    newPassword: '',
  });
  
  function saveSettings() {
    alert('Cài đặt đã được lưu thành công!');
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  .settings-card {
    background-color: #fff;
    padding: 32px;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    max-width: 800px;
    margin: 0; /* Căn trái */
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #006D77;
    margin-bottom: 16px;
  }
  
  .input-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }
  
  .input-setting {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
  }
  
  .input-setting:focus {
    border-color: #199DB2;
    box-shadow: 0 0 0 2px rgba(25, 157, 178, 0.3);
  }
  </style>
  