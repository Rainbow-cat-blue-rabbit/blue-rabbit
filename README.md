# 欢迎来到我的蓝兔音乐
 基于 Vue(2.5) + vuex + vue-router + vue-axios +better-scroll + Scss + ES6 等开发一款移动端音乐App，UI 界面参考了安卓版的QQ音乐、flex 布局适配常见移动端。
## 部分图片预览
<img src="https://github.com/Rainbow-cat-blue-rabbit/blue-rabbit/blob/master/doc/1.png" width = "300" height = "100%"/>
<img src="https://github.com/Rainbow-cat-blue-rabbit/blue-rabbit/blob/master/doc/2.png" width = "300" height = "100%"/>
<img src="https://github.com/Rainbow-cat-blue-rabbit/blue-rabbit/blob/master/doc/3.png" width = "300" height = "100%"/>
<img src="https://github.com/Rainbow-cat-blue-rabbit/blue-rabbit/blob/master/doc/4.png" width = "300" height = "100%"/>

## 开发目的
通过学习开发一个 Vue 项目，让自己更熟练的使用 Vue、熟悉模块化开发的思想、更好的运用 ES6 等知识，提高自己的技术能力
## 实现的功能:
1. 音乐播放、暂停、上一曲、下一曲
2. 播放列表、添加到播放列表、做为下一首播放
3. 搜索单曲、歌手
4. 查看歌手详情页面
5. 排行榜
6. 切换播放模式
## TODO
1. 歌词不能左右滑动展示出来,只能播放唱片
2. 搜索:点击歌手不能跳转到歌手详情页,点击歌名不能展示出来唱片内容
4. 我的部分待开发
## 技术栈
### 前端
1. Vue：用于构建用户界面的 MVVM 框架
2. vue-router：为单页面应用提供的路由系统
3. vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
4. vue-lazyload：实现图片懒加载，节省用户流量，优化页面加载速度
5. better-scroll：解决移动端各种滚动场景需求的插件，使移动端滑动体验更加流畅
6. SCSS：css 预编译处理器
7. ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等
### 后端
1. Node.js：利用 Express 搭建的本地测试服务器
2. vue-axios：用来请求后端 API 音乐数据
### 其他工具
1. vue-cli：Vue 脚手架工具，快速初始化项目代码
2. eslint：代码风格检查工具，帮助我们规范代码书写（一定要养成良好的代码规范）
## Build Setup
> A Vue.js project
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
