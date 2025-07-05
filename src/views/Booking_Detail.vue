<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6" >Chi tiết đặt phòng</h3>

    <div class="flex flex-col gap-y-8"> <!-- cách nhau 2rem -->
      <div
        v-for="booking in bookings"
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
        <div class="flex-1 grid  grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-800 w-full">
           <div class="content">
          <div>
            <p class="text-xl font-bold text-[#006D77] mb-2">{{ booking.roomName }}</p>
            <p><span class="text-gray-600">Ngày đặt:</span> <span class="text-[#007C91] font-semibold">{{ booking.bookingDate }}</span></p>
            <p><span class="text-gray-600">Ngày nhận phòng:</span> <span class="text-[#007C91] font-semibold">{{ booking.checkIn }}</span></p>
            <p><span class="text-gray-600">Ngày trả phòng:</span> <span class="text-[#007C91] font-semibold">{{ booking.checkOut }}</span></p>
            <p><span class="text-gray-600">Tên khách hàng:</span> <span class="text-[#007C91] font-semibold">{{ booking.customerName }}</span></p>
          </div>
          </div>

          <div>
            <p><span class="text-gray-600">Số khách:</span> <span class="text-[#007C91] font-semibold">{{ booking.guests }}</span></p>
            <p><span class="text-gray-600">Dịch vụ đặt trước:</span> <span class="text-[#007C91] font-semibold">{{ booking.service }}</span></p>
            <p><span class="text-gray-600">Trạng thái:</span> <span class="text-[#007C91] font-semibold">{{ booking.status }}</span></p>
            <p><span class="text-gray-600">Nhân viên xử lý:</span> <span class="text-[#007C91] font-semibold">{{ booking.staff }}</span></p>
            <p><span class="text-gray-600">Tổng tiền còn lại:</span> <span class="text-[#007C91] font-semibold">{{ booking.total }}</span></p>
          </div>
        </div>

        <!-- Button -->
        <div class=" mt-6 md:mt-0 md:ml-6">
          <button class="bg-[#199DB2] text-white px-6 py-3 rounded-lg hover:bg-[#147e90] transition duration-200 font-semibold shadow-md">
            Xác nhận đơn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
    status: 'Đã xác nhận',
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
    status: 'Đang chờ xử lý',
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
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
.font-inter {
  font-family: 'Inter', sans-serif;
}

.content{
  padding-left: 20px;
}

p{
  margin-bottom: 4px;
}

button{
  margin-top: 50px;
  margin-right: 40px;
}


</style>
