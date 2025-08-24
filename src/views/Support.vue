<template>
  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Yêu cầu từ khách hàng</h3>

    <!-- ========== TABS ========== -->
    <div class="flex border-b border-gray-200 mb-6">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        :class="[
          'px-4 py-2 font-semibold text-sm -mb-px border-b-2',
          activeTab === tab.value
            ? 'border-[#199DB2] text-[#199DB2]'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
        {{ tab.label }}
      </button>
    </div>

    <!-- Bảng danh sách yêu cầu -->
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <table class="w-full table-auto divide-y divide-gray-400">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại yêu cầu</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nội dung</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người xử lý</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
           <!-- Hiển thị khi không có dữ liệu -->
          <tr v-if="tickets.length === 0">
            <td colspan="6" class="text-center py-10 text-gray-500">Không có yêu cầu nào trong mục này.</td>
          </tr>
          <!-- Hiển thị danh sách -->
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{ ticket.customerName }}</td>
            <td class="px-4 py-4 text-sm text-gray-700">{{ ticket.requestType }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 max-w-xs truncate" :title="ticket.description">
              {{ ticket.description }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(ticket.dateSubmitted) }}</td>
            <td class="px-4 py-4 text-sm text-gray-700">{{ ticket.handledByStaffName || '---' }}</td>
            <td class="px-4 py-4 text-sm">
              <button @click="openReply(ticket)"
                class="font-medium text-[#199DB2] hover:text-[#147e90]">
                {{ ticket.status === 'RESOLVED' ? 'Xem chi tiết' : 'Phản hồi' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ========== PHẦN PHÂN TRANG ========== -->
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

    <!-- Modal phản hồi -->
    <div v-if="selectedTicket" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h4 class="text-xl font-bold mb-2 text-gray-800">
          {{ selectedTicket.status === 'OPEN' ? 'Phản hồi yêu cầu' : 'Chi tiết phản hồi' }}
        </h4>
        <p class="text-sm text-gray-600 mb-4 border-b pb-4">
          Từ: <strong>{{ selectedTicket.customerName }}</strong> <br>
          Yêu cầu: <em>{{ selectedTicket.requestType }}</em>
        </p>

        <div v-if="selectedTicket.status === 'OPEN'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung yêu cầu</label>
          <textarea disabled :value="selectedTicket.description" rows="5" class="w-full p-2 border rounded-md"></textarea>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung phản hồi</label>
          <textarea v-model="replyContent" rows="5" class="w-full p-2 border rounded-md"
            placeholder="nhập phản hồi của bạn..."></textarea>
          <div class="flex justify-end gap-3 mt-4">
            <button @click="selectedTicket = null" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Hủy</button>
            <button @click="submitReply" class="px-4 py-2 rounded-md bg-[#199DB2] text-white hover:bg-[#147e90]">Gửi</button>
          </div>
        </div>

        <div v-else>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung yêu cầu</label>
          <textarea disabled :value="selectedTicket.description" rows="5" class="w-full p-2 border rounded-md"></textarea>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phản hồi từ nhân viên</label>
          <textarea readonly rows="5" class="w-full p-2 border rounded-md bg-gray-100"
            :value="selectedTicket.resolutionDetails"></textarea>
          <div class="flex justify-end mt-4">
            <button @click="selectedTicket = null" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { fetcher } from '@/utils/fetcher';
import { formatDate } from '@/utils/date';

// ========== STATE CHO TABS VÀ DỮ LIỆU ==========
const tabs = [
  { label: 'Chờ xử lý', value: 'OPEN' },
  { label: 'Đã xử lý', value: 'RESOLVED' } // Sử dụng RESOLVED thay vì CLOSED để khớp với API
];
const activeTab = ref('OPEN'); // Tab mặc định
const tickets = ref([]);
const selectedTicket = ref(null);
const replyContent = ref("");

// ========== STATE CHO PHÂN TRANG ==========
const currentPage = ref(0);
const pageSize = ref(6);
const totalPages = ref(0);
const totalElements = ref(0);

// ========== HÀM LẤY DỮ LIỆU (CÓ PHÂN TRANG VÀ TRẠNG THÁI) ==========
const fetchRequests = async (page = 0, size = 6, status = 'OPEN') => {
  try {
    const res = await fetcher(`/admin/customer-requests?page=${page}&size=${size}&status=${status}`);
    const data = await res.json();
    if (data.code === 200) {
      tickets.value = data.data.content;
      totalPages.value = data.data.totalPages ?? 1;
      totalElements.value = data.data.totalElements ?? 0;
      currentPage.value = data.data.pageNo ?? 0;
    } else {
      tickets.value = [];
      totalElements.value = 0;
    }
  } catch (err) {
    console.error(err);
    tickets.value = [];
    totalElements.value = 0;
  }
};

onMounted(() => {
  fetchRequests(0, pageSize.value, activeTab.value);
});

// ========== THEO DÕI SỰ THAY ĐỔI CỦA TAB VÀ PAGESIZE ==========
watch(activeTab, (newStatus) => {
  // Khi chuyển tab, luôn quay về trang đầu tiên
  fetchRequests(0, pageSize.value, newStatus);
});

watch(pageSize, (newPageSize) => {
  // Khi đổi kích thước trang, cũng quay về trang đầu tiên của tab hiện tại
  fetchRequests(0, newPageSize, activeTab.value);
});

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchRequests(page, pageSize.value, activeTab.value);
  }
};

function openReply(ticket) {
  console.log(ticket)
  selectedTicket.value = ticket;
  replyContent.value = "";
}

async function submitReply() {
  console.log(replyContent);
  if (!replyContent.value.trim()) {
    return alert("Vui lòng nhập nội dung phản hồi.");
  }

  const confirmSubmit = window.confirm("Bạn có chắc chắn muốn gửi phản hồi này?");
  if (!confirmSubmit) return;

  try {
    await fetcher(`/admin/customer-requests/${selectedTicket.value.requestID}`, "PUT",
      JSON.stringify({ message: replyContent.value })
    );

    alert("Phản hồi đã được gửi thành công.");
    selectedTicket.value = null;

    // Tải lại dữ liệu của trang và tab hiện tại.
    // Yêu cầu đã xử lý sẽ tự động biến mất khỏi tab "Chờ xử lý".
    await fetchRequests(currentPage.value, pageSize.value, activeTab.value);

  } catch (err) {
    console.error(err);
    alert("Đã xảy ra lỗi khi gửi phản hồi.");
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

table {
  min-width: 800px;
}
</style>