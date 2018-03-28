<template>
    <div class="recommend" :style="{width:bannerWidth+'px'}">
        <div class="bannerWindow" ref="banner">
           <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in slider" :key="index" >
                <img :src="item.picUrl" >  
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
           </swiper>
        </div>
        <div class="songSheet">
           <h3>热门歌单</h3>
           <ul>
              <li v-for="(list , index) in songList" :key="index">
                <img :src="list.picUrl">
                <div>
                  <p v-text="list.songListDesc"></p>
                  <p v-text="list.songListAuthor"></p>
                </div>
              </li>
           </ul>  
        </div>
    </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "recommend",
  props: {},
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      slider: [],
      songList: [],
      bannerWidth: 0,
      bannerLength: 0,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        continuous: true,
        loop:true
      }
    };
  },
  computed:{
     swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  methods: {},
  mounted() {
    this.bannerWidth = document.body.clientWidth;
    axios.get("/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1521092161716").then(
        function(res) {
          let data = res.data.data;
          this.slider = data.slider;
          this.songList = data.songList;
          this.bannerLength = data.slider.length;
          console.log(data);
        }.bind(this)
      ).catch(function(error) {
        console.log(error);
      }).then(function(res) {
          this.$nextTick(function() {

            }.bind(this)
          );
        }.bind(this)
      );
  }
};
</script>
<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
}
.recommend {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.swiper-container {
  width: 100%;
  height: 100%;
  .swiper-wrapper{
    .swiper-slide{
      height:auto;
      overflow: auto; 
    }
  }
}
.bannerWindow {
  width: 100%;
  overflow: hidden;
  position: relative;
  div {
    display: inline-block;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.songSheet {
  width: 100%;
  padding: 0 5px;
  padding-top: 10px;
  box-sizing: border-box;
  ul {
    width: 100%;
    li {
      display: inline-block;
      width: 48%;
      margin-bottom: 7px;
      @Listwidth: 100%;
      font-size: 0;
      img {
        width: @Listwidth;
      }
      div {
        display: inline-block;
        padding: 4px;
        width: @Listwidth;
        background: #fff;
        p {
          width: @Listwidth;
          font-size: 13px;
          //单行省略号
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
      }
    }
    li:nth-child(odd) {
      margin-right: 5px;
    }
  }
}
.swiper-pagination-bullet{
   background:#fff;
}
</style>

