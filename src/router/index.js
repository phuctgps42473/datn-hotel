import { createRouter, createWebHistory } from 'vue-router';
import Employee from '../views/Employee.vue';
import Room from '../views/Room.vue';
import RoomType from '../views/RoomType.vue'; // <- thêm dòng này
import Booking_Detail from '../views/Booking_Detail.vue'; // <- thêm dòng này
import CustomerDetail from '@/views/CustomerDetail.vue';
import Invoices from '@/views/Invoices.vue';
import InvoiceDetail from '@/views/InvoiceDetail.vue';
import Refunds from '@/views/Refunds.vue';
import Support from '@/views/Support.vue';
import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';
import Notifications from '@/views/Notifications.vue';


const routes = [
  { path: '/', component: Room },
  { path: '/employees', component: Employee },
  { path: '/room-types', component: RoomType }, // <- thêm route này
  { path: '/booking-details', component: Booking_Detail }, // <- thêm route này
  { path: '/customers', component: CustomerDetail }, 
  { path: '/invoices', component: Invoices },
  { path: '/invoices/:id', component: InvoiceDetail },
  {
    path: '/refunds',
    name: 'Refunds',
    component: Refunds, // 👈 Khai báo route cho trang hoàn trả
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
