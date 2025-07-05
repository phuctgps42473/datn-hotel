<template>
    <div class="p-6 bg-gray-50 min-h-screen font-inter">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Chi tiết Hóa đơn</h2>
  
      <div v-if="invoice" class="container">
        <p><strong>Mã hóa đơn:</strong> {{ invoice.code }}</p>
        <p><strong>Khách hàng:</strong> {{ invoice.customer }}</p>
        <p><strong>Ngày thanh toán:</strong> {{ invoice.date }}</p>
        <p><strong>Nhân viên:</strong> {{ invoice.staff }}</p>
        <p><strong>Tổng tiền:</strong> {{ invoice.total }}</p>
        <p><strong>Phương thức:</strong> {{ invoice.method }}</p>
        <p><strong>Trạng thái:</strong> {{ invoice.status }}</p>
      </div>
  
      <div v-else class="text-gray-500 mt-10">
        <p>Không tìm thấy hóa đơn.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const invoiceId = Number(route.params.id)
  const invoice = ref(null)
  
  const invoices = [
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
  ]
  
  onMounted(() => {
    invoice.value = invoices.find((inv) => inv.id === invoiceId)
  })
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  
  .container {
    max-width: 700px;
    background: #ffffff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #374151;
  }
  
  p strong {
    display: inline-block;
    width: 160px;
    color: #4b5563;
    font-weight: 600;
  }
  </style>
  