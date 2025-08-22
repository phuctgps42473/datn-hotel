<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-xl font-semibold mb-4">Danh sách nhân viên</h3>

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
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quyền</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hoạt động</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="staff in staffs" :key="staff.id">
            <td class="px-4 py-2 text-sm text-gray-900">{{ staff.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-900">{{ staff.fullName }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ staff.email }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ staff.phoneNumber }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ staff.roleName }}</td>
            <td class="px-4 py-2 text-sm">
              <span :class="getStatusClass(staff.isActive)">
                {{ staff.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động' }}
              </span>
            </td>
            <td class="px-4 py-2 text-sm text-right">
              <button @click="openEditPopup(staff)" class="text-gray-400 hover:text-blue-500 mr-10 mx-auto">
                <i class="fa-solid fa-pen-to-square"></i>
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

    <!-- Popup Form (Không thay đổi) -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          {{ isEditMode ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên' }}
        </h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-gray-700">Họ tên</label>
            <input :readonly="isEditMode" v-model="editedUser.fullName" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input :readonly="isEditMode" v-model="editedUser.email" type="email"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số điện thoại</label>
            <input v-model="editedUser.phoneNumber" type="text"
              class="w-full mt-1 p-2 border border-gray-300 rounded" />
            <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Quyền</label>
            <select v-model="editedUser.roleName" class="w-full mt-1 p-2 border border-gray-300 rounded">
              <option disabled value="">-- Chọn quyền --</option>
              <option :selected="editedUser.roleName === 'ADMIN'">ADMIN</option>
              <option :selected="editedUser.roleName === 'STAFF'">STAFF</option>
            </select>
            <p v-if="errors.roleName" class="text-red-500 text-sm mt-1">{{ errors.roleName }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Hoạt động</label>
            <select v-model="editedUser.isActive" class="w-full mt-1 p-2 border border-gray-300 rounded">
              <option :selected="editedUser.isActive" :value="true">Đang hoạt động</option>
              <option :selected="!editedUser.isActive" :value="false">Ngưng hoạt động</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="resetForm" class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Đặt lại
            </button>
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
  </div>
</template>

<script setup>
import { fetcher } from '@/utils/fetcher';
// ========== THÊM 'watch' ĐỂ THEO DÕI THAY ĐỔI ==========
import { onMounted, ref, watch } from 'vue';

const staffs = ref([]);
const currentPage = ref(0);
// ========== THAY ĐỔI GIÁ TRỊ MẶC ĐỊNH CHO PHÙ HỢP VỚI DROPDOWN ==========
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

// Function to fetch staffs with pagination
const fetchStaffs = async (page = 0, size = 6) => {
  try {
    const res = await fetcher(`http://localhost:8080/api/admin/staff?page=${page}&size=${size}`);
    if (!res.ok) throw new Error('Network error');
    let data = await res.json();
    if (data.code === 200) {
      staffs.value = data.data.content;

      // ========== SỬA LỖI NaN BẰNG CÁCH THÊM GIÁ TRỊ DỰ PHÒNG ==========
      // Giả sử API trả về 'number' cho trang hiện tại. Nếu không, nó sẽ mặc định là 0.
      totalPages.value = data.data.totalPages ?? 1;
      totalElements.value = data.data.totalElements ?? 0;
      currentPage.value = data.data.pageNo ?? 0; // Đổi 'pageNo' thành 'number' (chuẩn hơn)
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchStaffs(currentPage.value, pageSize.value);
});

watch(pageSize, (newPageSize) => {
  fetchStaffs(0, newPageSize);
});


const ROLE = { "ADMIN": 1, "STAFF": 2 };
const showPopup = ref(false);
const isEditMode = ref(false);
const editedUser = ref({});
const errors = ref({});

// Mở form sửa
function openEditPopup(user) {
  isEditMode.value = true;
  editedUser.value = { ...user };
  errors.value = {};
  showPopup.value = true;
}

// Mở form thêm mới
function openAddPopup() {
  isEditMode.value = false;
  editedUser.value = {
    id: 0,
    fullName: '',
    email: '',
    phoneNumber: '',
    roleName: '',
    isActive: true,
  };
  errors.value = {};
  showPopup.value = true;
}

// Reset form
function resetForm() {
  if (isEditMode.value) {
    openEditPopup(staffs.value.find(u => u.id === editedUser.value.id));
  } else {
    openAddPopup();
  }
}

async function saveChanges() {
  if (!validateForm()) return;

  const confirmed = window.confirm("Bạn có chắc chắn muốn lưu thông tin này?");
  if (!confirmed) return;

  let newStaff = { ...editedUser.value };
  newStaff["roleID"] = ROLE[newStaff.roleName];
  delete newStaff.roleName;

  if (isEditMode.value) {
    try {
      let res = await fetcher("http://localhost:8080/api/admin/staff/" + editedUser.value.id, "PUT", JSON.stringify(newStaff));
      let data = await res.json()
      if (data.code === 200) {
        await fetchStaffs(currentPage.value, pageSize.value)
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      let res = await fetcher("http://localhost:8080/api/admin/staff", "POST", JSON.stringify(newStaff));
      let data = await res.json()
      if (data.code === 201) {
        // Sau khi thêm mới, nên quay về trang đầu tiên để thấy nhân viên mới
        await fetchStaffs(0, pageSize.value)
      }
    } catch (error) {
      console.error(error);
    }
  }

  showPopup.value = false;
}


// Validate email và số điện thoại
function validateForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^0\d{9}$/;

  errors.value = {};

  if (!editedUser.value.email || !emailRegex.test(editedUser.value.email)) {
    errors.value.email = 'Email không hợp lệ.';
  }

  if (!editedUser.value.phoneNumber || !phoneRegex.test(editedUser.value.phoneNumber)) {
    errors.value.phoneNumber = 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.';
  }

  if (!editedUser.value.roleName) {
    errors.value.roleName = 'Vui lòng chọn quyền.';
  }

  return Object.keys(errors.value).length === 0;
}

// Trạng thái hoạt động
function getStatusClass(isActive) {
  return isActive
    ? 'px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800'
    : 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-200 text-gray-800';
}

// Pagination navigation
const goToPage = (page) => {
  // Logic này không cần thay đổi, nó sẽ hoạt động đúng khi các biến khác đã đúng
  if (page >= 0 && page < totalPages.value) {
    fetchStaffs(page, pageSize.value);
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