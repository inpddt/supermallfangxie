<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

//Vuex辅助函数 将getters里的计算属性映射到computed里面来
import {mapGetters} from "vuex"

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //数组语法
      ...mapGetters(['cartLength']),
      //对象语法 可以改计算属性名称
     /*  ...mapGetters({
        length:'cartLength',
        list:'cartList'
      }) */
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }
</style>
