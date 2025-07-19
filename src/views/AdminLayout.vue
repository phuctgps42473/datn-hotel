<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <Header />
      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>
