import axios from 'axios';
import store from '../store';
import { getToken } from './auth';
import { MessageBox, Message } from 'element-ui';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

//请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      console.log('设置token',store.getters.token)
      //添加请求头
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config;
  },
  err => {
    //请求错误预处理
    return Promise.reject(err);
  },
);

//响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log('axios数据响应：',response.data)
    //自定义状态码不为1表示错误
    if (res.code !== 1) {
      Message({
        message: res.message || 'ERROR',
        type: 'error',
        duration: 5 * 1000,
      });

      //10008:非法令牌，10012：其他客户端已登录，10014：令牌已过期
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        //重新登录
        MessageBox.confirm('登录状态异常，请重新登录', '确认登录信息', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }

      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },

  err => {
    Message({
      message: err.message || 'ERROR',
      type: 'error',
      duration: 5 * 1000,
    });

    return Promise.reject(err);
  },
);

export default service;
