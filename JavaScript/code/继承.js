function Person(myName, myAge) {
    this.name = myName
    this.age = myAge
}
Person.prototype.say = function () {
    console.log(this.name, this.age)
}
function Student(myName, myAge, myScore) {
    // 1.在子类中通过call/apply方法借助父类的构造函数
    // Person.call(this, myName, myAge)
    this.name = myName
    this.age = myAge
    this.score = myScore
}
// 2.将子类的原型对象设置为父类的实例对象
Student.prototype = new Person()
Student.prototype.constructor = Student

Student.prototype.study = function () {
    console.log('day day up')
}

// ES6 clss
class Person {
    constructor(myName, myAge) {
        // this = stu;
        this.name = myName // stu.name = myName;
        this.age = myAge // stu.age = myAge;
    }
    say() {
        console.log(this.name, this.age)
    }
}
// 以下代码的含义: 告诉浏览器将来Student这个类需要继承Person这个类
class Student extends Person {
    constructor(myName, myAge, myScore) {
        super(myName, myAge) // 这一行代码相当于在子类中通过call/apply方法借助父类的构造函数
        this.score = myScore
    }
    study() {
        console.log('day day up')
    }
}

let stu = new Student('zs', 18, 98)
stu.say() // zs 18
