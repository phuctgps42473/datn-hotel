<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
</script>

<template>
  <!-- Nếu KHÔNG phải trang admin-login thì dùng layout -->
  <div v-if="route.path !== '/admin-login'" class="flex h-screen bg-gray-100 font-inter">
    <!-- Sidebar -->
    <div class="w-[230px] bg-white shadow-md">
      <Sidebar />
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- <Header /> -->
      <router-view />
    </div>
  </div>

  <!-- Nếu LÀ trang admin-login thì KHÔNG có layout -->
  <div v-else class="min-h-screen">
    <router-view />
  </div>
</template>
