<!-- src/App.vue -->
<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-inter">
    <!-- Sidebar cố định 230px -->
    <div class="w-[230px] bg-white shadow-md">
      <Sidebar />
    </div>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />

      <!-- Content area below the header -->

        <router-view /> <!-- Hiển thị nội dung theo route -->

    </div>
  </div>
</template>

<style scoped>
/* Import Inter font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Apply Inter font to the entire app */
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Base styles for flex container and main content */
.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.flex-1 {
  flex: 1;
}

.flex-col {
  flex-direction: column;
}

.w-\[230px\] {
  width: 230px;
}

.bg-white {
  background-color: #fff;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.overflow-auto {
  overflow: auto;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-600 {
  color: #4b5563;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
