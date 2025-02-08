<script setup lang="ts">
import * as resumeTemplateApi from '@/api/modules/resume/template'
import router from '@/router'
import SvgIcon from '../legoDesigner/components/svgIcon/SvgIcon.vue'
import Category from './component/Category.vue'
import LatestDesign from './component/LatestDesign.vue'
import CategoryData from './data/category.json'
// 查询分类列表
const categoryList = ref<any>([])
async function getLegoTemplateCategoryList() {
  const data = CategoryData
  categoryList.value = data.map(
    (item: { name: any, _id: any, width: any, height: any }) => {
      return {
        category_label: item.name,
        category_value: item._id,
        width: item.width,
        height: item.height,
      }
    },
  )
  // 添加全部选项
  categoryList.value.unshift({
    category_label: '全部',
    category_value: '',
    width: 200,
    height: 300,
  })
}
getLegoTemplateCategoryList()

const category = ref<string>('全部')
// 卡片宽度
const cardWidth = computed(() => {
  let width = ''
  categoryList.value.forEach((item: { category_label: string, width: string }) => {
    if (item.category_label === category.value) {
      width = `${item.width}px`
    }
  })
  return width || '300px'
})

// 卡片高度
const cardHeight = computed(() => {
  let height = ''
  categoryList.value.forEach((item: { category_label: string, height: string }) => {
    if (item.category_label === category.value) {
      height = `${item.height}px`
    }
  })
  return height || '400px'
})

// 查询个人积木创作历史列表
const legoPersonList = ref<Array<any>>([])
const personTotal = ref<number>(0)
const personLimit = ref<number>(3)
async function getLegoUserResumeList() {
  const params = {
    page: 1,
    size: personLimit.value,
    sorts: 'created desc',
  }
  const { success, data, msg } = await resumeTemplateApi.page(params)

  if (success) {
    legoPersonList.value = data.records
    personTotal.value = data.total
  }
  else {
    ElMessage.error(msg)
  }
}
getLegoUserResumeList()

// 删除个人制作简历
async function deletePersonTemplate(id: string) {
  const { success, msg } = await resumeTemplateApi.deleteTemplate(id)
  if (success) {
    ElMessage.success('删除成功')
    getLegoUserResumeList()
  }
  else {
    ElMessage.error(msg)
  }
}

// 复制个人制作简历
async function copyUserResume(cardData: { id: string, category: string }) {
  router.push({
    path: '/resume/legoDesigner',
    query: {
      templateId: cardData.id,
      category: cardData.category,
    },
  })
}
</script>

<template>
  <div class="lego-template-list-box">
    <div class="content-box">
      <!-- 最近的设计 -->
      <div class="latest-design-box">
        <LatestDesign
          :lego-person-list="legoPersonList"
          :card-height="cardHeight"
          :card-width="cardWidth"
          :category="category"
          @delete-person-template="deletePersonTemplate"
          @copy-user-resume="copyUserResume"
        />
        <!-- 查看更多 -->
        <div v-if="personTotal > personLimit" class="see-more-box">
          <p>
            查看全部
            <SvgIcon icon-name="icon-chakangengduo" color="#737373" size="18px" />
          </p>
        </div>
      </div>
      <!-- 分类筛选 -->
      <Category
        :category-list="categoryList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
 .lego-template-list-box {
  width: 100%;
  .content-box {
    margin: 0 auto;
    min-height: 500px;
    padding-bottom: 20px;
    .latest-design-box {
      .see-more-box {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        p {
          cursor: pointer;
          letter-spacing: 3px;
          font-size: 14px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          color: #737373;
          &:hover {
            color: green;
          }
        }
      }
    }
    .no-data-box {
      margin-top: 80px;
    }
  }
}
</style>
