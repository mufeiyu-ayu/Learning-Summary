<a name="UIwxC"></a>
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

<a name="GrnPq"></a>
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
<a name="TgMDW"></a>
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
<a name="vlvqK"></a>
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
<a name="yBF7o"></a>
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
