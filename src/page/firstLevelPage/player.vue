<template>
   <transition name="up">
     <div class="player" >
       <div class="titleHeader">
         <p>{{this.$store.state.songName}}</p>
         <p>{{this.$store.state.songerName}}</p>
       </div>
       <div class="albumImg" ref="albumImg"></div>
       <div class="bg" ref="bg"></div>
       <div class="control">
          <div class="pargressContent">
            <div class="currentTime time">{{TimeLength(0)}}</div>
            <mu-slider v-model="progress"></mu-slider> 
            <div class="timeLength time">{{TimeLength(1)}}</div>
          </div>
          <div class="controlContent">
            <mu-icon value="skip_previous" :size="30" ></mu-icon>
            <mu-icon :value="playIcon" :size="42" @click="play()" ref="playButton"></mu-icon>
            <mu-icon value="skip_next" :size="30" ></mu-icon>
          </div>
       </div>
     </div>
   </transition>
</template>
<script>
  import axios from "axios";
  import {mapMutations} from "vuex";
   export default {
     name:'player',
     data(){
       return{
          progress:0,
          playIcon:"play_circle_outline"
       }
     },
     methods:{
       ...mapMutations([
         'setSongId',
         'setAlbumUrl',
         'playControl',
         'setCurrentDuration'
       ]),
       play(){
          if(this.$store.state.currentPlay){
            this.playControl(false);
          }else{
            this.playControl(true);
          }
       },
       TimeLength(Time){
         if(Time==1){
           Time = this.$store.state.duration;
         }else{
           Time = this.$store.state.currentDuration;
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
        }
     },
     computed:{
        playState(){
          return this.$store.state.currentPlay;
        },
        cuurentTime(){
          return this.$store.state.currentDuration;
        }
     },
     watch:{
       playState(val,newval){
           if(newval){
              this.playIcon = 'play_circle_outline'
           }
           else{
             this.playIcon = 'pause_circle_outline'
           }
       },
       cuurentTime(){
          this.progress = (this.$store.state.currentDuration / this.$store.state.duration)*100;
       }
     },
     mounted(){
        this.setSongId(this.$route.params.songmid);
        this.setAlbumUrl(this.$route.params.albummid);
        this.playControl(false);
        this.$refs.bg.style.background = 'url('+this.$store.state.albumUrl+')';
        this.$refs.albumImg.style.background = 'url('+this.$store.state.albumUrl+')';
        this.$refs.bg.style.backgroundPosition = 'center top';
        this.$refs.bg.style.backgroundSize = 'cover';
     }
   }
</script>
<style lang="less" scoped>
@import '../../assets/public';
  @bodyWidth:100%;
  @bodyHeight:100%;
  .player{
    width:@bodyWidth;
    height:@bodyHeight;
    overflow:hidden;
    .bg{
      width:@bodyWidth;
      height:@bodyHeight;
      filter: blur(15px);
      transform:scale(1.15);
      overflow: hidden;
      z-index:1;
    }
    .titleHeader{
      width:100%;
      height:70px;
      z-index: 3;
      position: absolute;
      padding-top:20px;
      p{
        color:#fff;
        text-align:left;
        width:70%;
        margin:0 auto;
      }
      p:nth-child(2){
        font-size:12px;
        color:#dbdbdb;
      }
    }
    .albumImg{
      width:200px;
      height:200px;
      position: absolute;
      background:#fff;
      left:0;
      right:0;
      top:180px;
      margin:0 auto;
      z-index:2;
      border-radius:50%;
    }
    &:after{
      background-color: rgba(0,0,0,0.6);
      content:' ';
      position: absolute;
      width:@bodyWidth;
      height:@bodyHeight;
      z-index:1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .control{
      position: absolute;
      width:90%;
      height:110px;
      bottom:0;
      margin:0 auto;
      left:0;
      right:0;
      z-index:3;
      @space:20px;
      .pargressContent{
        .mu-slider{
          width:calc(100% - 95px);
          margin:0 5px;
        }
        div{
          display:inline-block;
          vertical-align: top;
        }
        .time{
          width:37px;
          margin-top:3px;
          color:#fff;
          font-size:12px;
        }
      }
      .controlContent{
        text-align:center;
        width:100%;
        height:calc(100% - 40px);  
        padding-top:20px;   
        i{
          color:#fff;
          display: inline-block;
          vertical-align: top;
        }
        i:nth-child(odd){
          margin-top:6px;
        }
        i:nth-child(1){
          margin-right:@space;
        }
        i:nth-child(3){
          margin-left:@space;
        }
      }
    }
  }
</style>
