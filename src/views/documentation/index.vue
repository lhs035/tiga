<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target="_blank" href="javascript:;">文档1</a>
    <a class="document-btn" target="_blank" href="javascript:;">文档2</a>
    <a class="document-btn" target="_blank" href="javascript:;">文档3</a>
    <a class="document-btn" target="_blank" href="javascript:;">文档4</a>
    <dropdown-menu class="document-btn" :items="articleList" title="系列文章" />
  </div>
</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: '基础篇' },
        { title: '登录权限篇' },
        { title: '实战篇' },
        { title: 'vue-admin-template 篇' },
        { title: 'v4.0 篇' },
        { title: '自行封装 component' },
        { title: '优雅的使用 icon' },
        { title: 'webpack4（上）' },
        { title: 'webpack4（下）' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
