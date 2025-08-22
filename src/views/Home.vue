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
          <p class="text-lg font-bold text-[#2292A7]">{{ formatCurrency(apiData.revenueToday) }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-calendar-check text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Tổng đơn đặt phòng</p>
          <p class="text-lg font-bold text-[#2292A7]">{{ apiData.totalBookings }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-door-open text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Phòng còn trống</p>
          <p class="text-lg font-bold text-[#2292A7]">{{ apiData.availableRooms }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center bg-[#E0F7FA] rounded-full">
          <i class="fa-solid fa-hotel text-xl text-[#2292A7]"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Trạng thái hoạt động</p>
          <p class="text-lg font-bold text-[#2292A7]">{{ apiData.systemStatus }}</p>
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
          <tr v-for="(booking, index) in apiData.recentBookings" :key="index" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ booking.customerName }}</td>
            <td class="py-3 px-4">Phòng {{ booking.roomNumber }}</td>
            <td class="py-3 px-4">{{ formatDate(booking.checkInDate) }}</td>
            <td class="py-3 px-4">{{ formatDate(booking.checkOutDate) }}</td>
            <td class="py-3 px-4">
              <span :class="statusClass(booking.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ translateStatus(booking.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
import { fetcher } from '@/utils/fetcher'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// --- Mock API data (replace bằng fetch thực tế)
const apiData = ref({
  revenueToday: 0,
  totalBookings: 0,
  availableRooms: 0,
  systemStatus: '',
  revenueChart: [],
  recentBookings: []
})

onMounted(async () => {
  let res = await fetcher("http://localhost:8080/api/admin/dashboard");
  const data = await res.json();
  console.log(data);
  apiData.value = data
});

const chartData = computed(() => ({
  labels: apiData.value.revenueChart.map(item => `Tháng ${item.month}`),
  datasets: [
    {
      label: 'Doanh thu (VNĐ)',
      backgroundColor: '#2292A7',
      data: apiData.value.revenueChart.map(item => item.totalRevenue),
      barThickness: 60,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false },
  },
}

// --- Helpers
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN')
}

function translateStatus(status) {
  switch (status) {
    case 'CONFIRMED': return 'Đã xác nhận'
    case 'CHECKED IN': return 'Đang ở'
    case 'CHECKED OUT': return 'Đã trả phòng'
    case 'CANCELED': return 'Đã hủy'
    default: return status
  }
}

function statusClass(status) {
  switch (status) {
    case 'CONFIRMED': return 'bg-green-100 text-green-800'
    case 'CHECKED IN': return 'bg-blue-100 text-blue-800'
    case 'CHECKED OUT': return 'bg-gray-200 text-gray-800'
    case 'CANCELED': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
