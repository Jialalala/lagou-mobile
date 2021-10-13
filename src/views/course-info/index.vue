<template>
  <div class="course-info">
    <van-cell-group>
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-des">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程详情 -->
        <p v-html="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详情内容 -->
      <van-cell class="course-detail">
        <van-tabs scrollspy sticky>
          <van-tab title="详情">
            <!-- 详情在后台通过富文本编辑器设置的 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            />
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price}}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { CellGroup, Cell, Tabs, Tab, Tabbar, Button } from 'vant'
import { getCourseById, getSectionAndLesson } from '@/services/course'
import CourseSection from './components/CourseSection'
export default {
  name: 'CourseInfo',
  components: {
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanTabs: Tabs,
    VanTab: Tab,
    VanTabbar: Tabbar,
    VanButton: Button,
    CourseSection
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 课程章节信息
      sections: {}
    }
  },
  created () {
    this.loadCourseInfo()
    this.loadSection()
  },
  methods: {
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        // 如果已经登录
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    },
    async loadCourseInfo () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}

.course-img {
  height: 200px;
}

.course-img img {
  width: 100%;
}

// 课程描述区域
.course-des {
 padding: 10px 20px;
 height: 210px;
}

.course-sale-info {
  display: flex;
}

.course-sale-info .course-price {
  flex: 1;
  margin: 0;
}

.discounts {
  color: #ff7452;
  font-size: 24px !important;
  font-weight: 700;
}

.course-sale-info .tag {
  background-color: #f8f9fa;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
  padding: 7px;
  line-height: 15px;
  border-radius: 3px;
}

// 添加底部导航后设置
.van-cell-group {
  width: 100%;
  position: fixed;
  // 预留底部支付高度
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

// 调整内部文字位置
.van-tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 50px;
}

.price span {
  font-size: 14px;
}

.van-button {
  width: 50%;
  height: 80%;
}
</style>
