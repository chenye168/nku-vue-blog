import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const userStatus = defineStore(
  'user',
  () => {
    const srcUrl = ref('')
    const apiUrl = ref('')
    const proUrl = ref('')

    return {
        srcUrl,
        apiUrl,
        proUrl
    }
  }
)

//永久存储
