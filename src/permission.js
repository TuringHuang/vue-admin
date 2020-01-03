import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style

import { Message } from 'element-ui';
import { getToken } from './utils/auth';

NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const hasToken = getToken();

  //根据是否有token做不同处理
  if (hasToken) {
    //有token,还去登录页，重定向到首页
    if ((to.path = '/login')) {
      next({ path: '/' });
      NProgress.done();
    } else {
      //有token，先判断是否已经获取到用户身份，角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          //没有用户角色的，先获取用户角色
          const { roles } = await store.dispatch('user/getInfo');
          //根据角色生成对应可以访问的路由，保存到vuex中
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          //在路由表中配置新生成的路由
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      //没有token，并且访问的不是白名单页面，重定向跳到登录页
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});



router.afterEach(() => {
  NProgress.done();
});
