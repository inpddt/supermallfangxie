import { ADD_COUTER,ADD_TO_CART } from "./mutation-types";

export default {
    //1、mutations唯一的目的修改state的状态 跟踪一些方法事件
    //2、mutations里的每个方法尽可能完成的事件比较单一一点
    [ADD_COUTER](state,payLoad){
      payLoad.count += 1
    },
    [ADD_TO_CART](state,payLoad){
      payLoad.checked = true
      state.cartList.push(payLoad)
    }
}