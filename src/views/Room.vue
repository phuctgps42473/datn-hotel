<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-xl font-semibold mb-4">Danh sách phòng</h3>

    <!-- Nút Thêm Mới -->
    <div class="mb-4 text-right">
      <button @click="openAddModal" class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#1b7e91]">
        <i class="fa-solid fa-plus mr-1"></i> Thêm mới
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <!-- Room Table -->
      <div class="w-full">
        <table class="w-full table-auto divide-y divide-gray-400">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số phòng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiện nghi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại phòng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá/đêm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sức chứa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="room in rooms" :key="room.id">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ room.roomNumber }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.amenities }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.roomTypeName }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.pricePerNight }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.capacity }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.description }}</td>
              <td class="px-6 py-4 text-sm">
                <span :class="getStatusClass(room.status).class">
                  {{ getStatusClass(room.status).text }}
                </span>
              </td>
              <td class="px-6 py-4 text-left text-sm font-medium">
                <button @click.prevent="openEditModal(room)" class="text-gray-400 hover:text-gray-600 mr-3">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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

    <!-- Popup form (Modal) -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          {{ isEditMode ? 'Chỉnh sửa phòng' : 'Thêm phòng' }}
        </h2>
        <form @submit.prevent="saveRoom">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">Số phòng</label>
              <input v-model="editedRoom.roomNumber" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium">Tiện nghi</label>
              <input v-model="editedRoom.amenities" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium">Loại phòng</label>
              <select v-model="editedRoom.roomTypeName" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option v-for="t in roomtypes" :key="t.id">{{ t.typeName }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium">Giá/đêm</label>
              <input v-model="editedRoom.pricePerNight" type="number" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium">Sức chứa</label>
              <input v-model="editedRoom.capacity" type="number" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium">Trạng thái</label>
              <select v-model="editedRoom.status" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>ACTIVE</option>
                <option>MAINTAINING</option>
                <option>OUT OF SERVICE</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium">Mô tả</label>
              <textarea v-model="editedRoom.description" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
            </div>
          </div>
          <div class="mt-6 text-right space-x-3">
            <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="resetForm">Đặt lại</button>
            <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="isEditModalOpen = false">Hủy</button>
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
import { onMounted, ref, watch } from 'vue';
import { fetcher } from "@/utils/fetcher";

const rooms = ref([]);
const roomtypes = ref([]);
const isEditModalOpen = ref(false);
const editedRoom = ref({});
const isEditMode = ref(false);

const currentPage = ref(0);
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

const fetchRooms = async (page = 0, size = 6) => {
  try {
    const res = await fetcher(`http://localhost:8080/api/admin/room?page=${page}&size=${size}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.code === 200) {
      rooms.value = data.data.content;
      totalPages.value = data.data.totalPages ?? 1;
      totalElements.value = data.data.totalElements ?? 0;
      currentPage.value = data.data.pageNo ?? 0;
    }
  } catch (err) {
    console.error(err);
  }
};

// ========== HÀM LẤY DỮ LIỆU LOẠI PHÒNG ==========
const fetchRoomTypes = async () => {
  try {
    const res = await fetcher("http://localhost:8080/api/admin/room-type");
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.code === 200) {
      roomtypes.value = data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchRooms(currentPage.value, pageSize.value);
  fetchRoomTypes();
});

// ========== THEO DÕI SỰ THAY ĐỔI CỦA PAGESIZE ==========
watch(pageSize, (newPageSize) => {
  fetchRooms(0, newPageSize);
});

// ========== CẢI TIẾN HÀM HIỂN THỊ TRẠNG THÁI ==========
function getStatusClass(status) {
  const statusMap = {
    'ACTIVE': { text: 'Đang hoạt động', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800' },
    'MAINTAINING': { text: 'Đang bảo trì', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800' },
    'OUT OF SERVICE': { text: 'Ngưng hoạt động', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800' }
  };
  return statusMap[status] || { text: 'Không xác định', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800' };
}

function openEditModal(room) {
  isEditMode.value = true;
  editedRoom.value = { ...room };
  isEditModalOpen.value = true;
}

function openAddModal() {
  isEditMode.value = false;
  editedRoom.value = {
    id: 0,
    amenities: "",
    capacity: 2,
    description: "",
    pricePerNight: 0,
    roomNumber: "",
    roomTypeID: 0,
    roomTypeName: roomtypes.value.length > 0 ? roomtypes.value[0].typeName : "", // Mặc định loại phòng đầu tiên
    status: "ACTIVE",
  };
  isEditModalOpen.value = true;
}

function resetForm() {
  if (isEditMode.value) {
    // Tìm lại dữ liệu gốc của phòng đang sửa để reset
    const originalRoom = rooms.value.find(r => r.id === editedRoom.value.id);
    if (originalRoom) {
      openEditModal(originalRoom);
    }
  } else {
    openAddModal();
  }
}

function validateRoom() {
  const r = editedRoom.value;
  return (
    r.amenities && r.amenities.trim() !== "" &&
    r.description && r.description.trim() !== "" &&
    r.pricePerNight >= 0 &&
    r.roomNumber && r.roomNumber.trim() !== "" &&
    r.roomTypeName && r.roomTypeName.trim() !== ""
  );
}

async function saveRoom() {
  if (!validateRoom()) {
    alert('Vui lòng nhập đầy đủ tất cả các trường.');
    return;
  }

  const confirmSave = window.confirm('Bạn có chắc chắn muốn lưu thông tin phòng này?');
  if (!confirmSave) return;

  const roomType = roomtypes.value.find(r => r.typeName === editedRoom.value.roomTypeName);
  if (!roomType) {
    alert('Loại phòng không hợp lệ!');
    return;
  }

  const body = {
    ...editedRoom.value,
    roomTypeID: roomType.id,
  };
  delete body.id;
  delete body.roomTypeName;

  try {
    if (isEditMode.value) {
      await fetcher(`http://localhost:8080/api/admin/room/${editedRoom.value.id}`, "PUT", JSON.stringify(body));
      // Tải lại trang hiện tại để cập nhật
      await fetchRooms(currentPage.value, pageSize.value);
    } else {
      await fetcher("http://localhost:8080/api/admin/room", "POST", JSON.stringify(body));
      // Tải lại trang đầu tiên để xem phòng mới
      await fetchRooms(0, pageSize.value);
    }
  } catch (err) {
    console.error("Failed to save room:", err);
    alert("Lưu thông tin thất bại. Vui lòng thử lại.");
  }

  isEditModalOpen.value = false;
}

// ========== HÀM CHUYỂN TRANG ==========
const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchRooms(page, pageSize.value);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

table {
  table-layout: auto;
  width: 100%;
}

th,
td {
  padding: 16px 16px;
  word-wrap: break-word;
  white-space: normal;
}
</style>