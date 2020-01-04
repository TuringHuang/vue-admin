const getters = {
  sidebar: state => state.app.sidebar,
  roles: state => state.permission.routes,
  token:state=>state.user.token
};

export default getters;
