<template>
   <div class="layout">
      <div class="header">
          <div class="nav">
            <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
              <mu-tab value="0" title="搜索"/>
              <mu-tab value="1" title="推荐"/>
              <mu-tab value="2" title="我的"/>
            </mu-tabs>
          </div>
      </div>
      <div class="content" ref="content">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <song-search></song-search> 
            </swiper-slide>  
            <swiper-slide>
              <recommend>
                <swiper :options="swiperOptionVertical" ref="mySwiperVer">
                  <swiper-slide>      
                  </swiper-slide>
                  <div class="swiper-scrollbar"></div>
                </swiper>   
              </recommend> 
            </swiper-slide> 
            <swiper-slide>      
              <my-message :isLogin="isLogin" @changeState="changeLoginState"></my-message>
            </swiper-slide>     
         </swiper>
      </div>
      <small-player></small-player>
   </div>
</template>

<script>
import smallPlayer from '../../components/smallPlayer';
import recommend from '../twoLevelPage/recommend';
import myMessage from '../twoLevelPage/myMessage';
import songSearch from '../twoLevelPage/songSearch';
import axios from 'axios';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import {mapMutations} from 'vuex';
import api from '../../api/api';

export default {
  name: 'Index',
  components:{
    smallPlayer,
    recommend,
    myMessage,
    songSearch,
    swiper,
    swiperSlide
  },
  data () {
    return {
      activeTab:"1",
      currentScreenWidth:document.body.clientWidth,
      isLogin:false,
      swiperOption:{
         initialSlide:1,
         spaceBetween: 50,
      },
      swiperOptionVertical: {
        observer:true,
        observeParents:true,
        direction: "vertical",
        freeMode: true,
        slidesPerView: "auto",
        scrollbar:{
          el:".swiper-scrollbar",
        },
        mousewheel: true,
        mousewheelControl: true,
        resistanceRatio:0,
        freeModeMomentumBounce:false,
      }
    }
  },
  methods:{
      ...mapMutations([
        'setUserId',
        'setUserName'
      ]),
      handleTabChange (val) {
        this.activeTab = val
        this.$refs.mySwiper.swiper.slideTo(val)
      },
      changeLoginState (state){
        this.isLogin = state;
      }
  },
  async activated(){
    const res = await api.user.sign();
    this.isLogin = res != 'no login' ? true : false;
    console.log(res);
    this.setUserId(res.userId);
    this.setUserName(res.userName);
  },
  mounted(){
     let that = this;
     this.$refs.mySwiper.swiper.on("slideChange",function(){
       if(!that.$refs.mySwiper){return}
        that.handleTabChange(this.activeIndex.toString())
     })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .content{
      width:100%;
      height:calc(100% - 93px);
      overflow:hidden;
      position: relative;
      div{
        height:100%;
      }
    }
    .layout{
      width:100%;
      height:100%;
      /*background-color: rgb(236, 236, 236);*/
    }
    .swiper-slide{
      height:100%;
    }
</style>
