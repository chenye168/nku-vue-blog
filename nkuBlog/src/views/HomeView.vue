<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import Footer from '@/components/FootFooter.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

let setTimeout0: any, setTimeout1: any, setTimeout2: any, setTimeout3: any
const state = ref({
  span1: false,
  span2: false,
  span3: false,
  cursor: false
})

const switchin = ref(true)
const switchOut = (n: boolean) => {
  switchin.value = n
}

const route = useRoute()
// 访问的用户
const currentUser = route.params.user

onMounted(() => {
  setTimeout0 = setTimeout(() => {
    state.value.span1 = true
    //console.log('span1')
  }, 1200)

  setTimeout1 = setTimeout(() => {
    state.value.span2 = true
    //console.log('span2')
  }, 1400)

  setTimeout2 = setTimeout(() => {
    state.value.span3 = true
    //console.log('span3')
  }, 1600)

  setTimeout3 = setTimeout(() => {
    state.value.cursor = true
    //console.log('cursor')
  }, 2400)
})

onUnmounted(() => {
  clearTimeout(setTimeout0)
  clearTimeout(setTimeout1)
  clearTimeout(setTimeout2)
  clearTimeout(setTimeout3)
})
</script>

<template>
  <header>
    <HeaderNav />
  </header>
  <div class="text">
    <span :class="{ animate: state.span1 }">Hey There</span><br />
    <span :class="{ animate: state.span2 }">I'm {{ currentUser }}</span
    ><br />
    <span :class="{ animate: state.span3 }"
      >( σ'ω')σ<strong>#Skr</strong><i :class="{ cursor: state.cursor }"></i
    ></span>
  </div>
  <Footer />
  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<style scoped lang="scss">
$whilte0: rgba(255, 255, 255, 0);
$whilte1: rgba(255, 255, 255, 1);
$color_main: #ffd03f;

header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}

.text {
  left: 40px;
  position: absolute;
  font-family: 'erikos';
  font-size: 106px;
  color: #ffff;
  line-height: 1.2;
  padding-top: 54px;
  span {
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0);
    strong {
      font-size: 0.6em;
      padding-left: 1rem;
    }
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 90%;
      transform: scaleX(0);
      transform-origin: left;
      top: 6%;
      left: 0;
      z-index: 2;
      background: #ffd03f;
    }
    i {
      width: 2px;
      background: rgba(255, 255, 255, 0);
      height: 80%;
      position: absolute;
      right: -4px;
      top: 15%;
      &.cursor {
        animation: cursoring 1s steps(1) infinite;
      }
    }
  }
}

.animate {
  animation: textAnimate 0.8s ease-in-out forwards;
  &::before {
    animation: bgAnimate 0.8s ease-in-out forwards;
  }
}

@keyframes cursoring {
  0% {
    background: $whilte1;
  }
  50% {
    background: $whilte0;
  }
  100% {
    background: $whilte1;
  }
}

@keyframes textAnimate {
  0% {
    color: $whilte0;
  }
  40% {
    color: $whilte0;
  }
  60% {
    color: $whilte1;
  }
  100% {
    color: $whilte1;
  }
}

@keyframes bgAnimate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  40% {
    transform: scaleX(1);
    transform-origin: left;
  }
  60% {
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@media screen and (max-width: 1440px) {
  .text {
    font-size: 96px;
  }
}

@media screen and (max-width: 960px) {
  .text {
    font-size: 80px;
  }
}
@media screen and (max-width: 768px) {
  .text {
    font-size: 60px;
  }
}
@media screen and (max-width: 480px) {
  .text {
    font-size: 42px;
    padding-top: 10rem;
  }
}
@media screen and (max-width: 360px) {
  .text {
    font-size: 32px;
    padding-top: 8rem;
  }
}
</style>
