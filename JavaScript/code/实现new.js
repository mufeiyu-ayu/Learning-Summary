function _new(constructor, ...arg) {
    const obj = {}
    obj.__proto__ = constructor.prototype
    let res = constructor.apply(obj, arg)
    return typeof res === 'object' ? res : obj
}

function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.obj = {
    a: 1
}
let person1 = _new(Person, '占山', 22)

console.log(person1.obj)
