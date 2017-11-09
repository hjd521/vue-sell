<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight':totalPrice>0}" v-text="totalPrice">
        </div>
        <div class="desc" v-text="'另需配送费'+deliveryPrice+'元'"></div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!--<div class="ball-wrapper">-->
      <!--<transition name="bass-drop">-->
        <!--<div class="ball" v-for="(item,index) in balls" v-show="item.show">-->
          <!--<div class="inner"></div>-->
        <!--</div>-->
      <!--</transition>-->
    <!--</div>-->
    <div class="shop-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="emptyCar">清空</span>
      </div>
        <div class="list-content" ref="list">
          <ul>
            <li class="food" v-for="food in selFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cart-control-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
  import cartControl from 'components/carControl/carControl';
  import BScroll from 'better-scroll';
  export default {
    name: '',
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return;
        } else {
          this.fold = !this.fold;
        }
      },
      emptyCar () {
        this.selFoods.forEach((food) => {
          food.count = 0;
        })
      }
    },

    props: {
      selFoods: {
        type: Array,
        default(){
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // shop price
      totalPrice(){
        let total = 0;
        this.selFoods.forEach((item) => {
          total += item.price * item.count;
        });
        return total;

      },
      totalCount () {
        let count = 0;
        this.selFoods.forEach((item) => {
          count += item.count;
        })
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }
        else if (this.totalPrice < this.minPrice) {
          let def = this.minPrice - this.totalPrice;
          return `还差￥${def}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice){
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          if (!this.scroll){
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.list, {
                click: true
              })
            })
          }
          else {
            this.scroll.refresh();
          }
        }
        return show
      }
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-cart
    position fixed
    left 0
    bottom 0
    z-index: 50
    width: 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width: 56px
          height: 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background-color #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highLight
              background-color: rgb(0,160,200)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              text-align center
              color #80858a
              &.highLight
                color #ffffff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 400
            color #ffffff
            background-color: rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-righ 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700px
          color: #fff
          &.highLight
            color #ffffff
        .desc
          display inline-block
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
          color rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          &.not-enough
            background-color: #2b333b
          &.enough
            background-color: #00b43c
            color:#ffffff;
    .ball-wrapper
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        .inner
          width 16px
          height 16px
          border-radius 50%
          background-color: rgb(0,160,220)

    .toTop-enter-active, .toTop-leave-active
      transition all .5s
    .toTop-enter
      transform translate3D(0,-100,0)
      opacity 0
    .toTop-leave
      transform translate3D(0,0,0)
      opacity -1
    .shop-list
      position absolute
      left 0
      bottom  45px
      z-index -1
      width 100%
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background-color: #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,100,80)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background-color #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240,20,20)
          .cart-control-wrapper
            position absolute
            right 0
            font-size 16px
            bottom 6px

</style>
