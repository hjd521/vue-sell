<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click.stop="selMenu(index,$event)" class="menu-item"
            :class="{current:currentIndex===index}">
          <span class="text border-1px">
             <span v-show='item.type>0' class="icon" :class="classMap[item.type]"></span>
          {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title" v-text="item.name"></h1>
          <ul>
            <li v-for="food in item.foods" @click="foodDetail(food)" class="food-item border-1px">
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
                <div class="cart-control-wrapper">
                  <cart-control :food="food">
                  </cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="shop-wrapper">
      <shop :selFoods="selFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop>
    </div>
    <food-detail v-show="showDetail" ref="fooddetail" :food="selected"></food-detail>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shop from 'components/shop/shop'
  import api from '@/fetch/api.js';
  import cartControl from 'components/carControl/carControl'
  import foodDetail from 'components/foodDetail/foodDetail'
  export default {
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        foodScroll: null,
        selected: {},
        showDetail: false,
        ddToken: null,
        jsTicket: null
      }
    },
    components: {
      shop,
      cartControl,
      foodDetail
    },
    methods: {
      _initScroll(){
        let _this = this;
        _this.menuScroll = new BScroll(_this.$refs.menuWrapper, {
          click: true
        });
        _this.foodScroll = new BScroll(_this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        _this.foodScroll.on('scroll', (pos) => {
          _this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      getHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selMenu(index, event){
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 500);
      },
      foodDetail(food) {
        if (!event._constructed) {
          return;
        }
        this.selected = food;
        this.showDetail = true;
        this.$refs.fooddetail.show();

      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightNow = this.listHeight[i];
          let heightNext = this.listHeight[i + 1];
          if (!heightNext || (this.scrollY >= heightNow && this.scrollY < heightNext)) {
            return i
          }
        }
        return 0;
      },
      selFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count){
              foods.push(food);
            }
          })
        })
        return foods
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      api.getGoods().then((res) => {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this.getHeight()
        });
      }).catch((err) => {
        console.error(err);
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
//    api.getToken().then((res) => {
//      this.ddToken = JSON.parse(res.msg);
//      console.log('token：' + this.ddToken)
//    })
//      api.getJsTicket().then((res) => {
//        this.jsTicket = JSON.parse(res.msg)
//        console.log('jsTicket:' + this.jsTicket)
//      })
//      setTimeout(function(){
//        window.dd.config({
//          agentId: '151137888', // 必填，微应用ID
//          corpId: 'ding917d92bf629e32ef35c2f4657eb6378f', // 必填，企业ID
//          timeStamp: new Date().getTime(), // 必填，生成签名的时间戳
//          nonceStr: this.ddToken, // 必填，生成签名的随机串
//          signature: this.jsTicket, // 必填，签名
//          type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
//          jsApiList: [ 'runtime.info', 'biz.contact.choose',
//            'device.notification.confirm', 'device.notification.alert',
//            'device.notification.prompt', 'biz.ding.post',
//            'biz.util.openLink' ] // 必填，需要使用的jsapi列表，注意：不要带dd。
//        });
//      }, 2000)
//
//      window.dd.ready(function() {
//      alert('dd调用成功')
//    })
//      window.dd.error(function(err){
//        alert('dd error: ' + JSON.stringify(err));
//      });
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
        padding 5px 12px
        display table
        height 54px
        width 56px
        font-size
        line-height 14px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background-color: #fff
          font-weight 700
        .icon
          display inline-block
          width: 12px
          height: 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
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
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle
          font-size 12px
          text-align center
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
          .cart-control-wrapper {
            position absolute
            right 0
            bottom 12px
          }
</style>
