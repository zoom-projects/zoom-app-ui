<script setup lang="ts">
import * as resumeTemplateApi from '@/api/modules/resume/template'
import Loading from '@/components/Loading/index.vue'
import router from '@/router'
import NoData from '../legoDesigner/components/NoData/index.vue'
import SvgIcon from '../legoDesigner/components/svgIcon/SvgIcon.vue'
import Category from './component/Category.vue'
import LatestDesign from './component/LatestDesign.vue'
import TemplateList from './component/TemplateList.vue'
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

// 是否显示骨架
const isShowSkeleton = ref<boolean>(true)
// 查询模板列表
const page = ref<number>(1)
const limit = ref<number>(12)
const total = ref<number>(0)
const currentPage = ref<number>(1)
const templateList = ref<any>([])
async function getTemplateList() {
  isShowSkeleton.value = true
  const params = {
    page: page.value,
    size: limit.value,
    category: category.value === '全部' ? '' : category.value,
    sorts: 'created desc',
    published: true,
  }
  const { success, data, msg } = await resumeTemplateApi.queryPublished(params)
  if (success) {
    templateList.value = data.records.map((item: any) => {
      categoryList.value.forEach(
        (categoryItem: { category_label: any, width: string, height: string }) => {
          if (categoryItem.category_label === item.category) {
            item.width = `${categoryItem.width}px`
            item.height = `${categoryItem.height}px`
          }
        },
      )
      return item
    })
    total.value = data.total
    currentPage.value = data.pageNum
    isShowSkeleton.value = false
  }
  else {
    ElMessage.error(msg)
    isShowSkeleton.value = false
  }
}
getTemplateList() // 获取模板列表

// 改变页码时
function handleCurrentChange(currentPage: number) {
  page.value = currentPage
  getTemplateList()
}

// 根据分类查询模板列表

const sort = ref<string>()
async function getTemplateListByCategory(item: any) {
  category.value = item.category
  sort.value = item.sort
  page.value = 1
  limit.value = 12
  getTemplateList()
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
        @get-template-list-by-cate="getTemplateListByCategory"
      />
      <!-- 模板列表 -->
      <TemplateList
        v-if="templateList.length && !isShowSkeleton"
        :template-list="templateList"
        :lego-person-list="legoPersonList"
        :category="category"
        :category-list="categoryList"
      />
      <!-- 暂无数据 -->
      <div v-if="!templateList.length && !isShowSkeleton" class="no-data-box">
        <NoData />
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <Loading />
      </div>
      <!-- 分页组件 -->
      <div class="pagination-box">
        <ElPagination
          v-if="templateList.length && !isShowSkeleton"
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </div>
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
    .pagination-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
    }
  }
}
</style>
