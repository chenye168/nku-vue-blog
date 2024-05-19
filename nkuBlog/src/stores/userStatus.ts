import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

import Axios from 'axios'

export const userStatus = defineStore(
  'user',
  () => {
    const hasLogin = ref(false)
    const token = ref('')
    const userName = ref('')
    const currentUser = ref('')

    const lastUrl = ref('')

    const updateLogin = computed(() => {
      if (userName.value !== '' && token.value !== '') {
        hasLogin.value = true
      } else {
        hasLogin.value = false
      }
      return hasLogin.value
    })


    return {
      hasLogin,
      token,
      userName,
      updateLogin,
      currentUser,
      lastUrl
    }
  },
  {
    persist: {
      enable: true
    }
  }
)

//永久存储
