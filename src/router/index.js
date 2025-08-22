import { createRouter, createWebHistory } from 'vue-router'

import AdminLogin from '@/views/AdminLogin.vue'
import AdminLayout from '@/views/AdminLayout.vue'

import Home from '@/views/Home.vue'
import Employee from '@/views/Employee.vue'
import RoomType from '@/views/RoomType.vue'
import Booking_Detail from '@/views/Booking_Detail.vue'
import CustomerDetail from '@/views/CustomerDetail.vue'
import Invoices from '@/views/Invoices.vue'
import InvoiceDetail from '@/views/InvoiceDetail.vue'
import Refunds from '@/views/Refunds.vue'
import Support from '@/views/Support.vue'
import Settings from '@/views/Settings.vue'
import Profile from '@/views/Profile.vue'
import Notifications from '@/views/Notifications.vue'
import Room from '@/views/Room.vue'


const routes = [
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('@/views/AdminLogin.vue')  // ❗ Không nằm trong AdminLayout
  },
  {
    path: '/',
    component: () => import('@/views/AdminLayout.vue'), // Có Header + Sidebar
    children: [
      { path: '', component: () => import('@/views/Home.vue') },
      { path: 'employees', component: () => import('@/views/Employee.vue') },
      { path: 'room-types', component: () => import('@/views/RoomType.vue') },
      { path: 'booking-details', component: () => import('@/views/Booking_Detail.vue') },
      { path: 'customers', component: () => import('@/views/CustomerDetail.vue') },
      { path: 'invoices', component: () => import('@/views/Invoices.vue') },
      { path: 'invoices/:id', component: () => import('@/views/InvoiceDetail.vue') },
      { path: 'rooms', component: () => import('@/views/Room.vue') },
      { path: 'refunds', component: () => import('@/views/Refunds.vue') },
      { path: 'support', component: () => import('@/views/Support.vue') },
      { path: 'settings', component: () => import('@/views/Settings.vue') },
      { path: 'profile', component: () => import('@/views/Profile.vue') },
      { path: 'notifications', component: () => import('@/views/Notifications.vue') },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Navigation Guard: Chặn truy cập nếu chưa đăng nhập
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    if (to.path !== '/admin-login') {
      return next('/admin-login');
    } else {
      return next();
    }
  } else {
      return next();

  }

  // fetch("http://localhost:8080/api/public/health-check-token", {
  //   headers: {
  //     "Authorization": "Bearer " + accessToken
  //   }
  // }).then(res => res.json())
  //   .then(body => {
  //     if (body.code === 200) {
  //       if (to.path === '/admin-login') {
  //         next('/')
  //       } else {
  //         next()
  //       }
  //     } else {
  //       localStorage.removeItem("accessToken");
  //       next('/admin-login')
  //     }
  //   });
})


export default router
