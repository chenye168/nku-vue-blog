<template>
  <header>
    <HeaderNav />
  </header>
  <div class="main">
    <div class="Photo cop">
      <div class="title">
        <h3>Photo</h3>
      </div>
      <div>
        <img :src="'/srcp/img/' + userInfo.photo" alt="" />
      </div>
    </div>
    <div class="AboutMe cop">
      <div class="title">
        <h3>About Me</h3>
      </div>
      <div class="city">
        <div class="mylabel">
          <span
            v-for="(item, index) in userInfo.label"
            :key="index"
            class="cloud"
            :style="{ left: getLeft(index), top: getTop(index) }"
            ><img src="@/img/aboutbg.png" alt="" /> <strong>{{ item }}</strong></span
          >
        </div>
      </div>
    </div>
    <div class="Address cop">
      <div class="title">
        <h3>Where</h3>
      </div>
      <div>
        <p>{{ userInfo.address }}</p>
      </div>
    </div>
    <div class="OtherData cop">
      <div class="title">
        <h3>Comments</h3>
      </div>
      <div class="comments">
        <Comment :userId="userInfo.userId" :currentUser="userStore.userName" v-if="loadFinish"/>
      </div>
    </div>
    <div class="Mail cop">
      <div class="title">
        <h3>Mail</h3>
      </div>
      <div class="hasPic">
        <img src="@/img/mail.png" alt="" />
        <p>{{ userInfo.mail }}</p>
      </div>
    </div>

    <div class="Git cop">
      <div class="title">
        <h3>GitHub</h3>
      </div>
      <div class="hasPic">
        <img src="@/img/git.png" alt="" />
        <p>{{ userInfo.github }}</p>
      </div>
    </div>
    <div class="Wechat cop">
      <div class="title">
        <h3>Wechat</h3>
      </div>
      <div class="hasPic">
        <img :src="'/srcp/img/' + userInfo.wechat.qrCode" alt="" />
        <p>{{ userInfo.wechat.id }}</p>
      </div>
    </div>
  </div>
  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import Comment from '@/components/CommentModule.vue'
import { ref, onMounted  } from 'vue'
import { getUserId } from '@/api/GetUserId'
import { getUserInfo } from '@/api/UserInfo'
import { userStatus } from '@/stores/userStatus'

const loadFinish = ref(false)
const userStore = ref(userStatus())
const switchin = ref(true)

const switchOut = (n: boolean) => {
  switchin.value = n
}

const userInfo = ref({
  userName: '',
  userId: '',
  photo: 'default.jpg',
  label: [] as string[],
  address: '',
  mail: '',
  github: '',
  wechat: {
    id: '',
    qrCode: ''
  }
})

const getUser = async () => {
  // 获取用户信息
  let res = await getUserId(userStore.value.currentUser)
  res = await getUserInfo(res.data.userId)
  return res.data[0]
}

onMounted(async () => {
  userInfo.value = await getUser()
  loadFinish.value = true
})

// 云标签
const getLeft = (index: number) => {
  return 4 + index * 14 + '%'
}
const getTop = (index: number) => {
  return 16 + (index % 2) * 14 + '%'
}
</script>

<style scoped lang="scss">
$font_name: 'erikos', 'Helvetica Neue', Helvetica, Arial, 'Hiragino Sans GB', 'Hiragino Sans GB W3',
  'WenQuanYi Micro Hei', sans-serif;

header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}
.main {
  position: fixed;
  top: 60px;
  bottom: 3%;
  left: 2%;
  right: 2%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 760fr 765fr 765fr 570fr;
}

.cop {
  background-color: #fff;
  margin: 10px;

  border-radius: 20px;

  display: grid;
  grid-template-rows: 50px 1fr;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
  background-color: #f0f0f0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.title h3 {
  font-size: 24px;
  font-family: $font_name;
}

.Photo {
  grid-row: span 2;
  background-color: #ffd03f;
}
.AboutMe {
  grid-row: span 2;
  grid-column: span 2;
  background-image: url('https://cdn.bruceau.com/static/media/citybg.e867312d.png');
  background-repeat: no-repeat;
  background-color: #fffbf3;
  background-position: bottom;
}
.OtherData {
  grid-row: span 2;
  background-color: #ff98c6;
}
.Git {
  grid-row: span 1;
  background-color: #817ef8;
}
.Mail {
  background-color: #ff98c6;
}
.Wechat {
  background-color: #2fd2db;
}
.Address {
  background-color: #2fd2db;
}

.hasPic {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.hasPic img {
  width: 100px;
  height: 100px;
}
.hasPic p {
  font-size: 20px;
  font-family: $font_name;
  font-weight: bold;
}

.Photo div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Photo img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.Address div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: $font_name;
}

// 云标签
.cloud {
  display: block;
  position: absolute;
  img {
    position: absolute;
    display: block;
    width: 100%;
    z-index: 20;
    margin-top: -28%;
  }
  strong {
    position: relative;
    padding: 0 14px;
    z-index: 30;
    font-size: 1.5rem;
    font-family: $font_name;
  }
}
.city {
  position: relative;
  width: 100%;
  height: calc(100% - 41px);
  min-height: 300px;

  .mylabel {
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
    z-index: 20;
  }
}

.comments {
  position: relative;
}

//自适应

@media screen and (max-width: 800px) {
  .main {
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    overflow: auto;
  }
  .cop {
    margin: 5px;
  }
  .title {
    font-size: 16px;
  }
  .title h3 {
    font-size: 20px;
  }
  .Photo {
    grid-row: span 1;
  }
  .AboutMe {
    grid-row: span 1;
    grid-column: span 1;
  }
  .OtherData {
    grid-row: span 1;
  }
  .Git {
    grid-row: span 1;
  }
  .Mail {
    grid-row: span 1;
  }
  .Wechat {
    grid-row: span 1;
  }
  .Address {
    grid-row: span 1;
  }
  .hasPic img {
    width: 50px;
    height: 50px;
  }
  .hasPic p {
    font-size: 16px;
  }
  .Photo img {
    width: 100px;
    height: 100px;
  }
  .Address div {
    font-size: 20px;
  }
  .cloud {
    img {
      margin-top: -20%;
    }
    strong {
      font-size: 1rem;
    }
  }
}
</style>
