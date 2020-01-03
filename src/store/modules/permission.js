import { asyncRoutes, constantRoutes } from '@/router';

/**
 *
 * @param {*} roles  当前用户的所有角色
 * @param {*} route  单个路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //当前用户的角色数组中，有一个匹配到了就返回true
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    //没有权限限制
    return true;
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  //遍历所有的动态路由，递归匹配
  route.forEach(route => {
    let temp = { ...route };
    if (hasPermission(roles, temp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  //当前用户拥有的全部路由
  routes: [],
  //当前用户动态生成的路由
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  //根据用户的角色动态生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      //如果用户角色中有admin，那么拥有全部权限
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        //否则根据角色过滤掉动态路由
        accesedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
