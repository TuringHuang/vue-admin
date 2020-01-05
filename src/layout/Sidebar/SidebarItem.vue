<template>
  <!-- 不显示需要隐藏的路由 -->
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 递归组件必须要有结束条件 -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <!-- 路由中有meta才显示 -->
      <router-link v-if="onlyOneChild.meta" :to="resolvePath('')">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <svg-icon v-if="onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
          <!-- 注意这里title要使用插槽，否则菜单收缩时，无法隐藏 -->
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <!-- 嵌套有子菜单的递归展开 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <svg-icon  v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 嵌套2级以上的菜单,添加样式nest-menu -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        :is-nest="true"
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

  data() {
    return {
      onlyOneChild: null
    };
  },

  methods: {
    //只有一个子路由或者没有子路由的，都只显示为一个菜单项
    //因为如果都写在根布局的children下，最后显示就是一个菜单项，所以要配置成多个路由，然后下面只有一个子路由
    hasOneShowingChild(children = [], parent) {
      const showChildren = children.filter(item => {
        //过滤掉需要隐藏的路由
        if (item.hiddren) {
          return false;
        } else {
          //记录每一个路由，当只有一个子路由时有用
          this.onlyOneChild = item;
          return true;
        }
      });

      //只有一个子路由的，显示子路由做为菜单项
      if (showChildren.length === 1) {
        return true;
      }

      //没有子路由的，显示父路由作为菜单项
      if (showChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
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

// 覆盖element-ui在嵌套有子菜单中的默认背景色,这里设置范围在sidebar-container内，而不是全局覆盖
.sidebar-container {
  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;
    padding-left: 60px !important; 

    &:hover {
      background-color: $subMenuHover !important;
    }
  }

  .el-submenu{
    .el-submenu__title{
      padding-left:30px !important; 
    }
  }
}
</style>
