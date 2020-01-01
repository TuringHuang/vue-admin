import Cookies from 'js-cookie';

const state = {
  sidebar: {
    isOpen: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  }
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.isOpen = !state.sidebar.isOpen;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.isOpen) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
