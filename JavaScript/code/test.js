function _new(constructor, ...arg) {
    if (typeof constructor !== 'function') {
        throw new Error('constructor is not a function')
    }
    let obj = {}
    obj.__proto__ = constructor.prototype
    let res = constructor.apply(obj, arg)
    return typeof res === 'object' ? res : obj
}
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.obj = function () {
    console.log(11)
}
let p = _new(Person, 'jack', 20)
p.obj()
console.log(p)
