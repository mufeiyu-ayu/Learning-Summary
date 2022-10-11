<a name="gqbHg"></a>
# HTML
<a name="zojs9"></a>
### 1.对HTML语义化的理解
语义化就是选择与语义相符合的标签，使代码语义化
优点：

- 根据内容的结构 选择合适的标签构建出便于开发者阅读的可维护性更高的代码结构
- 同时也可以让机器更好地解析代码
- html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解
- 便于网络爬虫捕获
<a name="JFlIL"></a>
### 2. meta viewport 是做什么用的
将视口大小设置为可视区域的大小。
**什么是视口**视口简单理解就是可视区域大小。在PC端，视口大小就是浏览器窗口可视区域的大小在移动端, 视口大小并不等于窗口大小, 移动端视口宽度被人为定义为了980
**为什么移动端视口宽度是980而不是其他的值**
因为过去网页的版心都是980的，为了能够让网页在移动端完美的展示, 所以将手机视口的大小定义为了980。
**移动端自动将视口宽度设置为980带来的问题**
虽然移动端自动将视口宽度设置为980之后让我们可以很完美的看到整个网页，但是由于移动端的物理尺寸(设备宽度)是远远小于视口宽度的，所以为了能够在较小的范围内看到视口中所有的内容, 那么就必须将内容缩小。但是缩小后用户看到的是一个缩小版的整个页面，字体、图标和内容等等都非常小，想要点击或者查看都需要去放大页面进行操作，放大页面之后就会出现横向滚动条，这对用户体验来说是非常不好的。
**如何保证在移动端不自动缩放网页的尺寸**
通过meta设置视口大小viewport 是指 web 页面上用户的可视区域。meta标签的属性
```javascript
width=device-width 设置视口宽度等于设备的宽度
initial-scale=1.0 初始缩放比例, 1不缩放
maximum-scale：允许用户缩放到的最大比例
minimum-scale：允许用户缩放到的最小比例
user-scalable：用户是否可以手动缩放复制代码
```


<a name="o8Nny"></a>
# CSS
<a name="OgKrT"></a>
### 1.浮动
为什么要清除浮动：

- 由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响
- 准确地说，并不是清除浮动，而是**清除浮动后造成的影响**
- **清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题。清除浮动之后， 父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了**

清除浮动的方法：

1. **父级添加overflow属性方法**
:::info
可以给父级添加： overflow为 hidden| auto| scroll  都可以实现。
:::
优点： 代码简洁
参考链接：[演示清除浮动的过程](https://www.php.cn/css-tutorial-412428.html)
缺点： 内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。
2. **使用after伪元素清除浮动**
```javascript
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}

```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21696332/1665400978174-f997b665-a37f-4fca-9475-d05d4e04c85f.png#clientId=ubd4f8414-113d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=634&id=ud4fafd61&margin=%5Bobject%20Object%5D&name=image.png&originHeight=792&originWidth=1351&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131299&status=done&style=none&taskId=u312a398e-9c57-43ca-b882-acb17c72b02&title=&width=1080.8)
**给浮动元素的父级标签添加clear这个类，即可让父级标签有高度**

- 优点： 符合闭合浮动思想 结构语义化正确
- 缺点： 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。
3. **使用双伪元素清除浮动**

使用方法：也是同样给父级标签添加clear类，既可自动撑开父级标签
```javascript
.clearfix:before,
.clearfix:after {
    content: '';
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}
```
<a name="sEiC5"></a>
### 2. Less/Sass/Scss的区别

- **Scss其实是Sass的改进版本**Scss是Sass的缩排语法，对于写惯css前端的web开发者来说很不直观，也不能将css代码加入到Sass里面，因此Sass语法进行了改良，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。
- **Less环境较Sass简单**Sass的安装需要安装Ruby环境，Less基于JavaScript，需要引入Less.js来处理代码输出css
- **变量符不一样，Less是@，而Sass是$，而且变量的作用域也不一样。**Sass没有局部变量，满足就近原则。Less中{}内定义的变量为局部变量。
- **Less没有输出设置，Sass提供4中输出选项**输出样式的风格可以有四种选择，默认为nestednested：嵌套缩进的css代码expanded：展开的多行css代码compact：简洁格式的css代码compressed：压缩后的css代码
- **Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。**
- **Less与Sass处理机制不一样**Less是通过客户端处理的，Sass是通过服务端处理，相比较之下Less解析会比Sass慢一点
- **Sass和Less的工具库不同**Sass有工具库Compass, 简单说，Sass和Compass的关系有点像Javascript和jQuery的关系,Compass是Sass的工具库。在 它的基础上，封装了一系列有用的模块和模板，补充强化了Sass的功能。Less有UI组件库Bootstrap, Bootstrap是web前端开发中一个比较有名的前端UI组件库，Bootstrap的样式文件部分源码就是采用Less语法编写，不过Bootstrap4也开始用Sass编写了。
<a name="qk1GJ"></a>
### 3. BFC及其应用(重点)
BFC （块级格式化上下文），是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响，它属于定位方案的普通流。
**触发条件：**

- 根元素
- 浮动元素：float 除 none 以外的值（left、right）
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

**约束规则：**

- 属于同一个 BFC 的两个相邻 Box 垂直排列
- 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，会环绕于周围

**作用：**

- 阻止元素被浮动元素覆盖一个正常文档流的块级元素可能被一个浮动元素覆盖，挤占正常文档流，因此可以设置一个元素的float、display、position或者overflow值等方式触发BFC，以阻止被浮动盒子覆盖。
- 清除浮动通过改变包含浮动子元素的父盒子的属性值，触发BFC，以此来包含子元素的浮动盒子。
- 阻止相邻元素的margin合并属于同一个BFC的两个相邻块级子元素的上下margin会发生重叠，所以当两个相邻块级子元素分属于不同的BFC时可以阻止margin重叠。

参考链接：[https://juejin.cn/post/6950082193632788493](https://juejin.cn/post/6950082193632788493)
<a name="AjcpL"></a>
### 4. 水平垂直居中(重点)
子绝父相 + transform
```javascript
.parent {
    position: relative;
}

.son {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```
```javascript
.parent {
    display:flex;
    justify-content:center;
    align-items: center;
}
```
额外补充几种方案：[https://juejin.cn/post/6844903679242305544#heading-0](https://juejin.cn/post/6844903679242305544#heading-0)
