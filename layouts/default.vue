<script lang="ts" setup>
// import { onMounted } from "vue";

import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
// onMounted(async () => {
await authStore.init();
// });
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <app-nav-bar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
