<template>
  <div class="songSheet">
    <mu-appbar title="我的歌单" titleClass="titleClass">
       <mu-icon value="arrow_back" slot="left" @click="goback()"></mu-icon>
    </mu-appbar>
    <div class="songSheetList">
        <router-link v-for="(list,index) in songList" :key="index" tag="li" :to="{name:'player',params:{songmid:list.song_mid,albummid:list.albummid,songid:list.song_id,init:1}}"  @click.native="updateBefore(list.song_name,list.songer)">
           <mu-list-item :title="list.song_name" describeTextClass="describeClass" titleClass="songtitleClass" :describeText="list.singer">
             <mu-avatar icon="face" slot="leftAvatar"/>
             <span slot="describe">
               <span style="color: rgba(0, 0, 0, .87)">{{list.songer}}</span><br/>
               {{list.lyric}}
              </span>
           </mu-list-item>
           <mu-divider inset/>
        </router-link >
    </div>
    <mu-snackbar v-if="snackbar" :message="message"  @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex';
  import api from '../../api/api'
   export default {
     name:'songSheet',
     data(){
       return {
          songList:[],
          snackbar:false,
          message:"请先登录"
       }
     },
     async mounted(){
       if(this.userid){
          const res = await api.songSheet.userSongSheet({userid:this.userid,operation:0});
          this.songList = res;
       }
       else{
         this.showSnackbar()
       }
     },
     computed:{
      ...mapState([
        'albumid',
        'songmid',
        'songid',
        'userid'
      ])
     },
     methods:{
      ...mapMutations([
        'setSongName',
        'setSongerName'
      ]),
       goback(){
          this.$router.push({name:'player',params:{songmid:this.songmid,albummid:this.albumid,songid:this.songid,init:0}});
       },
       showSnackbar () {//显示提示
         this.snackbar = true;
         if (this.snackTimer) clearTimeout(this.snackTimer);
         this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000);
       },
       hideSnackbar () {//隐藏提示
         this.snackbar = false;
         if (this.snackTimer) clearTimeout(this.snackTimer);
       },
      updateBefore(songname,songername){
        this.setSongName(songname);
        this.setSongerName(songername);
      }
     }
   }
</script>
<style lang="less">
   @import '../../assets/public';
   .songSheet{
     .bodySize();
     background:#fff;
     .songSheetList{
       width:100%;
       height:calc(100% - 3rem);
     }
   }
   .mu-appbar{
     height:3rem;  
     width:100%;
   }
   .titleClass{
     font-size:16px!important;
   }
</style>

