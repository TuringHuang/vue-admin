import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../layout';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'account-manager',
        name: 'account-manager',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: {
          title: '账户管理'
        },
        children: [
          {
            path: 'menu1',
            name: 'menu1',
            meta: {
              title: '会员管理'
            }
          },
          {
            path: 'menu2',
            name: 'menu2',
            meta: {
              title: '账号设置'
            }
          }
        ]
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: '关于'
        }
      },

      {
        path: '/permission',
        name: 'permission',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Permission.vue'),
        meta: {
          title: '权限控制'
        }
      }
    ]
  }
];

//动态路由
export const asyncRoutes = [
  {
    path: '/about',
    redirect: '/about/index',
    meta: { title: 'about' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'about',
        meta: {
          title: 'index',
          icon: 'qq',
          roles: ['admin', 'editor'] //角色权限控制
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
});

export default router;
