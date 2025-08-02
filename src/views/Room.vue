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

      <!-- Popup form -->
      <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
            {{ isEditMode ? 'Chỉnh sửa phòng' : 'Thêm phòng' }}
          </h2>
          <form @submit.prevent="updateRoom">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium">Số phòng</label>
                <input v-model="editedRoom.roomNumber"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium">Tiện nghi</label>
                <input v-model="editedRoom.amenities" class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium">Loại phòng</label>
                <select v-model="editedRoom.roomTypeName"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                  <option v-for="t in roomtypes" :key="t.id">{{ t.typeName }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium">Giá/đêm</label>
                <input v-model="editedRoom.pricePerNight"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium">Sức chứa</label>
                <input v-model="editedRoom.capacity" type="number"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium">Trạng thái</label>
                <select v-model="editedRoom.status" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                  <option>Đang hoạt động</option>
                  <option>Đang bảo trì</option>
                  <option>Đã xoá</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium">Mô tả</label>
                <textarea v-model="editedRoom.description" rows="2"
                  class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
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
                <span :class="getStatusClass(room.status)">
                  {{ room.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-left text-sm font-medium">
                <a href="#" @click.prevent="openEditModal(room)" class="text-gray-400 hover:text-gray-600 mr-3">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-600">
                  <i class="fa-solid fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div class="flex items-center">
          <span>Hiển thị mỗi trang</span>
          <select class="ml-2 p-2 border border-gray-300 rounded-md bg-white text-gray-700">
            <option>6</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div>
          <span>1-4 của 10</span>
        </div>
        <div class="flex items-center space-x-2">
          <button class="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button class="p-2 rounded-md hover:bg-gray-200">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetcher } from "@/utils/fetcher";

const rooms = ref([]);
const roomtypes = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8080/api/admin/room")
    if (!res.ok) throw new Error('Network error')
    let data = await res.json()
    rooms.value = data;
  } catch (err) {
    console.error(err);
  }
});

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8080/api/admin/room-type")
    if (!res.ok) throw new Error('Network error')
    let data = await res.json()
    roomtypes.value = data;
  } catch (err) {
    console.error(err);
  }
});

function getStatusClass(status) {
  switch (status) {
    case 'Đang có sẵn':
      return 'px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800';
    case 'Hết phòng':
      return 'px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800';
    case 'Đã đặt trước':
      return 'px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800';
    default:
      return 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800';
  }
}

const isEditModalOpen = ref(false);
const editedRoom = ref({});
const isEditMode = ref(false);

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
    roomTypeName: "",
    status: "Đang hoạt động",
  };
  isEditModalOpen.value = true;
}

function resetForm() {
  if (isEditMode.value) {
    openEditModal(rooms.value.find(r => r.id === editedRoom.value.id));
  } else {
    openAddModal();
  }
}

function validateRoom() {
  const r = editedRoom.value;
  return (
    r.amenities.trim() !== "",
    r.description.trim() !== "",
    r.pricePerNight >= 0,
    r.roomNumber.trim() !== "",
    r.roomTypeID !== 0,
    r.roomTypeName.trim() !== ""
  );
}

async function updateRoom() {
  if (!validateRoom()) {
    alert('Vui lòng nhập đầy đủ tất cả các trường.');
    return;
  }

  const confirmSave = window.confirm('Bạn có chắc chắn muốn lưu thông tin phòng này?');
  if (!confirmSave) return;

  let r = roomtypes.value.find(r => r.typeName === editedRoom.value.roomTypeName);
  editedRoom.value.roomTypeID = r.id;

  let body = { ...editedRoom.value };
  delete body.id;
  delete body.roomTypeName;

  try {
    let res;
    if (editedRoom.value.id === 0) {
      res = await fetcher("http://localhost:8080/api/admin/room", "POST", JSON.stringify(body));
    } else {
      res = await fetcher(`http://localhost:8080/api/admin/room/${editedRoom.value.id}`, "PUT", JSON.stringify(body));
    }
    if (!res.ok) throw new Error('Network error')
    let data = await res.json()
    rooms.value = data;
  } catch (err) {
    console.error(err);
  }

  if (isEditMode.value) {
    const index = rooms.value.findIndex(r => r.id === editedRoom.value.id);
    if (index !== -1) {
      rooms.value[index] = { ...editedRoom.value };
    }
  } else {
    rooms.value.push({ ...editedRoom.value });
  }
  isEditModalOpen.value = false;
}

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
