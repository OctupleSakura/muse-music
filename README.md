

## Muse-Music
[![Build Status](https://travis-ci.org/OctupleSakura/Muse-Music.svg?branch=master)](https://travis-ci.org/OctupleSakura/Muse-Music)

### 更新  
2019.1 今年可能服务器要过期了，还不知道会不会续费，这个项目便也只能看看一些过去的实现了 :sob:

***

## 杂谈 :musical_note:
   这是一个心血来潮之作  
   也是看着网上的大佬们的作品,因此想自己琢磨一个   
   之前赶时间,所以功能方面有部分内容还没有优化好QAQ :dizzy_face:  
   部分技术实现都放到了我的**issues**里面了,包括资源获取(QQ音乐)和踩坑这些  

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

