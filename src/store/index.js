import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

//2.创建Store对象
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})

export default store
