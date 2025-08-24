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
      <div class="w-full overflow-x-auto">
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
              <td class="px-6 py-4 text-sm text-gray-500 max-w-[50px] truncate">{{ room.amenities }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.roomTypeName }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.pricePerNight }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ room.capacity }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ room.description }}</td>
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

      <!-- Phân trang -->
      <div v-if="totalElements > 0" class="mt-7 flex items-center justify-between text-sm text-gray-600">
        <div class="flex items-center">
          <span>Hiển thị mỗi trang</span>
          <select v-model="pageSize"
            class="ml-3 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none">
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
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0"
            class="p-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1"
            class="p-3 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ========== POPUP FORM (MODAL) ĐÃ CẬP NHẬT ========== -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4 text-[#2292A7]">
          {{ isEditMode ? 'Chỉnh sửa phòng' : 'Thêm phòng' }}
        </h2>
        <form @submit.prevent="saveRoom">
          <div class="grid grid-cols-2 gap-x-6 gap-y-4">
            <!-- Các trường thông tin cũ -->
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
              <input v-model="editedRoom.pricePerNight" type="number"
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
                <option>ACTIVE</option>
                <option>MAINTAINING</option>
                <option>OUT OF SERVICE</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium">Mô tả</label>
              <textarea v-model="editedRoom.description" rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
            </div>

            <!-- ========== KHU VỰC UPLOAD ẢNH MỚI ========== -->
            <div class="col-span-2 mt-4">
              <label class="block text-sm font-medium">Hình ảnh (Tối đa 5 ảnh)</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-[#2292A7] hover:text-[#1b7e91] focus-within:outline-none">
                      <span>Tải ảnh lên</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple accept="image/*"
                        @change="handleImageUpload">
                    </label>
                    <p class="pl-1">hoặc kéo thả vào đây</p>
                  </div>
                  <p class="text-xs text-gray-500">Chỉ nhận ảnh PNG, JPG, GIF</p>
                </div>
              </div>
            </div>

            <!-- Khu vực xem trước ảnh -->
            <div v-if="imagePreviews.length > 0" class="col-span-2 grid grid-cols-5 gap-4">
              <div v-for="(src, index) in imagePreviews" :key="index" class="relative">
                <img :src="src" class="h-24 w-full object-cover rounded-md">
                <button @click="removeImage(index)" type="button"
                  class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  &times;
                </button>
              </div>
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
import { BASE_URL } from '@/const';

const rooms = ref([]);
const roomtypes = ref([]);
const isEditModalOpen = ref(false);
const editedRoom = ref({});
const isEditMode = ref(false);

// ========== STATE CHO VIỆC UPLOAD ẢNH ==========
const roomImages = ref([]); // Lưu File object để gửi đi
const imagePreviews = ref([]); // Lưu URL xem trước
const MAX_IMAGES = 5;

const currentPage = ref(0);
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

const fetchRooms = async (page = 0, size = 6) => {
  try {
    const res = await fetcher(`/admin/room?page=${page}&size=${size}`);
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

const fetchRoomTypes = async () => {
  try {
    const res = await fetcher("/admin/room-type");
    const data = await res.json();
    roomtypes.value = data;
  } catch (err) {
    console.error(err);
  }
};

const fetchRoomImage = async (roomId) => {
  try {
    const res = await fetcher(`/admin/room/${roomId}/images`);
    const data = await res.json();
    if (data.code === 200) {
      console.log(data.data);
      roomImages.value = data.data;
      imagePreviews.value = data.data.map(roomImage => roomImage.imageUrl);
    }
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  fetchRooms(currentPage.value, pageSize.value);
  fetchRoomTypes();
});

watch(pageSize, (newPageSize) => {
  fetchRooms(0, newPageSize);
});

// ========== HÀM XỬ LÝ ẢNH ==========
function handleImageUpload(event) {
  const files = event.target.files;
  if (roomImages.value.length + files.length > MAX_IMAGES) {
    alert(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`);
    return;
  }

  for (const file of files) {
    roomImages.value.push(file);
    imagePreviews.value.push(URL.createObjectURL(file));
  }
}

function removeImage(index) {
  roomImages.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
}

// ========== HÀM MỞ MODAL (ĐÃ CẬP NHẬT) ==========
async function openEditModal(room) {
  isEditMode.value = true;
  editedRoom.value = { ...room };
  await fetchRoomImage(room.id)
  // Lưu ý: Logic để hiển thị/xóa ảnh cũ sẽ phức tạp hơn và cần API hỗ trợ.
  // Ở đây chúng ta tập trung vào việc thêm ảnh mới.
  isEditModalOpen.value = true;
}

function openAddModal() {
  isEditMode.value = false;
  editedRoom.value = {
    amenities: "", capacity: 2, description: "", pricePerNight: 0, roomNumber: "",
    roomTypeName: roomtypes.value.length > 0 ? roomtypes.value[0].typeName : "",
    status: "ACTIVE",
  };
  // Reset mảng ảnh khi mở modal thêm mới
  roomImages.value = [];
  imagePreviews.value = [];
  isEditModalOpen.value = true;
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
  let success = false;
  let room;
  if (!validateRoom()) {
    alert('Vui lòng nhập đầy đủ tất cả các trường.');
    return;
  }
  if (roomImages.value.length < 4) {
    alert('Vui lòng tải lên ít nhất 4 ảnh');
    return false;
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
      let res = await fetcher(`/admin/room/${editedRoom.value.id}`, "PUT", JSON.stringify(body));
      success = true;
      room = await res.json()
    } else {
      let res = await fetcher("/admin/room", "POST", JSON.stringify(body));
      success = true;
      room = await res.json()
    }

    if (success) {
      const oldImages = [];
      const newFiles = [];

      roomImages.value.forEach(item => {
        if (item instanceof File) {
          newFiles.push(item);
        } else {
          oldImages.push(item);
        }
      });

      const formData = new FormData();
      for (const imageObject of oldImages) {
        formData.append('keepIds', imageObject.id);
      }

      for (const imageFile of newFiles) {
        formData.append('files', imageFile);
      }

      let accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(BASE_URL + `/admin/room/${room.id}/images`,
          {
            headers: {
              "Authorization": "Bearer " + accessToken
            },
            method: "POST",
            body: formData,
          });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Lỗi mạng');
        }

      } catch (err) {
        console.error("Failed to save room:", err);
        alert("Lưu thông tin thất bại. Vui lòng thử lại. Lỗi: " + err.message);
      }
      // Tải lại dữ liệu
      if (isEditMode.value) {
        await fetchRooms(currentPage.value, pageSize.value);
      } else {
        await fetchRooms(0, pageSize.value);
      }
    }

  } catch (err) {
    console.error("Failed to save room:", err);
    alert("Lưu thông tin thất bại. Vui lòng thử lại.");
  }

  isEditModalOpen.value = false;
}

// Các hàm cũ khác giữ nguyên
function getStatusClass(status) {
  const statusMap = {
    'ACTIVE': { text: 'Đang hoạt động', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800' },
    'MAINTAINING': { text: 'Đang bảo trì', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800' },
    'OUT OF SERVICE': { text: 'Ngưng hoạt động', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800' }
  };
  return statusMap[status] || { text: 'Không xác định', class: 'px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800' };
}
function resetForm() {
  if (isEditMode.value) {
    const originalRoom = rooms.value.find(r => r.id === editedRoom.value.id);
    if (originalRoom) openEditModal(originalRoom);
  } else {
    openAddModal();
  }
}
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
  min-width: 900px;
  /* Đảm bảo bảng không bị vỡ trên màn hình nhỏ */
}
</style>