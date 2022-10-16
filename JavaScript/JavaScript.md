### 1. 1. 闭包(必考)
用途：使用闭包主要是为了设计私有的方法和变量
优点：可以避免变量被全局变量污染
缺点：函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包
解决方法：在退出函数之前，将不使用的局部变量全部删除

- **每一个函数在执行之前都会进行预编译，预编译时会创建一个空的闭包对象。**
- **每当这个函数预编译时遇到其内部的函数声明时，会快速的扫描内部函数使用了当前函数中的哪些变量，将可能使用到的变量加入到闭包对象中，最终这个闭包对象将作为这些内部函数作用域链中的一员。**
- **只有所有内部函数的作用域链都被释放才会释放当前函数的闭包对象，所谓的闭包内存泄漏也就是因为闭包对象无法释放产生的。**
- **我们还介绍的一个巧妙且经典的内存泄漏案例，并且通过一些demo的运行结果证明了上面这些结论的正确性。**

具体参考链接：[https://juejin.cn/post/7079995358624874509#heading-6](https://juejin.cn/post/7079995358624874509#heading-6)

### 2.数组去重
```javascript
function unique6(arr) {
    return [...new Set(arr)]
}
```
```javascript
function unique1(arr) {
    let newArr = []
    arr.forEach((element) => {
        if (!newArr.includes(element)) newArr.push(element)
    })
    return newArr
}
```
```javascript
function unique2(arr) {
    return arr.reduce((initialValue, item) => {
        if (!initialValue.includes(item)) initialValue.push(item)
        return initialValue
    }, [])
}
```
```javascript
function unique3(arr) {
    let newArr = []
    for (let item of arr) {
        if (newArr.indexOf(item) == -1) newArr.push(item)
    }
    return newArr
}
```
```javascript
function unique4(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

```
```javascript
function unique5(arr) {
    let newArr = []
    arr = arr.sort((a, b) => a - b)
    arr.forEach((item, index, arr) => {
        if (item != arr[index + 1]) {
            newArr.push(item)
        }
    })
    return newArr
}
```
### 3.反转数组
条件： 不允许用 split splice reverse
```javascript
function reverse1(arr) {
    let newArr = []
    arr.forEach((item) => {
        newArr.unshift(item)
    })
    return newArr
}
```
```javascript
function reverse2(arr) {
    let newArr = []
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i])
    }
    return newArr
}
```
### 4.防抖节流
**函数防抖**函数防抖是也优化**高频率**执行js代码的一种手段可以让被调用的函数在一次连续的高频操作中只被调用**一次**
作用：减少代码执行次数, 提升网页性能应用场景：oninput / onmousemove / onscroll / onresize 等事件
```javascript
function debounce(fn, delay) {
    let timer = null
    return function (...arg) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}
```

**函数节流**函数节流是优化**高频率**执行js代码的一种手段可以**减少**高频调用函数的执行次数
作用：减少代码执行次数, 提升网页性能应用场景：oninput / onmousemove / onscroll / onresize 等事件
```javascript
function throttle(fn, delay) {
    let timer = null
    return function (...arg) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}

```
### 5.排序
**1.选择排序**
```javascript
function  SelectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i] // 保存当前值
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < min) {
            ;[arr[j], min] = [min, arr[j]]
        }
    }
    arr[i] = min
 }
  return arr
}
```
**2.冒泡排序**
```javascript
function bubbleStort(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
    }
 }
  return arr
}
```

### 6.原型
** 谈谈你对 JS 原型和原型链的理解？**
原型是指为其它对象提供共享属性访问的对象。在创建对象时，每个对象都包含一个隐式引用指向它的原型对象或者 null，
原型也是对象，因此它也有自己的原型。这样构成一个原型链。
**原型链有什么作用？**
在访问一个对象的属性时，实际上是在查询原型链。这个对象是原型链的第一个元素，先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。
**如何实现原型继承呢？**
有两种方式。一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。
另一种是通过 constructor 构造函数，在使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。
在 ES2015 中提供了 class 的风格，背后跟 constructor 工作方式一样，写起来更内聚一些。
**ConstructorB 如何继承 ConstructorA ？**
JS 里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。
因此，两个 Constructor 之间的继承，需要分开两个步骤。
第一步是，编写新的 constructor，将两个 constructor 通过 call/apply 的方式，合并它们的属性初始化。按照超类优先的顺序进行。
第二步是，取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型。
整个过程手动编写起来比较繁琐，因此建议通过 ES2015 提供的 class 和 extends 关键字去完成继承，它们内置了上述两个步骤。
**说一个原型里比较少人知道的特性吗？**
在 ES3 时代，只有访问属性的 get 操作能触发对原型链的查找。在 ES5 时代，新增了 accessor property 访问器属性的概念。它可以定义属性的 getter/setter 操作。
具有访问器属性 setter 操作的对象，作为另一个对象的原型的时候，设置属性的 set 操作，也能触发对原型链的查找。
普通对象的 __proto__ 属性，其实就是在原型链查找出来的，它定义在 Object.prototype 对象上。
### 7.new关键字
 **1.new 的时候到底发生了什么？**
1、创建一个空对象
2、设置新对象的__proto__属性指向构造函数的原型对象
3、让构造函数中的this指向新对象，并执行构造函数的函数体
4、判断构造函数的返回值类型，如果是值类型，则返回新对象。如果是引用类型，就返回这个引用类型的对象。
**实现一个new**
```javascript
function create(Con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
```
### 8. 深拷贝和浅拷贝，以及如何实现对象深拷贝？(重点)
**深拷贝**修改新变量的值不会影响原有变量的值默认情况下基本数据类型都是深拷贝
实现方式： 使用JSON.parse(JSON.stringfy())进行深拷贝，但是会让数据中的函数丢失。
**浅拷贝**修改新变量的值会影响原有变量的值默认情况下引用类型都是浅拷贝
**实现一个深拷贝**
**实现一个深拷贝有多种方式，但是很多要么有局限要么对于某些情况有问题**
**在此我实现一个能让hr眼前一亮的深拷贝**
```javascript
   //    深拷贝
function deepClone(oldObj) {
    const targetObj = Array.isArray(oldObj) ? [] : {}
    for (let key in oldObj) {
        if (oldObj.hasOwnProperty(key)) {
            if (typeof oldObj[key] === 'object' && oldObj[key] !== null) {
                targetObj[key] = Array.isArray(oldObj[key]) ? [] : {}
                targetObj[key] = deepClone(oldObj[key])
            } else {
                targetObj[key] = oldObj[key]
            }
        }
    }
    return targetObj
}
```
```javascript
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) 
  return new Date(obj)       // 日期对象直接返回一个新的日期对象
  if (obj.constructor === RegExp)
  return new RegExp(obj)     //正则对象直接返回一个新的正则对象
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj)
  let allDesc = Object.getOwnPropertyDescriptors(obj)
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  //继承原型链
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) { 
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ?       deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}
```

### 9.继承
**call，apply实现继承**
```javascript
function Person(myName, myAge) {
    this.name = myName
    this.age = myAge
}
Person.prototype.say = function () {
    console.log(this.name, this.age)
}
function Student(myName, myAge, myScore) {
    this.myScore = myScore
    Person.call(this, myName, myAge)
}
Student.prototype.study = function () {
    console.log('day day up')
}
```
```javascript
function Person(myName, myAge) {
    this.name = myName
    this.age = myAge
}
Person.prototype.say = function () {
    console.log(this.name, this.age)
}
function Student(myName, myAge, myScore) {
    this.name = myName
    this.age = myAge
    this.score = myScore
}
Student.prototype = new Person()
Student.prototype.constructor = Student

Student.prototype.study = function () {
    console.log('day day up')
}
```
**ES6继承**
```javascript
class Person{
    constructor(myName, myAge){
        // this = stu;
        this.name = myName; // stu.name = myName;
        this.age = myAge;   // stu.age = myAge;
    }
    say(){
        console.log(this.name, this.age);
    }
}

class Student extends Person{
    constructor(myName, myAge, myScore){
        super(myName, myAge);   // 这一行代码相当于在子类中通过call/apply方法借助父类的构造函数
        this.score = myScore;
    }
    study(){
        console.log("day day up");
      super.say() //super当做对象使用时，指向父类的原型对象，在静态方法种指向父类
    }
}

let stu = new Student("zs", 18, 98);
stu.say();  // zs 18
```
### 10.检测数据类型的方式
**1.typeof**
```javascript
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object    
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object
```
其中数组、对象、null都会被判断为object，其他判断都正确。
**2.instanceof**
`instanceof`可以正确判断对象的类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。
```javascript
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```
**3.**`**constructor**`
有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：
```javascript
function Fn(){};
 
Fn.prototype = new Array();
 
var f = new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```
**4.Object.prototype.toString.call()**
```javascript
var a = Object.prototype.toString;
 
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));
```
同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？

这是因为toString是Object的原型方法，而Array、function等**类型作为Object的实例，都重写了toString方法**。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。
### 11.判断数组的方式

- 通过Object.prototype.toString.call()做判断
- 通过原型链做判断
- 通过ES6的Array.isArray()做判断
- 通过instanceof做判断
- Array.prototype.isPrototypeOf
```javascript
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
obj.__proto__ === Array.prototype;
Array.isArrray(obj);
obj instanceof Array
Array.prototype.isPrototypeOf(obj)
```
### 12.null和undefined的区别
1.首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。
2.undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
3.当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。
### 13.typeof null 为啥返回object
在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 **类型标签(1-3 bits)** 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：
```javascript
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
```
有两种特殊数据类型：

- undefined的值是 (-2)30(一个超出整数范围的数字)；
- null 的值是机器码 NULL 指针(null 指针的值全是 0)

那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object。
### 14. 为什么0.1+0.2 ! == 0.3，如何让其相等  
在开发过程中遇到类似这样的问题：
```javascript
let n1 = 0.1, n2 = 0.2
console.log(n1 + n2)  // 0.30000000000000004
```
这里得到的不是想要的结果，要想等于0.3，就要把它进行转化：
```javascript
(n1 + n2).toFixed(2) // 注意，toFixed为四舍五入
```
`toFixed(num)` 方法可把 Number 四舍五入为指定小数位数的数字。那为什么会出现这样的结果呢？
计算机是通过二进制的方式存储数据的，所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和。0.1的二进制是`0.0001100110011001100...`（1100循环），0.2的二进制是：`0.00110011001100...`（1100循环），这两个数的二进制都是无限循环的数。那JavaScript是如何处理无限循环的二进制小数呢？
一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位，再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则。[详细介绍](https://juejin.cn/post/6844903680362151950)
### 15. isNaN 和 Number.isNaN 函数的区别？

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。
### 16. Object.is() 与比较操作符 “===”、“==” 的区别？

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。
### 17. 什么是 JavaScript 中的包装类型？
在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，**在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：**
```javascript
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```
在访问`'abc'.length`时，JavaScript 将`'abc'`在后台转换成`String('abc')`，然后再访问其`length`属性。

JavaScript也可以使用`Object`函数显式地将基本类型转换为包装类型：
```javascript
var a = 'abc'
Object(a) // String {"abc"}
```
也可以使用`valueOf`方法将包装类型倒转成基本类型：
```javascript
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```
看看如下代码会打印出什么：
```javascript
var a = new Boolean( false );
if (!a) {
	console.log( "Oops" ); // never runs
}
```
答案是什么都不会打印，因为虽然包裹的基本类型是`false`，但是`false`被包裹成包装类型后就成了对象，所以其非值为`false`，所以循环体中的内容不会运行。
### 18. object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别

- Object.assign()方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。
- 扩展操作符（…）使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性。
### 19. 如何判断一个对象是空对象

- 使用ES6新增的方法Object.keys()来判断：
```javascript
if(Object.keys(Obj).length === 0){
    console.log('空对象');
}
```
### 20. 如果new一个箭头函数的会怎么样
箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。所以会报错
###  23.箭头函数与普通函数的区别
**（1）箭头函数比普通函数更加简洁**
**（2）箭头函数没有自己的this**
**（3）箭头函数继承来的this指向永远不会改变**
**  (4）call()、apply()、bind()等方法不能改变箭头函数中this的指向**
**（5）箭头函数不能作为构造函数使用**
**（6）箭头函数没有自己的arguments**
**（7）箭头函数没有prototype**
**（8）箭头函数不能用作Generator函数，不能使用yeild关键字**
### 24. map和Object的区别
| Map | Object |  |
| --- | --- | --- |
| 意外的键 | Map默认情况不包含任何键，只包含显式插入的键。 | Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。 |
| 键的类型 | Map的键可以是任意值，包括函数、对象或任意基本类型。 | Object 的键必须是 String 或是Symbol。 |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。 | Object 的键是无序的 |
| Size | Map 的键值对个数可以轻易地通过size 属性获取 | Object 的键值对个数只能手动计算 |
| 迭代 | Map 是 iterable 的，所以可以直接被迭代。 | 迭代Object需要以某种方式获取它的键然后才能迭代。 |
| 性能 | 在频繁增删键值对的场景下表现更好。 | 在频繁添加和删除键值对的场景下未作出优化。 |

### 25. 对JSON的理解
JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。
在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为 
JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。
因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。
在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，

- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
- JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。
### 26 JavaScript脚本延迟加载的方式有哪些？
延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。
一般有以下几种方式：

- **defer 属性：**给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- **async 属性：**给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- **动态创建 DOM 方式：**动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
- **使用 setTimeout 延迟方法：**设置一个定时器来延迟加载js脚本文件
- **让 JS 最后加载：**将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
- **window.onload**,还有一个什么方法
### 27. **Unicode、UTF-8、UTF-16、UTF-32的区别？**
#### （1）Unicode
在说`Unicode`之前需要先了解一下`ASCII`码：ASCII 码（`American Standard Code for Information Interchange`）称为美国标准信息交换码。

- 它是基于拉丁字母的一套电脑编码系统。
- 它定义了一个用于代表常见字符的字典。
- 它包含了"A-Z"(包含大小写)，数据"0-9" 以及一些常见的符号。
- 它是专门为英语而设计的，有128个编码，对其他语言无能为力

`ASCII`码可以表示的编码有限，要想表示其他语言的编码，还是要使用`Unicode`来表示，可以说`Unicode`是`ASCII` 的超集。

`Unicode`全称 `Unicode Translation Format`，又叫做统一码、万国码、单一码。`Unicode` 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。

`Unicode`的实现方式（也就是编码方式）有很多种，常见的是**UTF-8**、**UTF-16**、**UTF-32**和**USC-2**。
#### （2）UTF-8
`UTF-8`是使用最广泛的`Unicode`编码方式，它是一种可变长的编码方式，可以是1—4个字节不等，它可以完全兼容`ASCII`码的128个字符。

**注意：** `UTF-8` 是一种编码方式，`Unicode`是一个字符集合。

`UTF-8`的编码规则：

- 对于**单字节**的符号，字节的第一位为0，后面的7位为这个字符的`Unicode`编码，因此对于英文字母，它的`Unicode`编码和`ACSII`编码一样。
- 对于**n字节**的符号，第一个字节的前n位都是1，第n+1位设为0，后面字节的前两位一律设为10，剩下的没有提及的二进制位，全部为这个符号的`Unicode`码 。

来看一下具体的`Unicode`编号范围与对应的`UTF-8`二进制格式 ：

| 编码范围（编号对应的十进制数） | 二进制格式 |
| --- | --- |
| 0x00—0x7F （0-127） | 0xxxxxxx |
| 0x80—0x7FF （128-2047） | 110xxxxx 10xxxxxx |
| 0x800—0xFFFF  （2048-65535） | 1110xxxx 10xxxxxx 10xxxxxx |
| 0x10000—0x10FFFF  （65536以上） | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

那该如何通过具体的`Unicode`编码，进行具体的`UTF-8`编码呢？**步骤如下：**

- 找到该`Unicode`编码的所在的编号范围，进而找到与之对应的二进制格式
- 将`Unicode`编码转换为二进制数（去掉最高位的0）
- 将二进制数从右往左一次填入二进制格式的`X`中，如果有`X`未填，就设为0

来看一个实际的例子：
“**马**” 字的`Unicode`编码是：`0x9A6C`，整数编号是`39532`
（1）首选确定了该字符在第三个范围内，它的格式是 `1110xxxx 10xxxxxx 10xxxxxx`
（2）39532对应的二进制数为`1001 1010 0110 1100`
（3）将二进制数填入X中，结果是：`11101001 10101001 10101100`
#### （3）UTF-16
**1. 平面的概念**
在了解`UTF-16`之前，先看一下**平面**的概念：
`Unicode`编码中有很多很多的字符，它并不是一次性定义的，而是分区进行定义的，每个区存放**65536**（216）个字符，这称为一个**平面**，目前总共有17 个平面。

最前面的一个平面称为**基本平面**，它的码点从**0 — 216-1**，写成16进制就是`U+0000 — U+FFFF`，那剩下的16个平面就是**辅助平面**，码点范围是 `U+10000—U+10FFFF`。
**2. UTF-16 概念：**
`UTF-16`也是`Unicode`编码集的一种编码形式，把`Unicode`字符集的抽象码位映射为16位长的整数（即码元）的序列，用于数据存储或传递。`Unicode`字符的码位需要1个或者2个16位长的码元来表示，因此`UTF-16`也是用变长字节表示的。
**3. UTF-16 编码规则：**

- 编号在 `U+0000—U+FFFF` 的字符（常用字符集），直接用两个字节表示。
- 编号在 `U+10000—U+10FFFF` 之间的字符，需要用四个字节表示。

**4. 编码识别**
那么问题来了，当遇到两个字节时，怎么知道是把它当做一个字符还是和后面的两个字节一起当做一个字符呢？

`UTF-16` 编码肯定也考虑到了这个问题，在基本平面内，从 `U+D800 — U+DFFF` 是一个空段，也就是说这个区间的码点不对应任何的字符，因此这些空段就可以用来映射辅助平面的字符。

辅助平面共有 **220** 个字符位，因此表示这些字符至少需要 20 个二进制位。`UTF-16` 将这 20 个二进制位分成两半，前 10 位映射在 `U+D800 — U+DBFF`，称为**高位**（H），后 10 位映射在 `U+DC00 — U+DFFF`，称为**低位**（L）。这就相当于，将一个辅助平面的字符拆成了两个基本平面的字符来表示。

因此，当遇到两个字节时，发现它的码点在 `U+D800 —U+DBFF`之间，就可以知道，它后面的两个字节的码点应该在 `U+DC00 — U+DFFF` 之间，这四个字节必须放在一起进行解读。
**5. 举例说明**
以 "**𡠀**" 字为例，它的 `Unicode` 码点为 `0x21800`，该码点超出了基本平面的范围，因此需要用四个字节来表示，步骤如下：

- 首先计算超出部分的结果：`0x21800 - 0x10000`
- 将上面的计算结果转为20位的二进制数，不足20位就在前面补0，结果为：`0001000110 0000000000`
- 将得到的两个10位二进制数分别对应到两个区间中
- `U+D800` 对应的二进制数为 `1101100000000000`， 将`0001000110`填充在它的后10 个二进制位，得到 `1101100001000110`，转成 16 进制数为 `0xD846`。同理，低位为 `0xDC00`，所以这个字的`UTF-16` 编码为 `0xD846 0xDC00`
#### （4） UTF-32
`UTF-32` 就是字符所对应编号的整数二进制形式，每个字符占四个字节，这个是直接进行转换的。该编码方式占用的储存空间较多，所以使用较少。

比如“**马**” 字的Unicode编号是：`U+9A6C`，整数编号是`39532`，直接转化为二进制：`1001 1010 0110 1100`，这就是它的UTF-32编码。
#### （5）总结
**Unicode、UTF-8、UTF-16、UTF-32有什么区别？**

- `Unicode` 是编码字符集（字符集），而`UTF-8`、`UTF-16`、`UTF-32`是字符集编码（编码规则）；
- `UTF-16` 使用变长码元序列的编码方式，相较于定长码元序列的`UTF-32`算法更复杂，甚至比同样是变长码元序列的`UTF-8`也更为复杂，因为其引入了独特的**代理对**这样的代理机制；
- `UTF-8`需要判断每个字节中的开头标志信息，所以如果某个字节在传送过程中出错了，就会导致后面的字节也会解析出错；而`UTF-16`不会判断开头标志，即使错也只会错一个字符，所以容错能力教强；
- 如果字符内容全部英文或英文与其他文字混合，但英文占绝大部分，那么用`UTF-8`就比`UTF-16`节省了很多空间；而如果字符内容全部是中文这样类似的字符或者混合字符中中文占绝大多数，那么`UTF-16`就占优势了，可以节省很多空间；
