<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span v-show='item.type>0' class="icon" :class="classMap[item.type]"></span><span class="text border-1px"
                                                                                            v-text="item.name">
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title" v-text="item.name"></h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name" v-text="food.name"></h2>
                <p class="desc" v-text="food.description"></p>
                <div class="extra">
                  <span class='count' v-text="'月售'+food.sellCount+'份'"></span>
                  <span v-text="'好评率'+food.rating+'%'"></span>
                </div>
                <div class="price">
                  <span class="now" v-text="food.price+'元'"></span>
                  <span class="old" v-show='food.oldPrice' v-text="food.oldPrice+'元'"></span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/fetch/api.js';
  export default {
    data(){
      return {
        goods: []
      }
    }
    ,
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll(this.$els.menuWrapper, {});
        this._foodScroll = new BScroll(this.$els.foodWrapper, {});
      }
    }
    ,
    props: {
      seller: {
        type: Object
      }
    }
    ,
    created()
    {
      api.getGoods().then((res) => {
        this.goods = res.data;
        console.log(this.goods);
        this._initScroll()
      }).catch((err) => {
        console.error(err);
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position absolute
    display flex
    width 100%
    top: 174px
    bottom: 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        padding 0 12px
        display table
        height 54px
        width 56px
        line-height 54px
        .icon
          display inline-block
            width: 16px
            height: 16px
            vertical-align top
            margin-right 5px
            background-size 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')

        .text
          font-size 12px
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(7, 17, 27, 0.1)
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rbga(7, 17, 27, 0.1))
        &:last-child
          margin-bottom 0
          border-none()
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
          .extra
            &.count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 18px
              font-size 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
</style>
