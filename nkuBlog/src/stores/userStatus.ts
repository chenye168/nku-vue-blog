import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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
      userName, //登录用户
      updateLogin,
      currentUser, //访问用户
      lastUrl //上次访问地址
    }
  },
  {
    persist: true //永久存储
  }
)


