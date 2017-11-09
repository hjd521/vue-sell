<template>
  <div class="shop-cart">
    <div class="content">
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
  </div>
</template>

<script>
  export default {
    name: '',
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
          count += item.item.count;
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
