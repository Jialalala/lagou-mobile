<template>
  <div class="lesson-video">
    <!-- 导航 -->
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 设置视频容器 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { videoPlayInfo } from '@/services/course'
export default {
  name: 'LessonVideo',
  components: {
    VanNavBar: NavBar
  },
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await videoPlayInfo({
        lessonId: this.lessonId
      })
      console.log(data)
      // 初始化播放器
      const player = new window.Aliplayer({
        // 视频容器 id
        id: 'video-container',
        // 视频 ID
        vid: data.content.fileId,
        // 视频凭证
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      })
      console.log(player)
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson-video {
  height: 210px;
}
</style>
