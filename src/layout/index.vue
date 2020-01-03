<template>
  <!-- 根据sidebar的开关状态动态添加class -->
  <div :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <PageHeader></PageHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sidebar from './Sidebar';
import PageHeader from './PageHeader';
export default {
  components: {
    sidebar,
    PageHeader
  },

  computed: {
    ...mapGetters(['sidebar']),
    classObj() {
      return {
        openSidebar: this.sidebar.isOpen,
        hideSidebar: !this.sidebar.isOpen
      };
    }
  }
};
</script>

<style lang="scss">
.sidebar-container {
  width: $sideBarWidth;
  transition: width 0.28s;
  height: 100%;
  background-color: $menuBg;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  font-size: 0px;
  overflow: hidden;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
}

//sidebar隐藏时的状态
.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px;
  }

  //覆盖默认样式，同样style标签没有scoped,否则无效
  //el-menu收缩时,隐藏嵌套子菜单的标题(span隐藏)，只显示icon
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}

.main-container {
  margin-left: $sideBarWidth;
  transition: margin-left 0.28s;
}
</style>
