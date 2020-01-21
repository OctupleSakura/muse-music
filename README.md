

## Muse-Music
[![Build Status](https://travis-ci.org/OctupleSakura/Muse-Music.svg?branch=master)](https://travis-ci.org/OctupleSakura/Muse-Music)

### 更新  
2019.1 今年可能服务器要过期了，还不知道会不会续费，这个项目便也只能看看一些过去的实现了 :sob:

***

## 杂谈 :musical_note:
   这是一个心血来潮之作  
   也是看着网上的大佬们的作品,因此自己也想做一个  
   其实慕课网上也有播放器的一个课程(但是我穷**买不起**！Σ( ° △ °|||)︴  
   至于好不好看的话,就另说了hhh,嘛因为赶时间,所以功能方面有部分内容还没有优化好QAQ :dizzy_face:  
   基本的功能都已经制作完成,可能还有bug但是有兴趣的旁友可以试试啦  
   部分技术实现的话都放到了我的**issues**里面了,包括资源获取(QQ音乐)和踩坑这些  

### 项目结构 :open_file_folder:
   ```
   src
   |---api//需要调用的接口,包括音乐接口和后台接口
   |    |---api.js//接口放置文件
   |
   |----assets//一些静态资源,包括一些图片和样式文件
   |
   |----components//一些小的功能组件,歌词,滚动组件等等
   |
   |----page//各级页面
   |     |---firstLevelPage//一级页面,需要用到router来跳转的页面
   |     |
   |     |---twoLevelPage//二级页面,一般是一个一级页面的某个版块
   |
   |----router//路由
   |     |---index.js//具体路由配置文件
   |
   |----store//vuex状态管理
   |     |---store.js//状态管理配置文件
   |
   |----APP.vue//主组件
   |
   |----main.js//主文件,用来挂载主组件,以及加载一些全局插件
   
   static----一些外部资源,包括字体和图标等
   ```
### 模块介绍(已完成) :boom:
   1. 歌单模块(用户喜欢的歌曲)  
   2. 用户--登录模块(基于**session**)  
   3. 播放器(项目主要部分,大部分数据都由vuex来管理)  
   4. 搜索模块(搜索歌曲)  
   （还有node部分接口编写

### 项目展示图
![1](https://github.com/OctupleSakura/showImg/blob/master/music/1.png?raw=true)
![2](https://github.com/OctupleSakura/showImg/blob/master/music/2.png?raw=true)
![3](https://github.com/OctupleSakura/showImg/blob/master/music/3.png?raw=true)
![4](https://github.com/OctupleSakura/showImg/blob/master/music/4.png?raw=true)
![5](https://github.com/OctupleSakura/showImg/blob/master/music/5.png?raw=true)
![6](https://github.com/OctupleSakura/showImg/blob/master/music/6.png?raw=true)

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
