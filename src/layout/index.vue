<template>
  <div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <PageHeader></PageHeader>
      <p>主要内容区</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from './Sidebar';
import PageHeader from './PageHeader';
export default {
  components: {
    sidebar,
    PageHeader
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: $sideBarWidth;
  height: 100%;
  background-color: $menuBg;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  font-size: 0px;
}

.main-container {
  margin-left: $sideBarWidth;
}
</style>
