<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Chi tiết đặt phòng</h3>

    <!-- Tabs -->
    <div class="flex gap-4 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-full font-semibold',
          activeTab === tab
            ? 'bg-[#199DB2] text-white shadow'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Danh sách đơn theo tab -->
    <div class="flex flex-col gap-y-8">
      <div
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-start justify-between border border-gray-200"
      >
        <!-- Image -->
        <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            :src="booking.image"
            alt="Hình phòng"
            class="w-full md:w-48 h-100 md:h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-800 w-full">
          <div class="space-y-2">
            <p class="text-xl font-bold text-[#006D77] mb-2">{{ booking.roomName }}</p>
            <p><span class="text-gray-600">Ngày đặt:</span> <span class="text-[#007C91] font-semibold">{{ booking.bookingDate }}</span></p>
            <p><span class="text-gray-600">Ngày nhận phòng:</span> <span class="text-[#007C91] font-semibold">{{ booking.checkIn }}</span></p>
            <p><span class="text-gray-600">Ngày trả phòng:</span> <span class="text-[#007C91] font-semibold">{{ booking.checkOut }}</span></p>
            <p><span class="text-gray-600">Tên khách hàng:</span> <span class="text-[#007C91] font-semibold">{{ booking.customerName }}</span></p>
          </div>

          <div class="space-y-2">
            <p><span class="text-gray-600">Số khách:</span> <span class="text-[#007C91] font-semibold">{{ booking.guests }}</span></p>
            <p><span class="text-gray-600">Dịch vụ đặt trước:</span> <span class="text-[#007C91] font-semibold">{{ booking.service }}</span></p>
            <p><span class="text-gray-600">Trạng thái:</span> <span class="text-[#007C91] font-semibold">{{ booking.status }}</span></p>
            <p><span class="text-gray-600">Nhân viên xử lý:</span> <span class="text-[#007C91] font-semibold">{{ booking.staff }}</span></p>
            <p><span class="text-gray-600">Tổng tiền còn lại:</span> <span class="text-[#007C91] font-semibold">{{ booking.total }}</span></p>
          </div>
        </div>

        <!-- Button -->
        <div class="mt-6 md:mt-0 md:ml-6 space-y-2 text-right">
          <template v-if="booking.status === 'Chờ xác nhận'">
            <div class="flex flex-col gap-2 mt-4">
            <button
              @click="handleConfirm(booking.id)"
              class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#005960] transition"
            >
              Xác nhận
            </button>
            <button
              @click="handleCancel(booking.id)"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Hủy đơn
            </button>
          </div>
          </template>

          <template v-else-if="booking.status === 'Đã xác nhận'">
            <button
              @click="handlePayment(booking.id)"
              class="bg-[#2292A7] text-white px-6 py-2 rounded hover:bg-[#005960] transition mt-12"
            >
              Thanh toán
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabs = ['Chờ xác nhận', 'Đã xác nhận', 'Đã hủy'];
const activeTab = ref('Chờ xác nhận');

const bookings = ref([
  {
    id: 1,
    roomName: 'Phòng Khách Vua - 003',
    bookingDate: '12/5/2025',
    checkIn: '20/5/2025',
    checkOut: '22/5/2025',
    customerName: 'HOÀNG KIM NGÂN',
    guests: 2,
    service: 'Không sử dụng',
    status: 'Chờ xác nhận',
    staff: 'Minh Minh',
    total: '1.200.000 VND',
    image: 'https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg',
  },
  {
    id: 2,
    roomName: 'Phòng Đôi - 101',
    bookingDate: '10/5/2025',
    checkIn: '15/5/2025',
    checkOut: '17/5/2025',
    customerName: 'NGUYỄN VĂN A',
    guests: 2,
    service: 'Bữa sáng',
    status: 'Đã xác nhận',
    staff: 'Lan Anh',
    total: '800.000 VND',
    image: 'https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg',
  },
  {
    id: 3,
    roomName: 'Phòng Gia Đình - 205',
    bookingDate: '01/6/2025',
    checkIn: '05/6/2025',
    checkOut: '10/6/2025',
    customerName: 'TRẦN THỊ B',
    guests: 4,
    service: 'Đưa đón sân bay',
    status: 'Đã hủy',
    staff: 'Quang Huy',
    total: '2.500.000 VND',
    image: 'https://placehold.co/192x128/d1e7dd/006D77?text=PHONG+205',
  },
  {
    id: 4,
    roomName: 'Phòng Gia Đình - 205',
    bookingDate: '01/6/2025',
    checkIn: '05/6/2025',
    checkOut: '10/6/2025',
    customerName: 'TRẦN THỊ B',
    guests: 4,
    service: 'Đưa đón sân bay',
    status: 'Chờ xác nhận',
    staff: 'Quang Huy',
    total: '2.500.000 VND',
    image: 'https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg',
  },
]);

const filteredBookings = computed(() =>
  bookings.value.filter(b => b.status === activeTab.value)
);

// Tạm thời chỉ log ra, bạn có thể gọi API thật hoặc thay đổi trạng thái
const handleConfirm = id => {
  if (confirm('Bạn có chắc chắn muốn xác nhận đơn này không?')) {
    const booking = bookings.value.find(b => b.id === id);
    if (booking) {
      booking.status = 'Đã xác nhận';
      activeTab.value = 'Đã xác nhận';
      alert('Đơn đã được xác nhận.');
    }
  }
};

const handleCancel = id => {
  if (confirm('Bạn có chắc chắn muốn hủy đơn này không?')) {
    const booking = bookings.value.find(b => b.id === id);
    if (booking) {
      booking.status = 'Đã hủy';
      activeTab.value = 'Đã hủy';
      alert('Đơn đã bị hủy.');
    }
  }
};

const handlePayment = id => {
  console.log('Thanh toán đơn:', id);
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
