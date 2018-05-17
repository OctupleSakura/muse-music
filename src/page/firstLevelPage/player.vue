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
       <lyric></lyric>
       <div class="bg" ref="bg"></div>
       <div class="control">
          <div class="pargressContent">
            <div class="currentTime time">{{TimeLength(0)}}</div>
            <mu-slider v-model="progress" @dragStart="changeStart" @dragStop="changeEnd"></mu-slider> 
            <div class="timeLength time">{{TimeLength(1)}}</div>
          </div>
          <div class="controlContent">
            <mu-icon :value="like" :size="28" @click="favorite()" :color="like=='favorite_border'?'#fff':'#EE4000'"></mu-icon>
            <div class="playContent">
              <mu-icon value="skip_previous" :size="30" ></mu-icon>
              <mu-icon :value="playIcon" :size="42" @click="play()" ref="playButton"></mu-icon>
              <mu-icon value="skip_next" :size="30" ></mu-icon>
            </div>
            <router-link :to="{name:'songSheet',params:{from:'palyer'}}" tag="div" class="songSheetIcon">
              <mu-icon value="playlist_add_check" :size="28"/>
            </router-link>
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
  import lyric from '../../components/lyric';
   export default {
     name:'player',
     data(){
       return{
          progress:0,
          playIcon:"play_circle_outline",
          like:"favorite_border",
          user:{}
       }
     },
     components:{
        lyric
     },
     methods:{
       ...mapMutations([
         'setSongId',
         'setAlbumUrl',
         'playControl',
         'setCurrentDuration',
         'setChangeState',
         'setSongMid'
       ]),
       async init(){//播放器初始化函数,如果route init为0的话则不进行初始化
          const guid = this.getGuid()//获取guid
          const music = await api.music.vkey(this.$route.params.songmid,guid);//通过guid获取vkey
          const sign = await api.user.sign();//验证用户是否为登录状态
          this.user = sign;
          const vkey = music.data.items[0].vkey;
          this.setSongId(this.$route.params.songid);//设置songid
          this.setSongMid({songmid:this.$route.params.songmid,guid:guid,vkey:vkey});//设置vuex中的mid
          this.setAlbumUrl(this.$route.params.albummid);//设置专辑id
          this.playControl(false);//初始化播放状态为停止
          this.selectFavorite()//验证用户是否喜欢了当前这首歌
          this.$refs.bg.style.background = 'url('+this.$store.state.albumUrl+')';//设置播放器上的专辑图片
          this.$refs.bg.style.backgroundPosition = 'center top';
          this.$refs.bg.style.backgroundSize = 'cover';
       },
       async selectFavorite(){//查找用户是否喜欢了当前的音乐
          const params = {userid:this.user.userId,songid:this.songid};
          const select = await api.songSheet.userSong(params);
          if(select>=1){
            this.like="favorite";
          }else{
            this.like="favorite_border";
          }
       },
       async favorite(){//添加或取消喜欢的音乐
         if(this.like=="favorite_border"){
            this.like="favorite";
            let params = {songid:this.songid,
                          songmid:this.$route.params.songmid,
                          songer:this.songerName,
                          userid:this.user.userId,
                          albummid:this.$route.params.albummid,
                          songname:this.songName}
            const insert = await api.songSheet.insertSong(params);
            this.message = '已添加到喜欢的音乐';
         }else{
            this.like="favorite_border";
            let params = {songid:this.songid,userid:this.user.userId}
            const insert = await api.songSheet.cancelSong(params);
            this.message = '已取消';
         }
       },
       getGuid(){//生成guid 如果cookie中有的话则直接返回cookie中的guid
          var t = (new Date).getUTCMilliseconds();
          if(document.cookie.indexOf("pgv_pvid")!=-1){
            return this.getCookie("pgv_pvid");
          }
          let  _guid = Math.round(2147483647 * Math.random()) * t % 1e10;
          document.cookie ="pgv_pvid=" + _guid + "; Expires=Sun, 18 Jan 2038 00:00:00 GMT;PATH=/;";
          return _guid
       },
       getCookie(c_name){//获取cookie的方法
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
       play(){//更改播放状态
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
          'duration',
          'songid',
          'songerName',
          'songName'
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
     async activated(){
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
        display:flex;
        justify-content:space-around;
        align-items:center;
        i{
          color:#fff;
          display: inline-block;
          transition:0.2s all;
        }
        .songSheetIcon{
           display: flex;
           align-items:center;
        }
        .playContent{
           display:flex;
           justify-content:space-around;
           align-items:center;
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
  }
</style>
