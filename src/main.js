import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus=new Vue()

//安装Toast插件 默认会执行install函数
Vue.use(toast)

//解决移动端300毫秒延迟
FastClick.attach(document.body)

//使用懒加载插件 v-lazy = :src  注意版本1.2.6
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
