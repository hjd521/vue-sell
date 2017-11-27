<template>
    <div class="food-detail-wrapper" v-show="showWrapper" ref="detail">
      <div class="image-header">
        <img :src="food.image" alt="">
        <div class="back" @click="hidden">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
      </div>
      <div class="cart-control-wrapper">
        <cart-control :food="food"></cart-control>
      </div>
      <div class="buy" v-show="!food.count" @click.stop="addFirst(food)">加入购物车</div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartControl from 'components/carControl/carControl'
  export default {
    name: '',
    data () {
      return {
        showWrapper: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showWrapper = true;
        this.$nextTick(() => {
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.detail, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hidden () {
        this.showWrapper = false
      },
      addFirst () {
        if (!event._constructed) {
          return
        }
        this.$emit('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      cartControl
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food-detail-wrapper
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color: #fff
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back {
        position absolute
        top 10px
        left 0
        .icon-arrow_lift {
          display block
          padding: 18px
          color: #fff
        }
      }
    .content {
      padding 18px
      .title {
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
      }
      .detail {
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count,.sell-rating {
          font-size 10px
          color rgb(147,153,159)
        }
        .sell-count {
          margin-right 12px
        }
      }
      .price {
        font-weight 700
        line-height 24px
        .now {
          margin-right 18px
          font-size 14px
          color: rgb(240, 20, 20)
        }
        .old {
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
        }
      }
    }
    .cart-control-wrapper {
      position:absolute;
      right 12px
      bottom 152px
    }
    .buy {
      position absolute
      border-radius 5px
      right 18px
      z-index 10
      height 24px
      bottom 158px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      color #ffffff
      background-color: rgb(0,160,220)
    }
</style>
