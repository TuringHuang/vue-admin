<template>
  <div class="logo-container" :class="{ collapse: collapse }">
    <!-- 注意：相同元素router-link的过渡动画需要设置key，否则无效 -->
    <transition name="logoFade">
      <router-link v-if="collapse" key="collapse" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>

      <router-link v-else key="expand" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: 'Vue-Back-Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    };
  }
};
</script>

<style lang="scss" scoped>
.logoFade-enter-active {
  transition: opacity 1.5s;
}

.logoFade-enter,
.logoFade-leave-to {
  opacity: 0;
}

.logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    vertical-align: middle;
  }

  & .sidebar-title {
    display: inline-block;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    vertical-align: middle;
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
