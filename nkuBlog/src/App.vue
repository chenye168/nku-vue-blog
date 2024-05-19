<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { routerStatus } from '@/stores/routerStatus'
import Switch from '@/components/SwitchTransition.vue'
import { ref } from 'vue'


const routerStore = ref(routerStatus())
</script>

<template>
  <main>
    <RouterView />
    <Switch v-if="routerStore.isRouter" :type="'leave'" :callback="routerStore.clearAnimate" />

  </main>
</template>
