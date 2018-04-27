<template>
  <div id="lyric" class="lyric">
    <transition-group name="fade" mode="out-in">
       <div class="albumImg" key="albumImg" ref="albumImg" v-show="nowpage" @click="nowpage=!nowpage" :style="{background:'url('+this.albumUrl+')'}"></div>
       <div class="lyric_content" key="lyric" v-show="!nowpage" @click="nowpage=!nowpage">
          <swiper :options="swiperOption" ref="lyricSwiper">
            <swiper-slide>
              <ul>
                <li v-for="(item,index) in lyrics" :key="index">{{item.lyric}}</li>
              </ul>
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
             let obj = {time:separate[0],lyric:separate[1]};
             handleData.push(obj);
          }
          return handleData;
       },
       async init(){
         this.$refs.albumImg.style.background = 'url('+this.$store.state.albumUrl+')';
         const res = await api.music.lyric(this,this.$route.params.songid);
         const newres = this.lyricHandle(res);
         this.$refs.lyricSwiper.$el.children[0].children[0].addEventListener('scroll',()=>{
           console.log(1)
           debugger
         })
         this.lyrics = newres;
         console.log(newres);
       }
     },
     computed:{
        ...mapState([
          'albumUrl',
       ])
     },
     async activated(){
        if(this.$route.params.init==1){
           this.init()
        }
     }    
   }
</script>
<style lang="less">
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
    ul{
      color:#fff;
      padding:0;
      padding:0 15px;
      li{
        width:100%;
        margin-top:1rem;
        list-style:none;
        text-align:center;
      }
    }
  }
  .fade-enter-active, .component-fade-leave-active {
     transition: opacity .3s ease;
  }
  .fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>


