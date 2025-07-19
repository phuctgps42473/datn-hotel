<template>
  <div class="bg-gray-100 min-h-screen font-inter px-6 pt-6">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Tổng quan khách sạn</h3>

    <!-- Thống kê -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-coins text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Tổng doanh thu hôm nay</p>
          <p class="text-lg font-bold text-[#2292A7]">120,000,000đ</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-calendar-check text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Tổng đơn đặt phòng</p>
          <p class="text-lg font-bold text-[#2292A7]">25</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-door-open text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Phòng còn trống</p>
          <p class="text-lg font-bold text-[#2292A7]">12</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-hotel text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Trạng thái hoạt động</p>
          <p class="text-lg font-bold text-[#2292A7]">Hoạt động</p>
        </div>
      </div>
    </div>

    <!-- Biểu đồ -->
    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
      <p class="text-xl font-bold text-gray-800 mb-4">Biểu đồ doanh thu tháng</p>
      <Bar :data="chartData" :options="chartOptions" class="w-full h-64" />
    </div>

    <!-- Đơn đặt phòng gần đây -->
    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <p class="text-xl font-bold text-gray-800 mb-4">Đơn đặt phòng gần đây</p>
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th class="py-3 px-4">Khách hàng</th>
            <th class="py-3 px-4">Phòng</th>
            <th class="py-3 px-4">Ngày nhận</th>
            <th class="py-3 px-4">Ngày trả</th>
            <th class="py-3 px-4">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in recentBookings" :key="booking.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ booking.customer }}</td>
            <td class="py-3 px-4">{{ booking.room }}</td>
            <td class="py-3 px-4">{{ booking.checkin }}</td>
            <td class="py-3 px-4">{{ booking.checkout }}</td>
            <td class="py-3 px-4">
              <span :class="statusClass(booking.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ booking.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const recentBookings = ref([
  { id: 1, customer: 'Hoàng Kim Ngân', room: 'Phòng 101', checkin: '20/5/2025', checkout: '22/5/2025', status: 'Đã xác nhận' },
  { id: 2, customer: 'Nguyễn Văn A', room: 'Phòng 102', checkin: '18/5/2025', checkout: '19/5/2025', status: 'Đang chờ' },
  { id: 3, customer: 'Trần Thị B', room: 'Phòng 105', checkin: '15/5/2025', checkout: '17/5/2025', status: 'Đã hủy' },
])

function statusClass(status) {
  if (status === 'Đã xác nhận') return 'bg-green-100 text-green-800'
  if (status === 'Đang chờ') return 'bg-yellow-100 text-yellow-800'
  if (status === 'Đã hủy') return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
}

const chartData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
  datasets: [
    {
      label: 'Doanh thu (VNĐ)',
      backgroundColor: '#2292A7',
      data: [10000000, 12000000, 9000000, 15000000, 17000000],
      barThickness: 60,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
