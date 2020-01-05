<template>
  <div>
    <logo :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item v-for="route in roles" :key="route.path" :item="route" :base-path="route.path"> </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo';
import SidebarItem from './SidebarItem';

import variables from '@/styles/variables.scss';
import { mapGetters } from 'vuex';
export default {
  components: {
    Logo,
    SidebarItem
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(['sidebar', 'roles']),
    isCollapse() {
      return !this.sidebar.isOpen;
    },

    variables() {
      return variables;
    }
  },

  mounted () {
    console.log('routes: ',this.roles);
  },
};
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}

.el-scrollbar {
  height: 100%;
}

.el-menu {
  // 去掉el-menu原有的border,这个border会造成每个menu的宽度大小不一
  border: none;
  height: 100%;
  width: 100% !important;

}
</style>
