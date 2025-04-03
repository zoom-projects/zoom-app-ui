<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/hook'
import { openLink } from '@/utils'
import DomainAccountEdit from '@/views/sub/domain/component/account/domain/edit/index.vue'
import Record from './record.vue'
import { useDomainInfoHook } from './utils/hook'

const {
  getDomainPlatform,
  plusSearchRef,
  plusSearchColumns,
  searchModel,
  handleSearch,
  handleCopy,

  dataList,

  pageLoading,
  pageTotal,
  pagination,
  handleChangePage,
  pageRef,

  dialogExpireTimeRef,
  dialogExpireTimeVisible,
  dialogExpireTimeLoading,
  dialogExpireTimeModel,
  dialogExpireTimeColumns,
  openExpireTimeDialog,
  handleExpireTimeSave,

  dialogDomainRef,
  dialogDomainVisible,
  dialogDomainLoading,
  dialogDomainModel,
  dialogDomainColumns,
  dialogDomainRules,
  handleOpenDomainDialog,
  handleDomainSave,
  handleRemove,

  recordVisible,
  currentDomainInfo,
  openRecordDialog,

  dialogMonitorRef,
  dialogMonitorVisible,
  dialogMonitorLoading,
  dialogMonitorModel,
  dialogMonitorColumns,
  handleMonitorSave,
  openMonitorDialog,

  dialogDomainAccountVisible,
  dialogDomainAccountFormModel,
  handleOpenDomainAccountDialog,
  loadAccountList,

} = useDomainInfoHook()
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
        <ElButton type="primary" @click.stop="handleOpenDomainDialog()">
          绑定域名
        </ElButton>
      </div>
      <div v-loading="pageLoading" class="cards-container">
        <ElCard
          v-for="item in dataList"
          :key="item.id"
          class="cursor-pointer"
          :class="[`card-${item.cloud}`]"
          shadow="hover"
          hoverable
          :bordered="true"
          @click.stop="openRecordDialog(item)"
        >
          <template #header>
            <div class="flex items-center justify-between gap-10">
              <ElSpace>
                <ElImage style="height: 18px;" :src="getDomainPlatform(item.cloud)?.icon" />
              </ElSpace>
              <div class="flex items-center gap-2">
                <ElTooltip content="域名监控">
                  <ReIcon
                    icon="svg-icon:monitor-outlined"
                    size="18px"
                    :color="item.isMonitor ? '#67C23A' : ''"
                    @click.stop="openMonitorDialog(item)"
                  />
                </ElTooltip>
                <ElTag type="info">
                  {{ item.accountLabel }}
                </ElTag>
              </div>
            </div>
          </template>
          <div class="domain-box">
            <div class="info-row">
              <div class="domain-wrapper">
                <span class="domain_title">{{ item.domain }}</span>
                <ReIcon icon="i-ep:copy-document" size="18px" @click.stop="handleCopy(item, 'domain')" />
              </div>
            </div>
            <div class="info-row" style="height: 30px;">
              <div class="w-full flex items-center justify-between">
                <div class="item-center flex">
                  <ElText type="info">
                    有效期
                  </ElText>
                  <ElTooltip :content="item.expireTime ? `过期时间：${item.expireTime}` : '未设置过期时间'">
                    <ElSpace :size="2" style="margin-left: 8px;">
                      <ElText type="info">
                        {{ item.expireDays ? `${item.expireDays}天` : '未设置' }}
                      </ElText>
                      <ReIcon
                        icon="i-ep:setting"
                        size="18px"
                        @click.stop="openExpireTimeDialog(item)"
                      />
                    </ElSpace>
                  </ElTooltip>
                </div>
                <ElButton v-if="item.renewLink" link type="primary" class="hover_show" @click.stop="openLink(item.renewLink)">
                  续约域名
                </ElButton>
              </div>
            </div>
          </div>
          <template #footer>
            <ElPopconfirm
              title="确定删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleRemove(item)"
            >
              <template #reference>
                <ElButton :icon="useRenderIcon({ icon: 'i-ep:delete' })" circle @click.stop />
              </template>
            </ElPopconfirm>
            <ElTooltip content="申请证书">
              <ElButton :icon="useRenderIcon({ icon: 'svg-icon:verified-outlined' })" circle />
            </ElTooltip>
            <ElTooltip content="监控SSL证书">
              <ElButton :icon="useRenderIcon({ icon: 'i-ep:monitor' })" circle />
            </ElTooltip>
            <ElTooltip content="查看解析记录">
              <ElButton
                :icon="useRenderIcon({ icon: 'iconify-ri:list-check' })"
                circle
                @click.stop="openRecordDialog(item)"
              />
            </ElTooltip>
          </template>
        </ElCard>
      </div>
    </div>
    <div class="card-footer">
      <PlusPagination
        ref="pageRef"
        v-model="pagination"
        :total="pageTotal"
        @change="handleChangePage"
      />
    </div>

    <PlusDialogForm
      ref="dialogExpireTimeRef"
      v-model="dialogExpireTimeModel"
      v-model:visible="dialogExpireTimeVisible"
      :form="{
        labelWidth: '100px',
        columns: dialogExpireTimeColumns,
        rules: {
          expireTime: [{ required: true, message: '请选择过期时间', trigger: 'blur' }],
        },
      }"
      :dialog="{
        title: '设置过期时间',
        width: '30%',
        confirmLoading: dialogExpireTimeLoading,
        loading: dialogExpireTimeLoading,
      }"
      @confirm="handleExpireTimeSave()"
    />

    <PlusDialogForm
      ref="dialogDomainRef"
      v-model="dialogDomainModel"
      v-model:visible="dialogDomainVisible"
      :form="{
        labelWidth: '100px',
        columns: dialogDomainColumns,
        rules: dialogDomainRules,
      }"
      :dialog="{
        title: '绑定域名',
        width: '30%',
        confirmLoading: dialogDomainLoading,
        loading: dialogDomainLoading,
      }"
      @confirm="handleDomainSave()"
    >
      <template #plus-field-accountId="{ prop, column }">
        <el-select v-model="dialogDomainModel[prop]" :clearable="column.clearable">
          <el-option
            v-for="item in column.options.value"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <template #footer>
            <el-button
              type="primary"
              text
              @click="handleOpenDomainAccountDialog()"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增
            </el-button>
          </template>
        </el-select>
      </template>
    </PlusDialogForm>

    <PlusDialogForm
      ref="dialogMonitorRef"
      v-model="dialogMonitorModel"
      v-model:visible="dialogMonitorVisible"
      :form="{
        labelWidth: '100px',
        columns: dialogMonitorColumns,
      }"
      :dialog="{
        title: '监控域名',
        width: '30%',
        confirmLoading: dialogMonitorLoading,
        loading: dialogMonitorLoading,
      }"
      @confirm="handleMonitorSave()"
    />

    <DomainAccountEdit
      v-model:form-model="dialogDomainAccountFormModel"
      v-model:visible="dialogDomainAccountVisible"
      @success="loadAccountList()"
    />

    <Record v-model:visible="recordVisible" :domain-obj="currentDomainInfo" />
  </div>
</template>

<style lang="scss" scoped>
.cards-box {
  margin: 16px 0;
  padding: 16px;
  background-color: var(--el-bg-color-overlay);
  height: calc(100vh - 330px);
  overflow: auto;
  position: relative;
  .cards-container {
    display: grid;
    overflow: auto;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: min-content;
    gap: 16px;
    min-height: 400px;
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

.card-footer {
  margin-top: 16px;
  background-color: var(--el-bg-color-overlay);
  padding: 0 16px;
}
.card-aliyun,
.card-cf {
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

.domain-box {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  // height: 80px;
  padding: 0 10px;
  width: 100%;
  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;

    .label {
      font-size: 12px;
      // color: v-bind('token.colorTextLabel');
      // width: 50px;
      flex-shrink: 0;
      // margin-right: 4px;
    }
    .domain-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      width: 100%;
      gap: 8px;
      .domain_title {
        font-size: 16px;
        font-weight: 500;
        // color: v-bind('token.colorText');
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;
      }
    }
    .hover_show {
      display: none;
      font-size: 12px;
    }
  }
}
:deep(.el-card) {
  &:hover {
    .hover_show {
      display: block;
    }
  }
}
</style>
