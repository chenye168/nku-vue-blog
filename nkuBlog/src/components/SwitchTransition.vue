<template>
  <div :class="classNames.animate">
    <span v-for="(item, index) in state.dom" :key="index" :class="item.active? classNames.active : ''"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'



// 定义 props
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  callback: {
    type: Function,
    default: () => {}
  }
})

const classNames = ref({
      animate:`animate-${props.type}`, //type决定进入还是离场的样式
      active: `active-${props.type}`
    } )

//构造函数
let boxnum = 16
let list = []
for (let i = 0; i < boxnum; i++) {
  list.push({ active: false })
}
let state = ref({
  active: true,
  dom: list // 16个距形
})

function shuffle(n: number) {
  //生成m张牌
  let arr = new Array(n)
  for (var i = 0; i < n; i++) {
    arr[i] = i
  }
  //每次抽出一张牌，放在另一堆。因为要在数组里抽出元素，把后面的所有元素向前拉一位，所以很耗时。
  var newArr = []
  for (let i = n; i > 0; i--) {
    var length = Math.floor(Math.random() * i)
    newArr.push(arr[length])
    arr.splice(length, 1)
  }
  return newArr
}

let setAnimate: any = null
let setCallback: any = null

const componentDidMount = () => {
  let order = shuffle(16) //组件加载后 创建1-16的乱序数组

  let newDom = state.value.dom
  let i = -1
  let aniTimeout = () => {
    i++
    if (i >= order.length) return
    newDom[order[i]].active = true
    state.value.dom = newDom
  }
  setAnimate = setInterval(aniTimeout, 17)
  setCallback = setTimeout(() => {
    props.callback && props.callback(false)
  }, 1000)
}

onMounted(componentDidMount)

const componentWillUnmount = () => {
  clearInterval(setAnimate)
  clearTimeout(setCallback)
}

onBeforeUnmount(componentWillUnmount)
</script>

<style lang="scss">
@mixin SwitchDivInit {
  width: 100%;
  height: calc(100% - 37px);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
}

@mixin SwitchSpanInit {
  display: block;
  width: 100%;
  height: calc(100% / 16);
  background-color: #ffd03f;
  transition: 0.6s ease-in;
}

.switch-bg {
  @include SwitchDivInit();
  background-color: #ffd03f;
}

.animate-enter {
  @include SwitchDivInit();
  span {
    @include SwitchSpanInit();
    transform: scale(1, 1.05);
    transform-origin: right top;
  }
  span.active-enter {
    transform: scale(0, 1.05);
  }
}

.animate-leave {
  @include SwitchDivInit();
  span {
    @include SwitchSpanInit();
    transform: scale(0, 1.05);
    transform-origin: left top;
  }
  span.active-leave {
    transform: scale(1, 1.05);
  }
}
</style>
