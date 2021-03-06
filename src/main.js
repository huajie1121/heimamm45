import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./style/bass.css"

//全局过滤器
import "./filters/index"

Vue.config.productionTip = false
window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
