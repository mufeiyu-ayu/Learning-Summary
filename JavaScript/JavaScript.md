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

