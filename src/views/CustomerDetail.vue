
<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <!-- Header + Nút thêm -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-10">
      <h3 class="text-xl md:text-2xl font-semibold text-gray-800">Chi tiết khách hàng</h3>
    </div>

    <!-- Danh sách khách hàng -->
    <div class="flex flex-col gap-y-6 ">
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
      </div>
    </div>

    <!-- Edit Popup -->
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

    <!-- Booking Popup -->
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
import { onMounted, ref } from 'vue';

// Sample booking data
const bookingData = [
    {
        "id": 1,
        "checkInDate": "2025-07-07T17:00:00.000+00:00",
        "checkOutDate": "2025-07-08T17:00:00.000+00:00",
        "bookingDate": "2025-07-05T02:57:56.557+00:00",
        "numberOfGuests": 1,
        "totalPrice": 1300000.00,
        "status": "Checked Out",
        "specialRequests": null,
        "bookingDetails": [
            {
                "id": {
                    "bookingID": 1,
                    "serviceID": 1
                },
                "quantity": 1,
                "dateProvided": "2025-07-05T02:57:56.563+00:00"
            }
        ],
        "payments": [
            {
                "id": 1,
                "bookingID": null,
                "transactionNo": "15056812",
                "amount": 1300000.00,
                "paymentDate": "2025-07-05T02:58:41.497+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            },
            {
                "id": 2,
                "bookingID": null,
                "transactionNo": "15056812",
                "amount": 1300000.00,
                "paymentDate": "2025-07-05T03:22:10.783+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            },
            {
                "id": 3,
                "bookingID": null,
                "transactionNo": "15056812",
                "amount": 1300000.00,
                "paymentDate": "2025-07-05T04:12:00.707+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            },
            {
                "id": 4,
                "bookingID": null,
                "transactionNo": "15056812",
                "amount": 1300000.00,
                "paymentDate": "2025-07-05T04:29:20.303+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            }
        ],
        "reviews": [
            {
                "id": 12,
                "rating": 5,
                "comment": "",
                "reviewDate": "2025-07-26T10:23:12.180+00:00"
            }
        ]
    },
    {
        "id": 2,
        "checkInDate": "2025-07-29T17:00:00.000+00:00",
        "checkOutDate": "2025-07-30T17:00:00.000+00:00",
        "bookingDate": "2025-07-30T14:34:16.507+00:00",
        "numberOfGuests": 1,
        "totalPrice": 1300000.00,
        "status": "Pending",
        "specialRequests": null,
        "bookingDetails": [
            {
                "id": {
                    "bookingID": 2,
                    "serviceID": 1
                },
                "quantity": 1,
                "dateProvided": "2025-07-30T14:34:16.507+00:00"
            }
        ],
        "payments": [],
        "reviews": []
    },
    {
        "id": 3,
        "checkInDate": "2025-08-07T17:00:00.000+00:00",
        "checkOutDate": "2025-08-08T17:00:00.000+00:00",
        "bookingDate": "2025-07-30T14:37:34.037+00:00",
        "numberOfGuests": 1,
        "totalPrice": 1200000.00,
        "status": "Pending",
        "specialRequests": null,
        "bookingDetails": [],
        "payments": [
            {
                "id": 5,
                "bookingID": null,
                "transactionNo": "0",
                "amount": 1200000.00,
                "paymentDate": "2025-07-30T14:53:10.250+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            },
            {
                "id": 6,
                "bookingID": null,
                "transactionNo": "0",
                "amount": 1200000.00,
                "paymentDate": "2025-07-30T14:53:12.140+00:00",
                "paymentMethod": "VNPay",
                "status": "SUCCESS",
                "processedByStaffID": null
            }
        ],
        "reviews": []
    }
];

const customers = ref([]);
const showPopup = ref(false);
const showBookingPopup = ref(false);
const editedUser = ref({});
const errors = ref({});
const bookings = ref([]);

onMounted(async () => {
  try {
    const res = await fetcher("http://localhost:8080/api/admin/user");
    if (!res.ok) throw new Error('Network error');
    let data = await res.json();
    console.log(data);
    customers.value = data;
  } catch (err) {
    console.error(err);
  }
});

// Mở form sửa
function openEditPopup(user) {
  editedUser.value = { ...user };
  errors.value = {};
  showPopup.value = true;
}

// Mở danh sách đặt phòng
function openBookingPopup(customerId) {
  // Lọc booking theo customerId (giả sử API trả về dữ liệu liên kết)
  bookings.value = bookingData.filter(booking => booking.id <= 3); // Thay thế bằng API call thực tế nếu có
  showBookingPopup.value = true;
}

async function saveChanges() {
  const confirmed = window.confirm("Bạn có chắc chắn muốn lưu thông tin này?");
  if (!confirmed) return;

  try {
    await fetcher("http://localhost:8080/api/admin/user/" + editedUser.value.id, "PUT", JSON.stringify({ isActive: editedUser.value.isActive }));
    const index = customers.value.findIndex(u => u.id === editedUser.value.id);
    if (index !== -1) {
      customers.value[index] = { ...editedUser.value };
    }
  } catch (error) {
    console.error(error);
  }
  showPopup.value = false;
}


// Trạng thái hoạt động
function getStatusClass(isActive) {
  return isActive
    ? 'px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800'
    : 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-200 text-gray-800';
}

// Trạng thái đặt phòng
function getBookingStatusClass(status) {
  return status === 'Checked Out'
    ? 'px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800'
    : 'px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800';
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

h3 {
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