<template>
    <div class="p-6 bg-gray-100 min-h-screen font-inter">
      <h3 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Danh sách Hóa đơn</h3>
  
      <div class="flex flex-col gap-6">
        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="invoice-card"
        >
          <!-- Nội dung hóa đơn -->
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <!-- Thông tin -->
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-800">
              <p><span>Mã hóa đơn:</span> {{ invoice.code }}</p>
              <p><span>Khách hàng:</span> {{ invoice.customer }}</p>
              <p><span>Ngày thanh toán:</span> {{ invoice.date }}</p>
              <p><span>Nhân viên:</span> {{ invoice.staff }}</p>
              <p><span>Tổng tiền:</span> {{ invoice.total }}</p>
              <p><span>Phương thức:</span> {{ invoice.method }}</p>
            </div>
  
            <!-- Trạng thái & hành động -->
            <div class="flex flex-col items-start md:items-end gap-2">
              <span
                class="status-pill"
                :class="{
                  'paid': invoice.status === 'Đã thanh toán',
                  'pending': invoice.status === 'Chờ thanh toán',
                  'canceled': invoice.status === 'Đã hủy',
                }"
              >
                {{ invoice.status }}
              </span>
              <button class="action-link" @click="goToDetail(invoice.id)">Xem chi tiết</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

const router = useRouter()

function goToDetail(id) {
  router.push(`/invoices/${id}`)
}

  
  const invoices = ref([
    {
      id: 1,
      code: 'HD001',
      customer: 'NGUYỄN THỊ HOA',
      date: '01/07/2025',
      staff: 'Lê Minh',
      total: '1.500.000 VND',
      method: 'Tiền mặt',
      status: 'Đã thanh toán',
    },
    {
      id: 2,
      code: 'HD002',
      customer: 'TRẦN VĂN B',
      date: '28/06/2025',
      staff: 'Lan Anh',
      total: '800.000 VND',
      method: 'Chuyển khoản',
      status: 'Chờ thanh toán',
    },
    {
      id: 3,
      code: 'HD003',
      customer: 'PHẠM THỊ C',
      date: '25/06/2025',
      staff: 'Quang Huy',
      total: '2.200.000 VND',
      method: 'Quẹt thẻ',
      status: 'Đã hủy',
    },
  ])
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  .invoice-card {
    background-color: #fff;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease-in-out;
  }
  
  .invoice-card:hover {
    border-color: #2292A7;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.07);
  }
  
  p span {
    font-weight: 500;
    color: #6b7280;
    margin-right: 4px;
  }
  
  .status-pill {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .status-pill.paid {
    background-color: #dcfce7;
    color: #15803d;
  }
  
  .status-pill.pending {
    background-color: #fef9c3;
    color: #92400e;
  }
  
  .status-pill.canceled {
    background-color: #fee2e2;
    color: #b91c1c;
  }
  
  .action-link {
    color: #199DB2;
    font-weight: 500;
    font-size: 0.85rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s ease-in-out;
  }
  
  .action-link:hover {
    color: #147e90;
    text-decoration: underline;
  }
  </style>
  