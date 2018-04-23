<template>
   <transition name="up">
     <div class="player" >
       <div class="titleHeader">
         <div>
           <router-link to="/" tag="div" class="back">
              <i class="mdui-icon material-icons">&#xe5c4;</i>
           </router-link>
           <div>
             <p>{{this.$store.state.songName}}</p>
             <p>{{this.$store.state.songerName}}</p>
           </div>
           </div>
       </div>
       <div class="albumImg" ref="albumImg"></div>
       <div class="bg" ref="bg"></div>
       <div class="control">
          <div class="pargressContent">
            <div class="currentTime time">{{TimeLength(0)}}</div>
            <mu-slider v-model="progress" @dragStart="changeStart" @dragStop="changeEnd"></mu-slider> 
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
  import { mapState } from 'vuex';
  import api from '../../api/api';
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
         'setCurrentDuration',
         'setChangeState'
       ]),
       async init(){
          const guid = this.getGuid()
          const vkey = await api.vkey(this.$route.params.songmid,guid);
          this.setSongId({songmid:this.$route.params.songmid,guid:guid,vkey:vkey});
          this.setAlbumUrl(this.$route.params.albummid);
          this.playControl(false);
          this.$refs.bg.style.background = 'url('+this.$store.state.albumUrl+')';
          this.$refs.albumImg.style.background = 'url('+this.$store.state.albumUrl+')';
          this.$refs.bg.style.backgroundPosition = 'center top';
          this.$refs.bg.style.backgroundSize = 'cover';
       },
       getGuid(){
          var t = (new Date).getUTCMilliseconds();
          if(document.cookie.indexOf("pgv_pvid")!=-1){
            return this.getCookie("pgv_pvid");
          }
          document.cookie ="pgv_pvid=" + guid + "; Expires=Sun, 18 Jan 2038 00:00:00 GMT;PATH=/;";
          return _guid = Math.round(2147483647 * Math.random()) * t % 1e10;
       },
       getCookie(c_name){
           if (document.cookie.length>0)
             {
             let c_start=document.cookie.indexOf(c_name + "=")
             if (c_start!=-1)
               { 
               c_start=c_start + c_name.length+1 
               let c_end=document.cookie.indexOf(";",c_start)
               if (c_end==-1) c_end=document.cookie.length
               return unescape(document.cookie.substring(c_start,c_end))
               } 
             }
           return ""
       },
       play(){
          if(this.currentPlay){
            this.playControl(false);
          }else{
            this.playControl(true);
          }
       },
       changeStart(){//拖拽开始函数
          this.setChangeState(1)
       },
       changeEnd(){//拖拽结束函数
          this.setCurrentDuration(this.duration*this.progress/100);
          this.setChangeState(0);
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
        }
     },
     computed:{
       ...mapState([
          'currentPlay',
          'currentDuration',
          'changeState',
          'duration'
       ])
     },
     watch:{
       currentPlay(val,newval){
           if(newval){
              this.playIcon = 'play_circle_outline'
           }
           else{
             this.playIcon = 'pause_circle_outline'
           }
       },
       currentDuration(){
         if(this.changeState!=1){
              this.progress = (this.currentDuration / this.duration)*100;
         }
       },

     },
     activated(){
        if(this.$route.params.init==1){
           this.init()
        }
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
      >div{
        width:100%;
        padding:0 50px;
        position:relative;
        .back{
          position:absolute;
          left:1rem;
          top:0.5rem;
          i{
            color:#fff;
          }
        }
         p{
           color:#fff;
           text-align:left;
         }
         p:nth-child(2){
           font-size:12px;
           color:#dbdbdb;
         }
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
