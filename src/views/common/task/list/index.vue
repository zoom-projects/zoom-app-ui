<script setup lang="ts">
import { useTaskListHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtions,
  onLoad,
} = useTaskListHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="onLoad"
      :table="{
        actionBar: {
          buttons: actionButtions,
        },
      }"
    />
  </div>
</template>
