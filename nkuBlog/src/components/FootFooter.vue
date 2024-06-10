<template>
  <footer class="foot">
    <ul>
      <li>
        <b>const</b>
        {{ dateValue }}
      </li>
      <li><b>const</b> UseTime = {{ timeValue }}s</li>
      <li><b>const</b> Add=天津市津南区</li>
      <li>{{ thisURL }}</li>
      <li>
        <h2>欢迎您的到来</h2>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
const dateValue = new Date().getFullYear()
const timeValue = new Date().getFullYear() - 2018
const thisURL = window.location.href.split('/')[2]
</script>

<style scoped lang="scss">
$color_main: #ffd03f;
$b_border: 1px solid #111111;
.foot {
  width: 100%;
  position: absolute;
  bottom: 6px;
  ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
      border-top: $b_border;
      text-align: center;
      flex-grow: 1;
      font-size: 1rem;
      border-right: $b_border;
      display: block;
      line-height: 64px;
      b {
        color: $color_main;
      }
    }
  }
  ul li:nth-child(4) {
    flex-grow: 4;
    font-size: 1.2rem;
    font-weight: bold;
  }
  ul li:nth-child(5) {
    border-right: none;
    font-size: 12px;
    a {
      color: #fff;
    }
  }
}

@media screen and (max-width: 960px) {
  .foot ul {
    border-left: $b_border;
    li:nth-child(5) {
      border-right: $b_border;
    }
  }
}
@media screen and (max-width: 480px) {
  .foot ul {
    li {
      font-size: 0.8rem;
    }
    li:nth-child(4) {
      font-size: 1rem;
    }
  }
}
</style>
