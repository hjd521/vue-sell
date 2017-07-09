<template>
  <div class="head">
    <div class="content-wrapper">
      <div class="avatar">
        <img width='64' height='64' :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text" v-text="seller.supports[0].description"></span>
        </div>
      </div>
      <div @click="showDetail" v-if="seller.supports" class="support-count">
        <span class="count" v-text="seller.supports.length+'个'"></span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text" v-text="seller.bulletin"></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="back">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show='detailShow' class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="detail-name" v-text="seller.name"></h2>
          </div>
          <div class="star-wrap">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text" v-text="seller.supports[index].description"></span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="seller-content">
            <p v-text="seller.bulletin"></p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star';
  export default {
    props: {
      seller: {
        type: Object,
      }
    },
    components: {
      star
    },
    data(){
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail(){
        this.detailShow = true;
      },
      closeDetail(){
        this.detailShow = false;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    name: ''
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color: #fff
    position relative
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        font-size: 14px
        img
          border-radius: 2px
      .content
        display: inline-block
        font-size: 14px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align top
            width: 30px
            height: 18px
            bg-image('brand')
            -webkit-background-size: 30px 18px
            background-size: 30px 18px
            background-repeat: no-repeat

          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height: 12px
            margin-right 4px
            background-size 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 12px

      .support-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        border-radius 8px
        line-height 24px
        background rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px

    .bulletin-wrapper
      height 28px
      position relative
      line-height 28px
      padding 0 22px 0 12px
      background rgba(7, 17, 27, 0)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        vertical-align top
        display inline-block
        margin-top 7px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        font-size 10px
        font-weight 200
        margin 0 4px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 8px
        font-size 10px
    .back
      position absolute
      top 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      fliter: blur(10px)
    .detail
      /*css sticky footer实现*/
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .detail-name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrap
            margin-top: 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width: 16px
                height: 16px
                vertical-align top
                margin-right 5px
                background-size 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
                &.special
                  bg-image('special_1')

              .text
                font-size 12px
                line-height 12px

          .seller-content
            width 80%
            margin 15px auto
            text-align center
            p
              padding 0 12px
              line-height 24px
              font-size 12px

  .detail-close
    position relative
    height: 32px
    width: 32px
    margin -64px auto 0 auto
    clear both
    font-size 32px
</style>
