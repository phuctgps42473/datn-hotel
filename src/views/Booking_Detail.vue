<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Đặt phòng</h3>

    <!-- Tabs -->
    <div class="flex gap-4 mb-6">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
        'px-4 py-2 rounded-full font-semibold',
        activeTab === tab
          ? 'bg-[#199DB2] text-white shadow'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
      ]">
        {{ tab }}
      </button>
    </div>

    <!-- Nút Thêm Mới -->
    <div class="mb-4 text-right">
      <button @click="openAddPopup" class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#1b7e91]">
        <i class="fa-solid fa-plus mr-1"></i> Thêm mới
      </button>
    </div>

    <!-- Bảng danh sách -->
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <table class="w-full table-auto divide-y divide-gray-400">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phòng</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email khách</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ngày đặt</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check in</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check out</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="booking in bookings" :key="booking.id">
            <td class="px-4 py-2 text-sm text-gray-900">{{ booking.roomName }}</td>
            <td class="px-4 py-2 text-sm text-gray-900">{{ booking.customerEmail }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(booking.bookingDate) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(booking.checkInDate) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(booking.checkOutDate) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatPrice(booking.totalPrice) }}</td>
            <td class="px-4 py-2 text-sm text-right">
              <button @click="openEditPopup(booking)" class="text-gray-400 hover:text-blue-500 mr-10 mx-auto">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ========== PHẦN PHÂN TRANG MỚI ========== -->
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
            <span class="font-semibold">{{ Math.min((currentPage * pageSize) + 1, totalElements) }}</span> -
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

    <!-- Add/Edit Booking Popup -->
    <div v-if="showAddPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg w-[800px] shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          <span v-if="!isEditMode">Thêm đặt phòng mới</span>
          <span v-else>Cập nhật đặt phòng</span>
        </h2>
        <form @submit.prevent="saveBooking">
          <!-- Các trường form đầy đủ -->
          <div class="mb-4">
            <label class="block text-gray-700">Phòng</label>
            <input v-if="isEditMode" :disabled="isEditMode" :value="'Phòng ' + editedBooking.roomName"
              type="text" required class="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
            <select v-else v-model="editedBooking.roomId" class="w-full mt-1 p-2 border border-gray-300 rounded"
              @change="calculateTotalPrice">
              <option disabled value="0">-- Chọn phòng --</option>
              <option v-for="{ id, roomName, pricePerNight } in roomsForBooking" :key="id" :value="id">Phòng {{ roomName
              }} ({{ formatPrice(pricePerNight) }} / đêm)</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email Khách hàng</label>
            <input :disabled="isEditMode" v-model="editedBooking.customerEmail" type="email" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" :class="{'bg-gray-100': isEditMode}" />
            <p v-if="errors.customerEmail" class="text-red-500 text-sm mt-1">{{ errors.customerEmail }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Ngày nhận phòng</label>
            <input v-if="!isEditMode" v-model="editedBooking.checkInDate" type="date" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" @change="calculateTotalPrice" />
            <input v-else disabled :value="formatDate(editedBooking.checkInDate)" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Ngày trả phòng</label>
            <input v-if="!isEditMode" v-model="editedBooking.checkOutDate" @change="calculateTotalPrice"
              type="date" required class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <input v-else disabled :value="formatDate(editedBooking.checkOutDate)" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
            <p v-if="errors.checkOutDate" class="text-red-500 text-sm mt-1">{{ errors.checkOutDate }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số khách</label>
            <input :disabled="isEditMode" v-model.number="editedBooking.numberOfGuests" type="number" min="1"
              required class="w-full mt-1 p-2 border border-gray-300 rounded" :class="{'bg-gray-100': isEditMode}" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Dịch vụ</label>
            <div class="mt-1 grid grid-cols-2 gap-2">
              <div v-for="service in availableServices" :key="service.id" class="flex items-center">
                <input :disabled="isEditMode" v-model="editedBooking.servicesIds"
                  @change="calculateTotalPrice" type="checkbox"
                  :value="service.id"
                  class="mr-2 h-4 w-4 text-[#2292A7] border-gray-300 rounded focus:ring-[#2292A7]" />
                <label class="text-gray-700">
                  <span>{{ service.serviceName }}</span>
                  <span> ({{ formatPrice(service.price) }})</span>
                </label>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Tổng tiền</label>
            <input readonly :value="formatPrice(editedBooking.totalPrice)"
              class="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Trạng thái</label>
            <select v-model="editedBooking.status" class="w-full mt-1 p-2 border border-gray-300 rounded">
              <option v-for="status in tabs" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Thanh toán</label>
            <div v-if="isEditMode" class="space-y-2">
                <div v-for="(payment, index) in editedBooking.payments" :key="`old-${index}`" class="flex gap-2 p-2 bg-gray-100 rounded">
                    <input disabled :value="formatPrice(payment.amount)" class="w-1/2 p-2 border border-gray-300 rounded" />
                    <input disabled :value="payment.paymentMethod" class="w-1/2 p-2 border border-gray-300 rounded" />
                </div>
                <div v-for="(payment, index) in updatePayments" :key="`new-${index}`" class="flex gap-2">
                    <input v-model.number="payment.amount" type="number" placeholder="Số tiền" required class="w-1/2 p-2 border border-gray-300 rounded" />
                    <select v-model="payment.paymentMethod" required class="w-1/2 p-2 border border-gray-300 rounded">
                        <option value="CASH">Tiền mặt</option>
                        <option value="BANKING">Chuyển khoản</option>
                        <option value="VNPAY">VNPay</option>
                    </select>
                    <button type="button" @click="removePaymentForUpdate(index)" class="text-red-500 hover:text-red-700 p-2">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                 <button type="button" @click="addPaymentForUpdate" class="text-[#2292A7] hover:text-[#1b7e91] mt-2">
                    + Thêm thanh toán
                </button>
            </div>
            <div v-else class="space-y-2">
                <div v-for="(payment, index) in editedBooking.payments" :key="index" class="flex gap-2">
                    <input v-model.number="payment.amount" type="number" placeholder="Số tiền" required class="w-1/2 p-2 border border-gray-300 rounded" />
                    <select v-model="payment.paymentMethod" required class="w-1/2 p-2 border border-gray-300 rounded">
                        <option value="CASH">Tiền mặt</option>
                        <option value="BANKING">Chuyển khoản</option>
                        <option value="VNPAY">VNPay</option>
                    </select>
                     <button v-if="index > 0" type="button" @click="removePayment(index)" class="text-red-500 hover:text-red-700 p-2">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                 <button type="button" @click="addPayment" class="text-[#2292A7] hover:text-[#1b7e91] mt-2">
                    + Thêm thanh toán
                </button>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button type="button" @click="showAddPopup = false" class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Hủy
            </button>
            <button type="submit" class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#1b7e91]">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { fetcher } from '@/utils/fetcher';
import { countDayBetween, formatDate } from '@/utils/date';
import { formatPrice } from '@/utils/currency';

const tabs = ['PENDING', 'CONFIRMED', 'CHECKED IN', 'CHECKED OUT', 'CANCELED'];
const activeTab = ref('CONFIRMED');

const bookings = ref([]);
const roomsForBooking = ref([]);
const availableServices = ref([]);
const updatePayments = ref([]);

const isEditMode = ref(false);
const showAddPopup = ref(false);
const editedBooking = ref({});
const errors = ref({});

const currentPage = ref(0);
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

const fetchBookings = async (page = 0, size = 6, status = 'CONFIRMED') => {
  try {
    const res = await fetcher(`/admin/bookings?page=${page}&size=${size}&status=${status}`);
    const data = await res.json();
    if (data.code === 200) {
      bookings.value = data.data.content;
      totalPages.value = data.data.totalPages ?? 1;
      totalElements.value = data.data.totalElements ?? 0;
      currentPage.value = data.data.number ?? 0;
    } else {
      bookings.value = [];
      totalElements.value = 0;
    }
  } catch (err) {
    console.error(err);
    bookings.value = [];
    totalElements.value = 0;
  }
};

const fetchInitialData = async () => {
  try {
    const [roomRes, serviceRes] = await Promise.all([
      fetcher("/admin/bookings/rooms"),
      fetcher("/services")
    ]);
    const roomData = await roomRes.json();
    if (roomData.code === 200) roomsForBooking.value = roomData.data;
    const serviceData = await serviceRes.json();
    if (serviceData.code === 200) availableServices.value = serviceData.data;
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
  }
};

onMounted(() => {
  fetchInitialData();
  fetchBookings(0, pageSize.value, activeTab.value);
});

watch(activeTab, (newTab) => {
  fetchBookings(0, pageSize.value, newTab);
});

watch(pageSize, (newPageSize) => {
  fetchBookings(0, newPageSize, activeTab.value);
});

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchBookings(page, pageSize.value, activeTab.value);
  }
};

function openEditPopup(booking) {
  isEditMode.value = true;
  let servicesIds = booking.bookingDetails.map(d => d.id.serviceID);
  editedBooking.value = { ...booking, servicesIds };
  updatePayments.value = [];
  errors.value = {};
  showAddPopup.value = true;
}

function openAddPopup() {
  isEditMode.value = false;
  editedBooking.value = {
    id: 0,
    roomId: 0,
    roomName: '',
    customerEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    totalPrice: 0,
    servicesIds: [],
    status: 'PENDING',
    payments: [{ amount: null, paymentMethod: 'CASH' }],
  };
  errors.value = {};
  showAddPopup.value = true;
}

function calculateTotalPrice() {
  if (!editedBooking.value.roomId || !editedBooking.value.checkInDate || !editedBooking.value.checkOutDate) return;

  let days = countDayBetween(editedBooking.value.checkInDate, editedBooking.value.checkOutDate);
  if (days <= 0) {
      editedBooking.value.totalPrice = 0;
      return;
  }

  let room = roomsForBooking.value.find(r => r.id === editedBooking.value.roomId);
  if (!room) return;

  let serviceTotalPrice = editedBooking.value.servicesIds
    .map(id => availableServices.value.find(s => s.id === id)?.price || 0)
    .reduce((total, price) => total + price, 0);

  editedBooking.value.totalPrice = (days * room.pricePerNight) + serviceTotalPrice;
}

function addPayment() {
  editedBooking.value.payments.push({ amount: null, paymentMethod: 'CASH' });
}

function removePayment(index) {
  if (editedBooking.value.payments.length > 1) {
    editedBooking.value.payments.splice(index, 1);
  }
}

function addPaymentForUpdate() {
  updatePayments.value.push({ amount: null, paymentMethod: 'CASH' });
}

function removePaymentForUpdate(index) {
  updatePayments.value.splice(index, 1);
}

async function saveBooking() {
  errors.value = {};
  if (!isEditMode.value) {
    if (!editedBooking.value.customerEmail.includes('@')) {
      errors.value.customerEmail = 'Vui lòng nhập email hợp lệ';
      return;
    }
    if (new Date(editedBooking.value.checkInDate) >= new Date(editedBooking.value.checkOutDate)) {
      errors.value.checkOutDate = 'Ngày trả phòng phải sau ngày nhận phòng';
      return;
    }
  }

  const confirmSave = window.confirm("Bạn có chắc chắn muốn lưu thông tin đặt phòng này?");
  if (!confirmSave) return;

  let targetStatus = editedBooking.value.status;

  try {
    if (isEditMode.value) {
      const payload = {
        payments: updatePayments.value,
        status: editedBooking.value.status
      };
      await fetcher(`/admin/bookings/${editedBooking.value.id}`, 'PUT', JSON.stringify(payload));
    } else {
      const payload = {
        roomId: editedBooking.value.roomId,
        customerEmail: editedBooking.value.customerEmail,
        checkInDate: editedBooking.value.checkInDate,
        checkOutDate: editedBooking.value.checkOutDate,
        numberOfGuests: editedBooking.value.numberOfGuests,
        servicesIds: editedBooking.value.servicesIds,
        payments: editedBooking.value.payments,
        status: editedBooking.value.status
      };
      await fetcher('/admin/bookings', 'POST', JSON.stringify(payload));
    }

    alert('Lưu đặt phòng thành công!');
    activeTab.value = targetStatus;
    // fetchBookings sẽ được gọi tự động bởi watch(activeTab)

    showAddPopup.value = false;
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Có lỗi xảy ra khi lưu đặt phòng.');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>