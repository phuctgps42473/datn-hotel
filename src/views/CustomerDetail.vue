<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-10">
      <h3 class="text-xl md:text-2xl font-semibold text-gray-800">Chi tiết khách hàng</h3>
    </div>

    <!-- Danh sách khách hàng -->
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <table class="w-full table-auto divide-y divide-gray-400">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tình trạng</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="customer in customers" :key="customer.id">
            <td class="px-4 py-2 text-sm text-gray-900">{{ customer.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-900">{{ customer.fullName }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ customer.email }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ customer.phoneNumber }}</td>
            <td class="px-4 py-2 text-sm">
              <span :class="getStatusClass(customer.isActive)">
                {{ customer.isActive ? 'Bình thường' : 'Đã chặn' }}
              </span>
            </td>
            <td class="px-4 py-2 text-sm text-right">
              <button @click="openEditPopup(customer)" class="text-gray-400 hover:text-blue-500 mr-5 mx-auto">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button @click="openBookingPopup(customer.id)" class="text-gray-400 mr-7 hover:text-red-500">
                <i class="fa-solid fa-book"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ========== PHẦN PHÂN TRANG ĐÃ ĐƯỢC THAY THẾ ========== -->
      <div v-if="totalElements > 0" class="mt-7 flex items-center justify-between text-sm text-gray-600">
        <div class="flex items-center">
          <span>Hiển thị mỗi trang</span>
          <select v-model="pageSize" class="ml-3 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none">
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </select>
        </div>
        <div>
          <span>
            Hiển thị
            <span class="font-semibold">{{ Math.min(currentPage * pageSize + 1, totalElements) }}</span> -
            <span class="font-semibold">{{ Math.min((currentPage + 1) * pageSize, totalElements) }}</span>
            của
            <span class="font-semibold">{{ totalElements }}</span>
          </span>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0" class="p-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1" class="p-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </div>


    <!-- Edit Popup (Không thay đổi) -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          Thông tin khách hàng
        </h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-gray-700">Họ tên</label>
            <input disabled v-model="editedUser.fullName" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input disabled v-model="editedUser.email" type="email"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số điện thoại</label>
            <input disabled v-model="editedUser.phoneNumber" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Vai trò</label>
            <input disabled v-model="editedUser.roleName" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Trạng thái</label>
            <select v-model="editedUser.isActive" class="w-full mt-1 p-2 border border-gray-300 rounded">
              <option :selected="editedUser.isActive" :value="true">Bình thường</option>
              <option :selected="!editedUser.isActive" :value="false">Bị chặn</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="showPopup = false"
              class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Hủy
            </button>
            <button type="submit" class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#1b7e91]">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Booking Popup (Không thay đổi) -->
    <div v-if="showBookingPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          Danh sách đặt phòng
        </h2>
        <table class="w-full table-auto divide-y divide-gray-400">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ngày nhận</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ngày trả</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tổng giá</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in bookings" :key="booking.id">
              <td class="px-4 py-2 text-sm text-gray-900">{{ booking.id }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(booking.checkInDate) }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(booking.checkOutDate) }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ formatPrice(booking.totalPrice) }}</td>
              <td class="px-4 py-2 text-sm">
                <span :class="getBookingStatusClass(booking.status)">
                  {{ booking.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4">
          <button @click="showBookingPopup = false" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { fetcher } from '@/utils/fetcher';
// ========== THÊM 'watch' ĐỂ THEO DÕI THAY ĐỔI ==========
import { onMounted, ref, watch } from 'vue';

const bookingData = [];

const customers = ref([]);
const showPopup = ref(false);
const showBookingPopup = ref(false);
const editedUser = ref({});
const errors = ref({});
const bookings = ref([]);

// Pagination State
const currentPage = ref(0);
// ========== THAY ĐỔI GIÁ TRỊ MẶC ĐỊNH CHO PHÙ HỢP VỚI DROPDOWN ==========
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

// Function to fetch customers with pagination
const fetchCustomers = async (page = 0, size = 6) => {
  try {
    const res = await fetcher(`/admin/user?page=${page}&size=${size}`);
    if (!res.ok) throw new Error('Network error');
    let data = await res.json();
    if (data.code === 200) {
      customers.value = data.data.content;
      // ========== SỬA LỖI NaN BẰNG CÁCH THÊM GIÁ TRỊ DỰ PHÒNG ==========
      totalPages.value = data.data.totalPages ?? 1;
      totalElements.value = data.data.totalElements ?? 0;
      currentPage.value = data.data.number ?? 0; // Đổi 'pageNo' thành 'number' (chuẩn hơn)
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchCustomers(currentPage.value, pageSize.value);
});

// ========== THÊM HÀM WATCH ĐỂ TỰ ĐỘNG GỌI API KHI pageSize THAY ĐỔI ==========
watch(pageSize, (newPageSize) => {
  // Khi người dùng chọn pageSize mới, luôn quay về trang đầu tiên
  fetchCustomers(0, newPageSize);
});


// Mở form sửa
function openEditPopup(user) {
  editedUser.value = { ...user };
  errors.value = {};
  showPopup.value = true;
}

// Mở danh sách đặt phòng
async function openBookingPopup(customerId) {
  // Thay thế bằng API call thực tế
  try {
    const res = await fetcher(`/admin/booking/user/${customerId}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.code === 200) {
      bookings.value = data.data;
      showBookingPopup.value = true;
    }
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    // Có thể thêm thông báo lỗi cho người dùng ở đây
  }
}

async function saveChanges() {
  const confirmed = window.confirm("Bạn có chắc chắn muốn lưu thông tin này?");
  if (!confirmed) return;

  try {
    const res = await fetcher("/admin/user/" + editedUser.value.id, "PUT", JSON.stringify({ isActive: editedUser.value.isActive }));
    if (!res.ok) throw new Error("Failed to update");

    // Refresh the current page data
    await fetchCustomers(currentPage.value, pageSize.value);
    showPopup.value = false;
  } catch (error) {
    console.error(error);
  }
}


// Trạng thái hoạt động
function getStatusClass(isActive) {
  return isActive
    ? 'px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800'
    : 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-200 text-gray-800';
}

// Trạng thái đặt phòng
function getBookingStatusClass(status) {
  const statusClasses = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CONFIRMED': 'bg-blue-100 text-blue-800',
    'CHECKED_IN': 'bg-green-100 text-green-800',
    'CHECKED_OUT': 'bg-gray-200 text-gray-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  };
  return `px-2 inline-flex text-xs font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
}

// Pagination navigation
const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchCustomers(page, pageSize.value);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

th,
td {
  padding: 12px;
  word-wrap: break-word;
  white-space: normal;
}
</style>