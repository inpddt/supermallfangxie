<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debouce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import {mapActions} from "vuex"
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      /* getThemeTopy: null //防抖方式 */
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    //请求详情数据
    getDetail(this.iid).then(res => {
      //1、获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4、保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5、获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6、取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    /* this.getThemeTopy = debounce(()=>{
      this.$nextTick(() => {
        //获取不同组件的offsetTop
        this.titleTopY = [];
        this.titleTopY.push(0);
        this.titleTopY.push(this.$refs.params.$el.offsetTop );
        this.titleTopY.push(this.$refs.comment.$el.offsetTop );
        this.titleTopY.push(this.$refs.recommends.$el.offsetTop );
        this.titleTopY.push(Number.MAX_VALUE);
        console.log(this.titleTopY);
      });
    },100) //防抖方式 */
  },
  mounted() {},
  destroyed() {
    /* this.$bus.off("imageLoad") */
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();

      /* this.getThemeTopy()//防抖方式 */
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      const positionY = -position.y;

      /* for(let i = 0;i < this.themeTopYs.length;i++) {
        if(this.currentIndex !== i && ((i < this.themeTopYs.length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
        || (i === this.themeTopYs.length-1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }  */

      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //1、判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;

      //2、tabControl是否吸顶
      /* this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop; */
    },
    //将商品添加至购物车
    addToCart() {
      //1、获取购物车要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

     /*  //2、将商品添加到购物车
      this.$store.dispatch("addCart", product).then(res=>{
        console.log(res);
      }); */

       //2、将商品添加到购物车
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000)
      });
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop,
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
}

.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>

