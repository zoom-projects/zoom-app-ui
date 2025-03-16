<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/hook'
import { useDomainAccountHook } from './utils/hook'

const {
  plusSearchRef,
  plusSearchColumns,
  searchModel,
  handleSearch,
  getDomainPlatform,
  dataList,
  dialogFormRef,
  dialogVisible,
  dialogLoading,
  dialogFormColumns,
  dialogFormModel,
  dialogFormRules,
  handleOpenDialog,
  handleConfirm,
  getAccountField,
  handleDelete,
  handlePull,
} = useDomainAccountHook()
</script>

<template>
  <div class="main">
    <ElCard shadow="never">
      <PlusSearch
        ref="plusSearchRef"
        v-model="searchModel"
        :columns="plusSearchColumns"
        @search="handleSearch"
        @change="handleSearch"
      />
    </ElCard>
    <div class="cards-box">
      <div class="mb-2 flex justify-end">
        <ElButton type="primary" @click="handleOpenDialog()">
          添加账号
        </ElButton>
      </div>
      <div class="cards-container">
        <ElCard
          v-for="item in dataList"
          :key="item.id"
          class="cursor-pointer"
          :class="[`card-${item.platform}`]"
          shadow="hover"
          hoverable
          :bordered="true"
          @click="handleOpenDialog(item)"
        >
          <template #header>
            <div class="flex items-center justify-between gap-10">
              <div class="flex items-center gap-16">
                <ElImage style="height: 18px;" :src="getDomainPlatform(item.platform)?.icon" />
                <ElTag>{{ item.label }}</ElTag>
              </div>
              <ElSpace size="small" @click.stop>
                <ElTooltip content="从平台拉取域名">
                  <div>
                    <ElPopconfirm title="确定要拉取吗？" @confirm.stop="handlePull(item)">
                      <template #reference>
                        <ElButton type="primary" link :icon="useRenderIcon({ icon: 'iconify-ri:download-cloud-2-line', size: '18px' })" circle />
                      </template>
                    </ElPopconfirm>
                  </div>
                </ElTooltip>
                <ElPopconfirm title="确定要删除吗？" @confirm.stop="handleDelete(item)">
                  <template #reference>
                    <ElButton type="danger" link :icon="useRenderIcon({ icon: 'iconify-ri:delete-bin-2-line', size: '18px' })" circle />
                  </template>
                </ElPopconfirm>
              </ElSpace>
            </div>
          </template>
          <ElSpace direction="vertical" style="width: 100%; align-items: start;">
            <template v-for="(xItem, index) in getAccountField(item)" :key="index">
              <ElSpace v-if="xItem.value">
                <ElText type="info">
                  {{ xItem.label }}:
                </ElText>
                <ElText>{{ xItem.value }}</ElText>
              </ElSpace>
            </template>
          </ElSpace>
        </ElCard>
        <ElEmpty v-if="dataList?.length === 0" description="暂无数据">
          <template #description>
            <span class="">暂无数据</span>
            <ElButton type="primary" @click="handleOpenDialog()">
              添加账号
            </ElButton>
          </template>
        </ElEmpty>
      </div>
    </div>

    <PlusDialogForm
      ref="dialogFormRef"
      v-model="dialogFormModel"
      v-model:visible="dialogVisible"
      :form="{
        columns: dialogFormColumns,
        rules: dialogFormRules,
        labelWidth: '100px',
      }"
      :dialog="{
        title: dialogFormModel.id ? '编辑账号' : '添加账号',
        width: '45%',
      }"
    >
      <template #dialog-footer>
        <ElButton @click="dialogVisible = false">
          取消
        </ElButton>
        <ElPopconfirm title="确定要提交吗？" @confirm="handleConfirm" @cancel="dialogVisible = false">
          <template #reference>
            <ElButton type="primary" :loading="dialogLoading">
              提交
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>

<style lang="scss" scoped>
.cards-box {
  margin: 16px 0;
  padding: 16px;
  background-color: var(--el-bg-color-overlay);
  height: calc(100vh - 300px);
  overflow: auto;
  .cards-container {
    display: grid;
    overflow: auto;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: min-content;
    gap: 16px;
    max-width: 100%;
    justify-content: center;

    :deep(.el-card) {
      height: fit-content;
    }

    // 当只有一个卡片时限制宽度和高度
    &:has(> :only-child) {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      :deep(.el-card) {
        width: 45%;
        flex-shrink: 0;
      }
    }

    // 当显示 Empty 组件时的样式
    &:has(> .el-empty) {
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(.el-empty__description) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      span {
        color: var(--el-text-color-secondary);
      }
    }
  }
}
.card-aliyun,.card-cf {
  :deep(.el-tag) {
    background-color: #ff6a00;
    color: #fff;
  }
  // :deep(.el-icon) {
  //   color: #ff6a00;
  // }
}
.card-tencent {
  :deep(.el-tag) {
    background-color: #007cc3;
    color: #fff;
  }
  // :deep(.el-icon) {
  //   color: #007cc3;
  // }
}
</style>
