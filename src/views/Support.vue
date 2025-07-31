<template>
  <!-- Modal phản hồi -->
  <div v-if="selectedTicket" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
      <h4 class="text-lg font-semibold mb-4 text-gray-800">Phản hồi yêu cầu</h4>
      <p class="text-sm text-gray-700 mb-4">
        Gửi phản hồi cho <strong>{{ selectedTicket.customerName }}</strong> về yêu cầu: <em>{{
          selectedTicket.requestType }}</em>
      </p>

      <textarea v-if="selectedTicket.handledByStaffName.length === 0" v-model="replyContent" rows="4"
        class="w-full p-2 border rounded-md mb-4" placeholder="Nhập phản hồi của bạn..."></textarea>

      <input v-else readonly rows="4" class="w-full p-2 border rounded-md mb-4"
        :value="selectedTicket.resolutionDetails">

      <div v-if="selectedTicket.handledByStaffName.length === 0" class="flex justify-end gap-3">
        <button @click="selectedTicket = null" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Hủy</button>
        <button @click="submitReply" class="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700">Gửi phản
          hồi</button>
      </div>
      <div v-else class="flex justify-end gap-3">
        <button @click="selectedTicket = null" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Đóng</button>
      </div>
    </div>
  </div>

  <div class="p-6 bg-gray-100 min-h-screen font-inter">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Yêu cầu hỗ trợ</h3>

    <div class="flex flex-col gap-y-6">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
        <!-- Nội dung chính -->
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <p class="ticket-title">
              {{ ticket.requestType }}
            </p>
            <p class="ticket-meta">
              <span class="customer-name">{{ ticket.customerName }}</span> • Gửi lúc {{ ticket.dateSubmitted }}
            </p>
            <p class="ticket-message">
              {{ ticket.description }}
            </p>
          </div>

          <span class="ticket-status" :class="{
            'status-pending': ticket.status === 'PENDING',
            'status-done': ticket.status === 'RESOLVED'
          }">
            {{ ticket.status }}
          </span>
        </div>

        <!-- Nút phản hồi -->
        <div class="text-right mt-4">
          <button class="reply-button" :disabled="ticket.status === 'RESOLVED'"
            @click="ticket.status !== 'RESOLVED' && openReply(ticket)">
            {{ ticket.status === 'RESOLVED' ? 'Đã phản hồi' : 'Phản hồi ngay' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const tickets = ref([]);

onMounted(async () => {
  console.log("HELLO");
  try {
    const res = await fetch("http://localhost:8080/api/admin/customer-requests")
    if (!res.ok) throw new Error('Network error')
    let data = await res.json()
    tickets.value = data;
  } catch (err) {
    console.error(err);
  }
});

const selectedTicket = ref(null);
const replyContent = ref("");

function openReply(ticket) {
  selectedTicket.value = ticket;
  replyContent.value = "";
}

async function submitReply() {
  if (!replyContent.value.trim()) return alert("Vui lòng nhập nội dung phản hồi.");

  try {
    const res = await fetch(`http://localhost:8080/api/admin/customer-requests/${selectedTicket.value.id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: replyContent.value })
    });

    if (!res.ok) throw new Error("Không gửi được phản hồi.");

    // Cập nhật trạng thái
    selectedTicket.value.status = "RESOLVED";
    selectedTicket.value = null;
    alert("Phản hồi đã được gửi.");
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

/* Card */
.ticket-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Tiêu đề */
.ticket-title {
  font-size: 18px;
  font-weight: 600;
  color: #006D77;
  margin-bottom: 6px;
}

/* Thông tin khách */
.ticket-meta {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 6px;
}

.customer-name {
  color: #007C91;
  font-weight: 600;
}

/* Tin nhắn */
.ticket-message {
  font-size: 14px;
  color: #374151;
}

/* Trạng thái */
.ticket-status {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 9999px;
  white-space: nowrap;
}

.status-pending {
  background-color: #fef9c3;
  color: #92400e;
}

.status-done {
  background-color: #d1fae5;
  color: #065f46;
}

/* Nút */
.reply-button {
  background-color: #199DB2;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
  border: none;
}

.reply-button:hover {
  background-color: #147e90;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>