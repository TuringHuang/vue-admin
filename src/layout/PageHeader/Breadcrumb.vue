<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(route, index) in routeList" :key="route.path">
        <!-- 当前路由 -->
        <span v-if="index == routeList.length - 1" class="no-link">
          {{ route.meta.title }}
        </span>

        <router-link v-else :to="{ path: route.path || '/' }">
          {{ route.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      routeList: null
    };
  },

  created() {
    this.getBreadcrumb();
  },

  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },

  methods: {
    getBreadcrumb() {
      let matchedRoutes = this.$route.matched.filter(item => {
        return item.meta && item.meta.title;
      });
      this.routeList = matchedRoutes;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  padding-left: 15px;

  .no-link {
    color: #97a8be;
    cursor: text;
  }
}
</style>
