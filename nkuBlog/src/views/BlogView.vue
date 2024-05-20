<template>
  <header>
    <HeaderNav />
  </header>
  <div class="blog">
    <div class="article-list">
      <div class="title">文章列表</div>
      <div class="list"></div>
    </div>
    <div class="article-detail">
      <div class="title">{{ title }}</div>
      <MdPreview v-model="text" />
    </div>
  </div>

  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref, onMounted } from 'vue'
import { getUserId } from '@/api/GetUserId'
import { getUserArticle } from '@/api/UserArticle'
import { getArticle } from '@/api/GetArticle'
import { userStatus } from '@/stores/userStatus'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const switchin = ref(true)
const switchOut = (n: boolean) => {
  switchin.value = n
}

const userStore = ref(userStatus())

// 文章列表
const articleList = ref([])

const getArticleList = async () => {
  // 获取文章列表
  console.log('获取文章列表')
  let res = await getUserId(userStore.value.currentUser)
  res = await getUserArticle(res.data.userId)
  return res.data
}

const getArticleDetail = async (id: number) => {
  // 获取文章详情
  console.log('获取文章详情')
  let res = await getArticle(id)
  return res.data
}

// const text = ref('# sdfdsfdsf');
const text = ref(
  '功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需功能一览 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等； 内置的白色主题和暗黑主题，支持绑定切换； 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）； 多语言，支持自行扩展语言； 粘贴上传图片，图片裁剪上传； 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）； 预览主题，内置defalut、vuepress、github 、cyanosis、mk-cute、smart-blue 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）； mermaid绘图（>=1.8.0），katex数学公式（>=1.9.0）； 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。 按需引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。引用(>=4.0.0)。需引用(>=4.0.0)。需引用(>=4.0.0)。引用(>=4.0.0)。需引用(>=4.0.0)。需引用(>=4.0.0)。'
)
const title = ref('test')

onMounted(async () => {
  articleList.value = await getArticleList()
})
</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}

.blog {
  width: 100%;
  height: 98%;

  position: fixed;
  top: 20px;
  display: grid;
  grid-template-columns: 2fr 5fr;
}

.article-list {
  background-color: white;
  height: 90%;
  width: 89%;
  margin-left: 3%;
  position: relative;
  left: 7%;
  margin: auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 1fr;
}

.article-detail {
  background-color: white;
  height: 90%;
  width: 92%;
  position: relative;
  right: 2%;
  margin: auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 1fr;
  flex-direction: column;
  max-height: 95%;

  overflow: hidden;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
  background-color: #f0f0f0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.list {
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.md-editor {
  width: 80%;
  flex: 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0 auto;
}
.md-editor::-webkit-scrollbar {
  display: none;
}
</style>
