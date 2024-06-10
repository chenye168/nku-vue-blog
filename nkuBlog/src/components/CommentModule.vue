<template>
  <el-card class="el-card-d" shadow="always">
    <div class="infinite-list-wrapper" style="overflow: auto">
      <el-timeline infinite-scroll-disabled="disabled">
        <div v-if="hasData">
          <el-timeline-item
            v-for="(item, index) in allmessages"
            :key="index"
            :timestamp="item.datetime"
            placement="top"
          >
            <el-card class="el-card-m" style="height: 120px">
              <h4>{{ item.commentorName }}：</h4>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.commentText }}</p>
            </el-card>
          </el-timeline-item>
        </div>
        <div v-else>
          <el-timeline-item placement="top">
            <el-card class="el-card-m" style="height: 120px">
              <h4>chen：</h4>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
            </el-card>
          </el-timeline-item>
        </div>
      </el-timeline>
    </div>
    <div class="el-card-messages">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="输入留言"
        maxlength="200"
        v-model="message"
      ></el-input>
      <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { addMessage } from '@/api/AddMessage'
import { getMessages } from '@/api/GetMessages'

const { userId, currentUser } = defineProps(['userId', 'currentUser'])

const message = ref('')
const allmessages = ref<{ commentorName: string; commentText: string; datetime: Date }[]>([])
const hasData = ref(false)
const submitMessage = async () => {
  if (message.value == '' || message.value.replace(/(^\s*)|(\s*$)/g, '') == '') {
    ElMessage.error('留言不能为空')
    return
  }
  const userName = currentUser == '' ? '游客' : currentUser
  await addMessage({
    commentText: message.value,
    authorId: userId,
    commentorName: userName
  })
  allmessages.value = await (await getMessages(userId)).data
  message.value = ''
}

onMounted(async () => {
  allmessages.value = await (await getMessages(userId)).data
  //console.log(allmessages.value)
  if (allmessages.value.length > 0) {
    hasData.value = true
    //console.log(allmessages.value)
  }
})
</script>
<style scoped>
@media screen and (max-width: 800px) {
  .el-card-d {
    height: 500px;
  }
}

/*控制留言内容的滚动和布局 */
.infinite-list-wrapper {
  overflow-y: auto;
  position: absolute;
  top: 10px;
  bottom: 120px; /* 调整底部距离，使输入框有空间 */
  left: 10px;
  right: 10px;
  padding-right: 17px; /* 添加右侧内边距，使滚动条不覆盖内容 */
  box-sizing: content-box; /* 确保滚动条不影响元素大小 */
  background-color: bisque;
}

.el-card-messages {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
}

.submit-message {
  margin-top: 10px;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing: 1px;
}

.el-card-d {
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.el-card-m {
  display: inline-block; /* 确保卡片宽度根据内容调整 */
  white-space: pre-wrap; /* 保持内容的空白和换行 */
  max-width: 100%; /* 限制卡片最大宽度 */
  word-wrap: break-word; /* 自动换行 */
}

.comment-text {
  display: inline-block; /* 确保内容宽度根据文本调整 */
  white-space: pre-wrap; /* 保持内容的空白和换行 */
  word-wrap: break-word; /* 自动换行 */
}
</style>
