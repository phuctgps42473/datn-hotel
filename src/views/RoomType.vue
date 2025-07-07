<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-xl font-semibold mb-4">Danh sách loại phòng</h3>

    <!-- Nút Thêm mới -->
    <div class="mb-4 text-right">
      <button @click="openAdd" class="bg-[#2292A7] text-white px-4 py-2 rounded hover:bg-[#1b7e91]">
        <i class="fa-solid fa-plus mr-1"></i> Thêm mới
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <table class="w-full table-auto divide-y divide-gray-400">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tên loại</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Giá mặc định</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="roomType in roomTypes" :key="roomType.id">
            <td class="px-4 py-2 text-sm text-gray-900">{{ roomType.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-900">{{ roomType.typeName }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatPrice(roomType.defaultPrice) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ roomType.description }}</td>
            <td class="px-4 py-2 text-sm text-right">
              <button @click="openEdit(roomType)" class="text-blue-600 hover:text-blue-900 mr-3">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="text-red-600 hover:text-red-900">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Popup Thêm/Chỉnh sửa -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div class="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          {{ isEditMode ? 'Chỉnh sửa loại phòng' : 'Thêm loại phòng' }}
        </h2>
        <form @submit.prevent="saveEdit">
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Tên loại</label>
            <input v-model="editedType.typeName" type="text" required class="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Giá mặc định</label>
            <input v-model.number="editedType.defaultPrice" type="number" required min="0" class="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea v-model="editedType.description" required class="mt-1 block w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
         <div class="flex justify-end space-x-2">
  <button type="button" @click="resetForm" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
    Đặt lại
  </button>
  <button type="button" @click="showPopup = false" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
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
import { ref } from 'vue';

const roomTypes = ref([
  {
    id: 1,
    typeName: 'Deluxe',
    defaultPrice: 1200000,
    description: 'Phòng cao cấp với tiện nghi đầy đủ.',
  },
  {
    id: 2,
    typeName: 'Superior',
    defaultPrice: 950000,
    description: 'Phòng tiêu chuẩn với view đẹp.',
  },
  {
    id: 3,
    typeName: 'Suite',
    defaultPrice: 1800000,
    description: 'Phòng hạng sang với không gian rộng rãi.',
  },
]);

const showPopup = ref(false);
const isEditMode = ref(false);
const editedType = ref({});
const originalData = ref({});

function openEdit(roomType) {
  isEditMode.value = true;
  editedType.value = { ...roomType };
  originalData.value = { ...roomType };
  showPopup.value = true;
}

function openAdd() {
  isEditMode.value = false;
  const defaultData = {
    id: Date.now(),
    typeName: '',
    defaultPrice: 0,
    description: '',
  };
  editedType.value = { ...defaultData };
  originalData.value = { ...defaultData };
  showPopup.value = true;
}

function resetForm() {
  editedType.value = { ...originalData.value };
}

function saveEdit() {
  if (!editedType.value.typeName || editedType.value.defaultPrice < 0 || !editedType.value.description) {
    alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
    return;
  }

  const index = roomTypes.value.findIndex(r => r.id === editedType.value.id);
  if (index !== -1) {
    roomTypes.value[index] = { ...editedType.value };
  } else {
    roomTypes.value.push({ ...editedType.value });
  }

  showPopup.value = false;
}

function formatPrice(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

th, td {
  padding: 12px;
  word-wrap: break-word;
  white-space: normal;
}
</style>
