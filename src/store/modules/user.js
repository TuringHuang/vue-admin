import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, logout, getInfo } from '@/api/user';

const state = {
  token: getToken(),
  name: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;

    return login(userInfo)
      .then(res => {
        //保存token到vuex
        commit('SET_TOKEN', res.data);
        //保存token到cookie
        setToken(res.data);
      })
  },

  getInfo({ commit,state } ) {
    return getInfo(state.token)
      .then(({ data: roles }) => {
        //解构对象{ data:roles },重命名data为roles
        commit('SET_ROLES', roles);
        //then返回的是一个新的promise,then函数的返回值作为这个promise的resovle()的参数
        return { roles };
      })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
