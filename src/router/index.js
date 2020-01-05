import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../layout';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '用户登录' },
    component: () => import('../views/Login.vue'),
    hidden: true
  }
];

//动态路由
export const asyncRoutes = [

  //没有meta,首页将不会显示
  {
    path: '/',
    component: Layout,
    redirect: '/manager',
  },

  {
    path: '/manager',
    name: 'index.manager',
    component: Layout,
    redirect: '/manager/member-manager',
    meta: { title: '账户管理', icon: 'dashboard' },
    children: [
      {
        path: 'member-manager',
        name: 'member-manager',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '会员管理' }
      },
      {
        path: 'admin-manager',
        name: 'admin-manager',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '管理员' }
      },
      {
        path: 'account-setting',
        name: 'account-setting',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { title: '账号设置' }
      }
    ]
  },

  {
    path: '/setting',
    name: 'index.setting',
    component: Layout,
    meta: { title: '配置管理', icon: 'lock' },
    children: [
      {
        path: 'website',
        name: 'index.setting.website',
        meta: { title: '网站配置' },
        component: () => import('../views/website-setting.vue')
      },
      {
        path: 'service',
        name: 'index.setting.service',
        meta: { title: '客服配置' },
        component: () => import('../views/service-setting.vue')
      },
      {
        path: 'resource',
        name: 'index.setting.resource',
        meta: { title: '资源配置' },
        component: () => import('../views/resource-mgt.vue')
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
