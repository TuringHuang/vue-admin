<template>
  <div class="menu-wrapper">
    <!-- 递归组件必须要有结束条件 -->
    <template v-if="noChild(item.children)">
      <router-link :to="resolvePath('')">
        <el-menu-item :index="resolvePath(item.path)">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <!-- 注意这里title要使用插槽，否则菜单收缩时，无法隐藏 -->
          <span slot="title" >{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <!-- 嵌套有子菜单的递归展开 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 嵌套2级以上的菜单,添加样式nest-menu -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        :is-nest='true'
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },

    //有嵌套路由的时候，需要拼接父路由的path
    basePath: {
      type: String,
      default: ''
    },

    // 是否有菜单嵌套
    isNest: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    noChild(children = []) {
      const showChildren = children.filter(item => {
        if (item.hiddren) {
          return false;
        } else {
          return true;
        }
      });

      if (showChildren && showChildren.length === 0) {
        return true;
      }

      return false;
    },

    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>

<style lang="scss">
// 注意: style标签这里没有scope，否则无效

// 覆盖element-ui在嵌套有子菜单中的默认背景色,这里设置范围在sidebar内，不是全局覆盖
.sidebar-container {
  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
</style>
