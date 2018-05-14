<template>
  <div id="lyric" class="lyric">
    <transition-group name="fade" mode="out-in">
       <div class="albumImg" key="albumImg" ref="albumImg" v-show="nowpage" @click="nowpage=!nowpage" :style="{background:'url('+this.albumUrl+')'}"></div>
       <div class="lyric_content" key="lyric" v-show="!nowpage" @click="nowpage=!nowpage">
          <swiper :options="swiperOption" ref="lyricSwiper">
            <swiper-slide>
              <div class="fill"></div>
              <ul>
                <li v-for="(item,index) in lyrics" :key="index" :class="{active:ifNowLyric(index)}">{{item.lyric}}</li>
              </ul>
              <div class="fill"></div>
            </swiper-slide>
          </swiper>
       </div>    
    </transition-group>
  </div>
</template>
<script>
   import { mapState } from 'vuex';
   import api from '../api/api';
   import { swiper, swiperSlide } from 'vue-awesome-swiper'
   import 'swiper/dist/css/swiper.css'
   export default {
     name:'lyric',
     data(){
       return{
          nowpage:true,
          lyrics:[],
          nowLyrics:0,
          top:0,
          swiperOption:{
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            mousewheel: true,
            freeModeMomentumRatio:1,
            freeModeMinimumVelocity : 0.5,
          },
       }
     },
     components:{
        swiper,
        swiperSlide
     },
     methods:{
      lyricHandle(str){
          str = str.split("[offset:0]")[1].split("[");
          let handleData = [];
          for(let i=1;i<str.length;i++){
             let separate = str[i].split("]");
             separate[1] = separate[1].replace(/[\r\n]/g, "");
             if(separate[1]==""){
               continue;
             }
             let obj = {time:separate[0],lyric:separate[1]};
             handleData.push(obj);
          }
          return handleData;
       },
       async init(){
         this.$refs.albumImg.style.background = 'url('+this.$store.state.albumUrl+')';
         const res = await api.music.lyric(this,this.$route.params.songid);
         const newres = this.lyricHandle(res);
         this.swiper.$el[0].children[0].style.cssText = "transition-duration: 200ms;";
         this.lyrics = newres;
         this.nowLyrics=0;
       },
       TimeLength(Time){//时间计算函数
         if(Time==1){
           Time = this.duration;
         }else{
           Time = this.currentDuration;
         }
          let min = parseInt(Time/60)+"";
          let sec = parseInt(Time%60)+"";
          if(min == 0){
            min = "00";
          }else if(min < 10){
             min = "0" + min;
          }
          if(sec.length==1){
             sec = "0" + sec;
          }
          return min + ":" + sec;
        },
       ifNowLyric(num){
          return num == this.nowLyrics;
       }
     },
     computed:{
        ...mapState([
          'albumUrl',
          'currentDuration'
       ]),
      swiper() {
        return this.$refs.lyricSwiper.swiper
      }
     },
     async activated(){
        if(this.$route.params.init==1){
           this.init()
        }
     },
     watch:{
       currentDuration(val,newval){
          if(this.changeState!=1){
            const length = this.lyrics.length;
            for(let i=1;i<length;i++){
               if(this.lyrics[i].time.split('.')[0]==this.TimeLength(this.currentDuration)){
                  this.nowLyrics = i;
                  this.swiper.setTranslate(i*-35);
               }
            }
          }
       }
     }   
   }
</script>
<style lang="less">
@import '../assets/public';
  .lyric{
    width:100%;
    height:22rem;
    position: absolute;
    top:70px;
    z-index:3;
  }
  .albumImg{
    width:200px;
    height:200px;
    position: absolute;
    background:#fff;
    left:0;
    right:0;
    top:80px;
    margin:0 auto;
    z-index:2;
    border-radius:50%;
  }
  .swiper-container{
    height:100%;
  }
  .swiper-slide{
    height:auto;
  }
  .lyric_content{
    width:100%;
    height:100%;
    overflow: hidden;
    .fill{
      width:100%;
      height:10rem;
    }
    ul{
      color:#ffffff;
      padding:0;
      padding:0 15px;
      .active{
        color:@theme-color;
      }
      li{
        width:100%;
        margin-top:1rem;
        list-style:none;
        text-align:center;
      }
    }
  }
  .swiper-wrapper{
    transition-duration:200ms;
  }
  .fade-enter-active, .component-fade-leave-active {
     transition: opacity .3s ease;
  }
  .fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>


