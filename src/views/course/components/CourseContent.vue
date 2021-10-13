<template>
  <div class="course-content">
    <!-- 顶部轮播设置 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list
      :fetch-data="fetchData"
    ></course-content-list>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseContentList from '@/components/CourseContentList'

export default {
  name: 'CourseContent',
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    CourseContentList
  },
  data () {
    return {
      // 轮播图图片列表
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    fetchData (option) {
      return getQueryCourses(option)
    },
    async loadAds () {
      // 此处的 '999' 代表首页轮播的广告位
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // 存储到 adList
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}

.my-swipe img {
  width: 100%;
  height: 170px;
}

.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
