<template>
  <header>
    <HeaderNav />
  </header>

  <section>
    <MdEditor v-model="text" />
  </section>
  
  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const switchin = ref(true)

const switchOut = (n: boolean) => {
  switchin.value = n
}

const text = ref('# Hello Editor');


</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}

section {
  position: fixed;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
}




</style>
