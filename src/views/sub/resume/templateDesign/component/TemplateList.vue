<script setup lang="ts">
import TemplateCard from './TemplateCard.vue'

const props = defineProps<{
  category: string
  templateList: any
  legoPersonList: any
  categoryList: any
}>()

// 卡片宽度
const cardWidth = computed(() => {
  let width = ''
  props.categoryList.forEach((item: { category_label: string, width: string }) => {
    if (item.category_label === props.category) {
      width = `${item.width}px`
    }
  })
  return width || '300px'
})

// 卡片高度
const cardHeight = computed(() => {
  let height = ''
  props.categoryList.forEach((item: { category_label: string, height: string }) => {
    if (item.category_label === props.category) {
      height = `${item.height}px`
    }
  })
  return height || '400px'
})

// 跳转至详情页
const router = useRouter()
function toDesignDetail(cardData: { id: any, category: any }) {
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
  <div class="lego-template-list-wrap-box">
    <div class="template-list-box-new">
      <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
        <TemplateCard
          :card-data="item"
          :width="cardWidth"
          :height="cardHeight"
          @to-design="toDesignDetail"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .lego-template-list-wrap-box {
  display: flex;
  flex-direction: column;
  .template-list-box-new {
    display: flex;
    flex-wrap: wrap;
    padding: 30px 0 0 0;
    .card-box-item {
      &:not(:nth-child(4n)) {
        margin-right: 33px;
      }
    }
  }
}
</style>
