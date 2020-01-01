<template>
  <div>
    <!-- 递归组件必须要有结束条件 -->
    <template v-if="noChild(item.children)">
      <router-link to="resolvePath('')">
        <el-menu-item :index="resolvePath(item.path)">
          <svg-icon :icon-class="item.meta.icon"></svg-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <!-- 嵌套有子菜单的递归展开 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <svg-icon :icon-class="item.meta.icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
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
  },

  mounted() {
    console.log(this.item.meta.title);
  }
};
</script>

<style lang="scss" scoped>
// 设置嵌套有子菜单的背景色
.el-submenu .el-menu-item {
  background-color: $subMenuHover !important;
}
</style>
