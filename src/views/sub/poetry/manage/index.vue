<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import AuthorDetail from '../components/author/detail/index.vue'
import CollectionDetail from '../components/collection/detail/index.vue'
import RhythmicDetail from '../components/rhythmic/detail/index.vue'
import { usePoetryMangeHook } from './utils/hook'

const {
  searchForm,
  searchColumns,
  getPoetryList,
  handleReset,
  tableData,

  pageTotal,
  pageInfo,
  handlePageChange,

  plusDrawerFormRef,
  drawerVisible,
  drawerLoading,
  drawerModel,
  formColumns,
  formRules,
  handleOpenDrawer,
  handleConfirm,
  handleDelete,

  authorVisible,
  authorModel,
  handleOpenAuthor,
  handleAuthorSuccess,

  collectionVisible,
  collectionModel,
  handleOpenCollection,
  handleCollectionSuccess,

  rhythmicVisible,
  rhythmicModel,
  handleOpenRhythmic,
  handleRhythmicSuccess,
} = usePoetryMangeHook()
</script>

<template>
  <div class="main">
    <ElCard>
      <PlusSearch
        v-model="searchForm"
        :columns="searchColumns"
        @search="getPoetryList"
        @reset="handleReset"
      />
    </ElCard>

    <ElCard class="mt-10">
      <div class="table-header">
        <div class="header-title">
          诗词列表
        </div>
        <ElButton
          type="primary"
          :icon="Plus"
          @click="handleOpenDrawer()"
        >
          添加诗词
        </ElButton>
      </div>

      <ElRow v-if="tableData.length" :gutter="20" class="poetry-list">
        <ElCol
          v-for="(item, index) in tableData"
          :key="index"
          :span="6"
        >
          <ElCard
            :body-style="{ padding: '10px' }"
            class="poetry-card"
            :style="{ height: '100%' }"
            @click="handleOpenDrawer(item)"
          >
            <div class="poetry-main">
              <div class="poetry-title">
                <h3>{{ item.title }}</h3>
              </div>
              <div class="poetry-author">
                [{{ item.author.dynasty.shortName }}]  {{ item.author.name }}
              </div>
              <div class="poetry-content">
                <table>
                  <tbody>
                    <tr v-for="(content, index) in item.paragraphs" :key="index">
                      <td>{{ content }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
      <ElEmpty v-else />

      <PlusPagination
        v-model="pageInfo"
        :total="pageTotal"
        @change="handlePageChange"
      />
    </ElCard>

    <PlusDrawerForm
      ref="plusDrawerFormRef"
      v-model:visible="drawerVisible"
      v-model="drawerModel"
      :form="{
        columns: formColumns,
        rowProps: {
          gutter: 20,
        },
        colProps: {
          span: 12,
        },
        rules: formRules,
      }"
      :title="drawerModel.id ? '编辑诗词' : '添加诗词'"
      :confirm-loading="drawerLoading"
      size="50%"
      @confirm="handleConfirm"
    >
      <template #plus-field-authorId="{ prop, options, fieldProps }:any">
        <ElSelect
          v-model="drawerModel[prop]"
          :placeholder="fieldProps.placeholder"
          :clearable="fieldProps.clearable ?? true"
          :multiple="fieldProps.multiple ?? false"
          :filterable="fieldProps.filterable ?? true"
          v-bind="fieldProps"
        >
          <ElOption
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
          <template #footer>
            <ElButton
              type="primary"
              text
              @click="handleOpenAuthor"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增作者
            </ElButton>
          </template>
        </ElSelect>
      </template>
      <template #plus-field-rhythmicId="{ prop, options, fieldProps }:any">
        <ElSelect
          v-model="drawerModel[prop]"
          :placeholder="fieldProps.placeholder"
          :clearable="fieldProps.clearable ?? true"
          :multiple="fieldProps.multiple ?? false"
          :filterable="fieldProps.filterable ?? true"
        >
          <ElOption
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
          <template #footer>
            <ElButton
              type="primary"
              text
              @click="handleOpenRhythmic"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增词牌
            </ElButton>
          </template>
        </ElSelect>
      </template>
      <template #plus-field-collectionId="{ prop, options, fieldProps }:any">
        <ElSelect
          v-model="drawerModel[prop]"
          :placeholder="fieldProps.placeholder"
          :clearable="fieldProps.clearable ?? true"
          :multiple="fieldProps.multiple ?? false"
          :filterable="fieldProps.filterable ?? true"
        >
          <ElOption
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
          <template #footer>
            <ElButton
              type="primary"
              text
              @click="handleOpenCollection"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增收录
            </ElButton>
          </template>
        </ElSelect>
      </template>

      <template #drawer-footer>
        <div class="drawer-footer">
          <div class="footer-left">
            <ElPopconfirm
              title="确定要删除吗？"
              @confirm="handleDelete(drawerModel)"
            >
              <template #reference>
                <ElButton v-if="drawerModel.id" type="danger" :loading="drawerLoading">
                  删除
                </ElButton>
              </template>
            </ElPopconfirm>
          </div>
          <div class="footer-right">
            <ElButton @click="drawerVisible = false">
              取消
            </ElButton>
            <ElButton
              type="primary"
              :loading="drawerLoading"
              @click.stop="handleConfirm"
            >
              确定
            </ElButton>
          </div>
        </div>
      </template>
    </PlusDrawerForm>

    <AuthorDetail
      v-model:visible="authorVisible"
      v-model:model="authorModel"
      @success="handleAuthorSuccess"
    />

    <CollectionDetail
      v-model:visible="collectionVisible"
      v-model:model="collectionModel"
      @success="handleCollectionSuccess"
    />
    <RhythmicDetail
      v-model:visible="rhythmicVisible"
      v-model:model="rhythmicModel"
      @success="handleRhythmicSuccess"
    />
  </div>
</template>

<style>
html {
  --poetry-author-color: #999;
  --poetry-content-color: #333;
}

html.dark {
  --poetry-author-color: #ccc;
  --poetry-content-color: #eee;
}
</style>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .header-title {
    font-size: 18px;
    font-weight: bold;
  }
}
.poetry-list {
  // gap 上下间距 col 上下间距问题

  ::v-deep(.el-col) {
    margin-bottom: 20px;
  }
}
.poetry-card {
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .poetry-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: 100%;
    .poetry-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .poetry-author {
      font-size: 14px;
      color: var(--poetry-author-color);
    }
    .poetry-content {
      margin-top: 10px;
      max-height: 240px;
      overflow-y: auto;
      table {
        width: 100%;
        border-collapse: collapse;
        tr {
          td {
            padding: 5px 0;
            text-align: center;
            font-size: 14px;
            color: var(--poetry-content-color);
          }
        }
      }
    }
  }
}

.drawer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  .footer-left {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 10px;
    }
  }
  .footer-right {
    display: flex;
    align-items: center;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
