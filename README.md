## 杂谈 :musical_note:
   这是一个心血来潮之作  
   也是看着网上的大佬们的作品,因此自己也想做一个,嘛其实慕课网上也有播放器的一个课程(但是我穷**买不起**！Σ( ° △ °|||)︴  
   所以...只好自己琢磨了  
   至于好不好看的话,就另说了hhh,嘛因为赶时间,所以功能方面有部分内容还没有优化好QAQ :dizzy_face:  
   基本的功能都已经制作完成,可能还有bug但是有兴趣的旁友可以试试啦  
   部分技术实现的话都放到了我的**issues**里面了,包括资源获取和踩坑这些(嘛说不定QQ音乐的接口什么时候又改了2333)  
   名字的话,没有名字QAQ(因为没有想好 :flushed:  
   另外,API来自QQ音乐,纯粹本人学习用,**请勿用于商业用途**谢谢！  
## 项目结构 :open_file_folder:
   这里贴一下我大概的项目结构,目前主要是两块
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
## 模块介绍(已完成) :boom:
   1. 歌单模块(用户喜欢的歌曲)  
   2. 用户--登录模块(这个项目登录是基于**session**来做)  
   3. 播放器(项目主要部分,大部分数据都由vuex来管理)  
   4. 搜索模块(搜索歌曲)  
   （还有node部分接口编写
## 技术栈 :star:
   &#160;**前端**    
   &#160;&#160;:muse-ui(material风格的vue-ui库)  
   &#160;&#160;框架:vue  
   &#160;&#160;插件:vue-router,vuex,axios,swiper(滑动插件),vue-jsonp....  
   &#160;&#160;预处理器:less  
   &#160;**后端**   
   &#160;&#160;框架:koa  
   &#160;&#160;插件:koa-route,koa-session,koa-cors,koa-body,mysql  
## Build Setup

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
