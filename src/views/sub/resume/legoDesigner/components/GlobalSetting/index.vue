<script setup lang="ts">
import GlobalBackgroundColorEditor from '../../setters/GlobalBackgroundColorEditor.vue'
import GlobalFontFamilyEditor from '../../setters/GlobalFontFamilyEditor.vue'
import GlobalHeightEditor from '../../setters/GlobalHeightEditor.vue'
import GlobalOpacityEditor from '../../setters/GlobalOpacityEditor.vue'
import GlobalThemeColorEditor from '../../setters/GlobalThemeColorEditor.vue'
import GlobalWidthEditor from '../../setters/GlobalWidthEditor.vue'
</script>

<template>
  <div class="global-setting-box">
    <ElForm label-width="80px" label-position="left">
      <GlobalWidthEditor />
      <GlobalHeightEditor />
      <GlobalFontFamilyEditor />
      <GlobalBackgroundColorEditor />
      <GlobalThemeColorEditor />
      <GlobalOpacityEditor />
    </ElForm>
  </div>
</template>
