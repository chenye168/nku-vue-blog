<template>
  <div class="gradient">
    <div class="helloWorld">
      <div>welcome</div>
      <div>to</div>
      <div>our personal zone</div>
    </div>
    <div class="rank">
      <span class="rankTitle">Rank</span>
      <div class="rankList">
        <div class="item" v-for="(item, index) in state.userList" :key="index">
          <div class="num">{{ index + 1 }}</div>
          <router-link :to="'/' + item['userName']" class="author">
            <dt class="avatar">
              <img :src="'http://src.cycodes.cn/src/img/' + item.avatar" alt="avatar" />
            </dt>
            <dd>{{ item['userName'] }}</dd>
          </router-link>
          <div class="rank-ability">{{ item['articleCount'] }}篇文章</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getUserList } from '@/api/UserList'
import { RouterLink } from 'vue-router'

const state = reactive({
  userList: []
})

onMounted(async () => {
  const { data } = await getUserList()

  state.userList = data
})
</script>

<style>
.gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 600% 600%;
  animation: gradientBG 5s ease infinite;
  font-family: 'erikos';
  z-index: 99999;
  text-align: center;

  /* 使背景全屏 */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;

  /*grid布局*/
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-areas: 'helloWorld rank';
  place-items: center;
}
/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.helloWorld {
  display: balock;
  justify-content: center;
  align-items: center;
  /* transform: translate(-50%, -50%); */
  font-size: 50px;
  color: white;
  grid-area: helloWorld;
}
.rank {
  width: 90%;
  height: 90%;
  position: absolute;
  margin: auto;
  text-align: center;

  border-radius: 10px;
  background-color: rgba(240, 248, 255, 0.5);
  box-shadow: 0 0 50px rgba(240, 248, 255, 0.5); /* 过度背景 */
  grid-area: rank;
}

.rankTitle {
  font-size: 30px;
  color: #333;
  font-family: 'erikos';
  border-bottom: #333;
}

.rankList {
  padding: 0 30px 20px;
  position: relative;
  overflow: auto;
  margin-top: 5%;
  height: 88%;
  /* 自定义滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.7) transparent;
  font-size: 25px;
}

@media (max-width: 800px) {
  .gradient {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'helloWorld'
      'rank';
  }
  .helloWorld {
    font-size: 35px;
  }
  .rankList {
    font-size: 20px;
    height: 85%;
  }
}

.item {
  display: grid;
  align-items: center;
  margin-bottom: 20px;
  grid-template-columns: 50px 1fr 1fr;
}
.item .num {
  font-size: 20px;
  margin-right: 20px;
}
.item .author {
  display: flex;
  align-items: center;
  flex: 1;
  color: #333;
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  margin-right: 10px;
  position: relative;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.avatar .img-bd {
  width: 46px;
  height: 54px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.rank-ability {
  color: #999;
}
.item:nth-child(1) .num {
  color: #de5149;
}
.item:nth-child(2) .num {
  color: #ef8634;
}
.item:nth-child(3) .num {
  color: #f6cb46;
}
</style>
