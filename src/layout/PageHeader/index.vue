<template>
  <div>
    <div class="header-container">
      <toggle class="toggle-container" :is-active="sidebar.isOpen" @toggleClick="toggleSidebar"></toggle>
      <div class="right-menu">
        <a class="top-menu-item">
          <span> <i class="el-icon-service"></i>&nbsp客服 </span>
        </a>
        <span class="divider"></span>

        <a href="">
          <span class="top-menu-item">
            <img class="avatar" :src="avatar" alt="" />
            <span>{{ username }}</span>
          </span>
        </a>
        <span class="divider"></span>

        <el-dropdown trigger="click">
          <span class="dropdown-link">
            <i class="el-icon-caret-bottom" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/TuringHuang">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    
    <breadcrumb class="breadcrumb-container"></breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toggle from './Toggle';
import Breadcrumb from './Breadcrumb';
export default {
  components: {
    Toggle,
    Breadcrumb
  },

  data() {
    return {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      username: 'turing'
    };
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app/toggleSideBar');
    },

    logout() {}
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .toggle-container {
    height: 100%;
    cursor: pointer;
    float: left;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    margin-right: 30px;
    float: right;

    span {
      margin: 0 8px;
      height: 100%;
      line-height: 50px;
      color: #666;
      font-size: 13px;
    }

    .top-menu-item {
      cursor: pointer;
    }

    .divider {
      display: inline-block;
      width: 1px;
      height: 12px;
      background: #e1e1e1;
      vertical-align: middle;
      margin: 0 15px;
    }

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-bottom: 5px;
    }

    .dropdown-link {
      display: inline-block;
      padding: 0 5px;
      cursor: pointer;
      border: none;
      outline: none;
    }
  }
}

.breadcrumb-container {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
</style>
