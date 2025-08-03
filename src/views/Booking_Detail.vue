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
          <tr v-for="booking in filteredBookings" :key="booking.id">
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
    </div>

    <!-- Add Booking Popup -->
    <div v-if="showAddPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white max-h-[600px] overflow-y-scroll p-6 rounded-lg w-[800px] shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          <span v-if="!isEditMode.valueOf()">Thêm đặt phòng mới</span>
          <span v-else>Cập nhật đặt phòng</span>

        </h2>
        <form @submit.prevent="saveNewBooking">
          <div class="mb-4">
            <label class="block text-gray-700">Phòng</label>
            <input v-if="isEditMode" :disabled="isEditMode.valueOf()" :value="'Phòng ' + editedBooking.roomName"
              type="text" required class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <select v-else v-model="editedBooking.roomId" class="w-full mt-1 p-2 border border-gray-300 rounded"
              v-on:change="calculateTotalPrice">
              <option v-for="{ id, roomName, pricePerNight } in roomsForBooking" :key="id" :value="id">Phòng {{ roomName
              }} ({{ formatPrice(pricePerNight) }} / đêm)</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email Khách hàng</label>
            <input :disabled="isEditMode.valueOf()" v-model="editedBooking.customerEmail" type="email" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <p v-if="errors.customerEmail" class="text-red-500 text-sm mt-1">{{ errors.customerEmail }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Ngày nhận phòng</label>
            <input v-if="!isEditMode.valueOf()" v-model="editedBooking.checkInDate" type="date" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" v-on:change="calculateTotalPrice" />
            <input v-else disabled :value="formatDate(editedBooking.checkInDate)" type="text" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Ngày trả phòng</label>
            <input v-if="!isEditMode.valueOf()" v-model="editedBooking.checkOutDate" v-on:change="calculateTotalPrice"
              type="date" required class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <input v-else disabled :value="formatDate(editedBooking.checkOutDate)" type="text" required
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <p v-if="errors.checkOutDate" class="text-red-500 text-sm mt-1">{{ errors.checkOutDate }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số khách</label>
            <input :disabled="isEditMode.valueOf()" v-model.number="editedBooking.numberOfGuests" type="number" min="1"
              required class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Dịch vụ</label>
            <div class="mt-1 space-y-2 flex items-center justify-around flex-wrap ">
              <div v-for="service in availableServices" :key="service.id" class="flex items-center justify-center">
                <input :disabled="isEditMode.valueOf()" v-model="editedBooking.servicesIds"
                  v-on:change="calculateTotalPrice" :checked="editedBooking.servicesIds.includes()" type="checkbox"
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
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Trạng thái</label>
            <select v-model="editedBooking.status" class="w-full mt-1 p-2 border border-gray-300 rounded">
              <option :selected="editedBooking.status === 'PENDING'" :value="'PENDING'">PENDING</option>
              <option :selected="editedBooking.status === 'CONFIRMED'" :value="'CONFIRMED'">CONFIRMED</option>
              <option :selected="editedBooking.status === 'CHECKED IN'" :value="'CHECKED IN'">CHECKED IN</option>
              <option :selected="editedBooking.status === 'CHECKED OUT'" :value="'CHECKED OUT'">CHECKED OUT</option>
              <option :selected="editedBooking.status === 'CANCELED'" :value="'CANCELED'">CANCELED</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Thanh toán</label>
            <div v-for="(payment, index) in editedBooking.payments" :key="index" class="flex gap-2 mb-2">
              <input :disabled="isEditMode.valueOf()" v-model.number="payment.amount" type="number"
                placeholder="Số tiền" required class="w-1/2 p-2 border border-gray-300 rounded" />
              <select :disabled="isEditMode.valueOf()" v-model="payment.paymentMethod" required
                class="w-1/2 p-2 border border-gray-300 rounded">
                <option value="CASH">Tiền mặt</option>
                <option value="BANKING">Chuyển khoản</option>
                <option value="VNPAY">VNPay</option>
              </select>
              <button v-if="index > 0 && !isEditMode.valueOf()" type="button" @click="removePayment(index)"
                class="text-red-500 hover:text-red-700">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

            <div v-if="isEditMode.valueOf()" v-for="(payment, index) in updatePayments" :key="index"
              class="flex gap-2 mb-2">
              <input v-model.number="payment.amount" type="number" placeholder="Số tiền" required
                class="w-1/2 p-2 border border-gray-300 rounded" />
              <select v-model="payment.paymentMethod" required class="w-1/2 p-2 border border-gray-300 rounded">
                <option value="CASH">Tiền mặt</option>
                <option value="BANKING">Chuyển khoản</option>
                <option value="VNPAY">VNPay</option>
              </select>
              <button type="button" @click="removePaymentForUpdate(index)" class="text-red-500 hover:text-red-700">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

            <button v-if="isEditMode.valueOf()" type="button" @click="addPaymentForUpdate"
              class="text-[#2292A7] hover:text-[#1b7e91]">
              + Thêm thanh toán
            </button>
            <button v-else type="button" @click="addPayment"
              class="text-[#2292A7] hover:text-[#1b7e91]">
              + Thêm thanh toán
            </button>

          </div>
          <div class="flex justify-end">
            <button type="button" @click="showAddPopup = false"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetcher } from '@/utils/fetcher';
import { countDayBetween, formatDate } from '@/utils/date';
import { formatPrice } from '@/utils/currency';

const tabs = ['PENDING', 'CONFIRMED', 'CHECKED IN', 'CHECKED OUT', 'CANCELED'];
const activeTab = ref('CONFIRMED');

const roomsForBooking = ref([]);
const bookings = ref([]);
const availableServices = ref([]);
const updatePayments = ref([]);

const isEditMode = ref(false);
const showAddPopup = ref(false);
const editedBooking = ref({
  id: 0,
  roomId: 0,
  roomName: '',
  customerEmail: '',
  checkInDate: '',
  checkOutDate: '',
  numberOfGuests: 1,
  totalPrice: 0,
  servicesIds: [],
  status: '',
  payments: [{ amount: null, paymentMethod: 'CASH' }],
});
const errors = ref({});

onMounted(async () => {
  try {
    let roomRes = await fetcher("http://localhost:8080/api/admin/bookings/rooms");
    let roomData = await roomRes.json();
    if (roomData.code === 200) {
      roomsForBooking.value = roomData.data;
    }

    let serviceRes = await fetcher("http://localhost:8080/api/services");
    let serviceData = await serviceRes.json();
    if (serviceData.code === 200) {
      availableServices.value = serviceData.data;
    }

    let bookingRes = await fetcher("http://localhost:8080/api/admin/bookings");
    let bookingData = await bookingRes.json();
    bookings.value = bookingData;
  } catch (error) {
    console.error(error);

  }
});

const filteredBookings = computed(() =>
  bookings.value.filter(b => b.status === activeTab.value)
);

function openEditPopup(booking) {
  isEditMode.value = true;
  let servicesIds = booking.bookingDetails.map(d => d.id.serviceID);
  editedBooking.value = { ...booking, servicesIds };
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
    payments: [{ amount: null, paymentMethod: 'CASH' }],
  };
  errors.value = {};
  showAddPopup.value = true;
}

function calculateTotalPrice(e) {
  if (
    editedBooking.value.roomId === 0
    || editedBooking.value.checkInDate === ""
    || editedBooking.value.checkOutDate === ""
  ) {
    return;
  }
  let days = countDayBetween(editedBooking.value.checkInDate, editedBooking.value.checkOutDate);
  let room = roomsForBooking.value.find(r => r.id === editedBooking.value.roomId);
  let serviceTotalPrice = editedBooking.value.servicesIds.map(id => availableServices.value.find(av => av.id === id).price).reduce((t, p) => t + p, 0);

  let totalPrice = days * room.pricePerNight + serviceTotalPrice;
  editedBooking.value.totalPrice = totalPrice;
}

function addPayment() {
  updatePayments.value.push({ amount: null, paymentMethod: 'CASH' })
  g.value.payments.push({ amount: null, paymentMethod: 'CASH' });
}

function removePayment(index) {
  if (editedBooking.value.payments.length > 1) {
    editedBooking.value.payments.splice(index, 1);
  }
}

function addPaymentForUpdate() {
  updatePayments.value.push({ amount: null, paymentMethod: 'CASH' })
}

function removePaymentForUpdate(index) {
  if (updatePayments.value.length > 0) {
    updatePayments.value.splice(index, 1);
  }
}

// Lưu đặt phòng mới
async function saveNewBooking() {
  errors.value = {};

  // Validate email
  if (!editedBooking.value.customerEmail.includes('@')) {
    errors.value.customerEmail = 'Vui lòng nhập email hợp lệ';
    return;
  }

  // Validate dates
  if (new Date(editedBooking.value.checkInDate) >= new Date(editedBooking.value.checkOutDate)) {
    errors.value.checkOutDate = 'Ngày trả phòng phải sau ngày nhận phòng';
    return;
  }

  // Prepare data for API
  let bookingData;
  if (isEditMode.value) {

    bookingData = {
      payments: updatePayments.value,
      status: editedBooking.value.status
    };

    try {
      const response = await fetcher(`http://localhost:8080/api/admin/bookings/${editedBooking.value.id}`, 'PUT', JSON.stringify(bookingData));
      if (!response.ok) throw new Error('Failed to create booking');
      alert('Đặt phòng đã được thêm thành công!');
      showAddPopup.value = false;
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Có lỗi xảy ra khi thêm đặt phòng.');
    }
  } else {

    bookingData = {
      roomId: editedBooking.value.roomId,
      customerEmail: editedBooking.value.customerEmail,
      checkInDate: editedBooking.value.checkInDate,
      checkOutDate: editedBooking.value.checkOutDate,
      numberOfGuests: editedBooking.value.numberOfGuests,
      servicesIds: editedBooking.value.servicesIds,
      payments: editedBooking.value.payments,
      status: editedBooking.value.status
    };

    try {
      const response = await fetcher('http://localhost:8080/api/admin/bookings', 'POST', JSON.stringify(bookingData));
      if (!response.ok) throw new Error('Failed to create booking');
      alert('Đặt phòng đã được thêm thành công!');
      showAddPopup.value = false;
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Có lỗi xảy ra khi thêm đặt phòng.');
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>