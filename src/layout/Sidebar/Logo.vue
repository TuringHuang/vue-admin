<template>
  <div class="logo-container" :class="{ collapse: collapse }">
    <transition name="logo-fade">
      <router-link v-if="collapse" class="siderbar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>

      <router-link v-else class="siderbar-logo-link" to="/">
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
      default: false
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
.logo-fade-enter-active {
  transition: opacity 1.5s;
}

.logo-fade-enter,
.logo-fade-leave-to {
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
    margin-right: 15px;
    vertical-align: middle;
  }

  & .sidebar-title {
    display: inline-block;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    vertical-align: middle
  }

  & .collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
