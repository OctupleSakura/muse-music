<template>
  <div class="songSearch" :style="{width:currentWidth+'px'}">
    <div class="songSearch_inputContent">
         <mu-text-field ref="songInput" name="searchSong" hintText="搜索歌曲" inputClass="inputClass" icon="search" iconClass="searchicon" underlineClass="lineClass" hintTextClass="hintTextClass" underlineFocusClass="linefocusClass"  @keyup.enter="search" v-model="searchName" fullWidth/>
    </div>
    <div class="songListContent" ref="songListContent">
      <ul>
        <router-link v-for="(list,index) in songList" :key="index" tag="li" :to="{name:'player',params:{songmid:list.songmid,albummid:list.albummid}}" @click.native="updateBefore(list.songname,list.singer[0].name)">
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
      this.$refs.songInput.$el.children[1].children[1].onkeydown = function(){
        if(event.keyCode =="13"){
          that.selecting = true;
          that.search(0);
        }
      }
      this.$refs.songListContent.addEventListener('scroll', function(){
         let scrollTop = this.scrollTop;
         let scrollHeight = this.scrollHeight;
         let clientHeight = this.clientHeight;
         if(scrollHeight == scrollTop + clientHeight){
           if(that.songLength++)
              that.songLength++;
              that.selecting = true;
              that.search(1);
         }
      })
    },
    methods:{
       ...mapMutations([
         'setSongName',
         'setSongerName'
       ]),
      search(method){
        axios.get(`/search?g_tk=289671492&uin=2211503711&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=`+this.searchName+`&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=`+30+`&p=`+this.songLength+`&remoteplace=txt.mqq.all&_=1521699185623`).then(
          function(res){
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
        }.bind(this))
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

