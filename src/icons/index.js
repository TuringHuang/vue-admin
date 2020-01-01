import Vue from 'vue';
import SvgIcon from '../components/SvgIcon';

Vue.component('svg-icon', SvgIcon);

//加载svg文件夹下的所有文件
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
