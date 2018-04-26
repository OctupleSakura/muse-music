<template>
  <div class="songSearch" :style="{width:currentWidth+'px'}">
    <div class="songSearch_inputContent">
         <mu-text-field ref="songInput" 
                        name="searchSong" 
                        hintText="搜索歌曲" 
                        inputClass="inputClass" 
                        icon="search" 
                        iconClass="searchicon" 
                        underlineClass="lineClass" 
                        hintTextClass="hintTextClass" 
                        underlineFocusClass="linefocusClass"  
                        v-model="searchName" 
                        fullWidth
        />
    </div>
    <div class="songListContent" ref="songListContent">
      <ul>
        <router-link v-for="(list,index) in songList" :key="index" tag="li" :to="{name:'player',params:{songmid:list.songmid,albummid:list.albummid,songid:list.songid,init:1}}" @click.native="updateBefore(list.songname,list.singer[0].name)">
           <mu-list-item :title="list.songname" describeTextClass="describeClass" titleClass="songtitleClass" :describeText="list.singer[0].name">
             <mu-avatar icon="face" slot="leftAvatar"/>
             <span slot="describe">
               <span style="color: rgba(0, 0, 0, .87)">{{list.singer[0].name}}</span><br/>
               {{list.lyric}}
              </span>
           </mu-list-item>
           <mu-divider inset/>
        </router-link >
      </ul>
      <mu-circular-progress :size="40" v-show="selecting"/>
      <span v-show="all">已经是全部了</span>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {mapMutations} from "vuex";
  import api from '../../api/api';
  export default {
    name:'songSearch',
    data(){
      return{
        currentWidth:0,
        searchName:'',
        songLength:1,
        songList:[],
        selecting:false,
        all:false
      }
    },
    mounted(){
      var that = this;
      this.currentWidth = document.body.clientWidth;
      this.$refs.songInput.$el.children[1].children[1].onkeydown = ()=>{
        if(event.keyCode =="13"){
          this.search(0);
        }
      }
      this.$refs.songListContent.addEventListener('scroll', function lazyload(){
         let scrollTop = this.scrollTop;
         let scrollHeight = this.scrollHeight;
         let clientHeight = this.clientHeight;
         if(scrollHeight == scrollTop + clientHeight){
           if(that.songLength++)
              that.songLength++;
              that.search(1);
         }
      })
    },
    methods:{
       ...mapMutations([
         'setSongName',
         'setSongerName',
         'setSongId'
       ]),
      async search(method){
        this.selecting = true;
        const res = await api.music.search(this.searchName,this.songLength);
        let list = res.data.data.song.list;
        if(method==1){
            if(list.length==0){
              this.selecting = false
              this.all=true;
              return;
              };
            this.songList.push.apply(this.songList,list);
            return;
        }
        this.$refs.songListContent.scrollTop=0;
        this.songLength = 1;
        this.songList = [];
        this.songList = list;
        this.selecting = false
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
  ul,li{
   padding:0;
   margin:0;
   list-style: none;
 }
.searchicon{
  left:14px;
  top:15px;
}
.songSearch{
  .bodySize();
}
.songSearch_inputContent{
  width:100%;
  background:#fff;
  .mu-text-field.has-icon{
    padding-left:52px;
    margin-bottom:0px;
    .mu-text-field-content{
      padding-top:8px;
      padding-bottom:10px;
    }
  }
}
.lineClass{
  width:100%;
  left:0!important;
  bottom:0!important;
  height:1px;
}
.linefocusClass{
  width:100%;
  left:0!important;
  bottom:0!important;
  height:1px;
}
.hintTextClass{
  left:10px;
}
.inputClass{
  text-indent:5px;
}
.songListContent{
  width:100%;
  height:calc(100% - 50px);
  background:#fff;
  overflow:auto;
  .mu-divider{
    width:auto;
  }
}
.songtitleClass,.describeClass{
  text-align:left;
  text-indent:5px;
}
</style>

