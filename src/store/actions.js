import { ADD_COUTER, ADD_TO_CART } from "./mutation-types";

export default {
    addCart(context, payLoad) {
        //actions用来做一些异步操作 或者 写一些逻辑判断
        return new Promise((resolve, rejects) => {
            //查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
            if (oldProduct) {
                context.commit(ADD_COUTER, oldProduct)
                resolve("当前商品数量+1")
            }
            else {
                payLoad.count = 1
                context.commit(ADD_TO_CART, payLoad)
                resolve("添加了一个新的商品")
            }
        })
    }
}