<template>
    <div class="smallPlayer"  label="Primary" >
      <div>
         <router-link :to="{name:'player',params:{songmid:this.songmid,albummid:this.albumid,songid:this.songid,init:0}}" tag="img" :src="albumUrl"></router-link>
         <ul class="songInformation">
           <li>{{songName}}</li>
           <li>{{songerName}}</li>
         </ul>
      </div>
      <div>
        <mu-icon :value="currentPlay?'pause':'play_arrow'" :size="32" @click="play"/>
        <router-link tag="div" to="/songSheet">
            <mu-icon value="playlist_add_check" :size="32"/>
        </router-link>
      </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import {mapMutations} from "vuex";
  export default {
    name:'smallPlayer',
    data(){
      return{

      }
    },
    methods:{
      ...mapMutations([
         'playControl'
       ]),
      play(){
         if(!this.songUrl){return}
         this.currentPlay?this.playControl(false):this.playControl(true);
      }
    },
    computed:{
      ...mapState([
        'albumid',
        'albumUrl',
        'songName',
        'songerName',
        'songmid',
        'songid',
        'currentPlay',
        'songUrl'
      ])
    }
  }
</script>
<style lang="less" scoped> 
@import '../assets/public';
   .smallPlayer{
     width:100%;
     height:45px;
     box-shadow:0px 9px 36px #888888;
     background:#fff;
     display: flex;
     justify-content:space-between;
     align-items:center;
     box-sizing: border-box;
     padding-right:15px;
     padding-left:10px;
     border-top:1px solid #dedede;
     img{
       width:33px;
       height:33px;
       background:#888888;
       border:1px solid #eeeeee;
     }
     >div{
       display: flex;
       align-items: center;
       i{
         margin-left:15px;
       }
     }
   }
   .songInformation{
     margin-left:10px;
     text-align:left;
     font-size:12px;
   }
</style>

