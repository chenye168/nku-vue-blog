
import { defineStore } from 'pinia'
import { ref, computed} from 'vue'

export const routerStatus = defineStore('router', () => {
  
  const isRouter = ref(false)
  const isRouter2 = ref(false)

  function clearAnimate(value: boolean) {
    isRouter.value = value
    isRouter2.value = value
  }
  function isRoute() {
    isRouter.value = true
  }
  function isRoute2() {
    isRouter2.value = true
  }


  return {
    isRouter,
    clearAnimate,
    isRoute,
    isRouter2,
    isRoute2
  }
    
  
})
