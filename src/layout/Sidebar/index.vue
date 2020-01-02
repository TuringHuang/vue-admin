<template>
  <div>
    <logo :collpase="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
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
    return {
      routes: [
        {
          path: '/',
          name: 'index',
          meta: {
            title: 'Permission',
            icon: 'dashboard'
          },
          // component: Layout,
          children: [
            {
              path: 'home',
              name: 'home',
              meta: {
                title: 'Page Permission'
              },
              children: [
                {
                  path: 'menu1',
                  name:'menu1',
                  meta:{
                    title:'menu1-1'
                  }
                },
                 {
                  path: 'menu',
                  name:'menu1',
                  meta:{
                    title:'menu1-2'
                  }
                }
              ]
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
            },
            {
              path: '/about',
              name: 'about',
              meta: {
                title: 'Directive Permission'
              }

              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            }
          ]
        },
        {
          path: '/permission',
          name: 'permission',
          meta: {
            title: '用户权限',
            icon: 'lock'
          }
        }
      ]
    };
  },

  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      return !this.sidebar.isOpen;
    },

    variables() {
      return variables;
    }
  }
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
