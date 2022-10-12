function deepClone1(oldObj) {
    const targetObj = Array.isArray(oldObj) ? [] : {}

    for (let key in oldObj) {
        if (oldObj.hasOwnhasProperty(key)) {
            if (typeof oldObj[key] === 'object' && oldObj[key] !== null) {
                targetObj[key] = Array.isArray(oldObj[key]) ? [] : {}
                targetObj[key] = deepClone1(oldObj[key])
            } else {
                targetObj[key] = oldObj[key]
            }
        }
    }
    return targetObj
}

// 判断不是普通值
const isComplexDataType = (obj) => (typeof obj === 'object' || typeof obj === 'function') && obj !== null
const deepClone2 = function (obj, hash = new WeakMap()) {
    if (obj.constructor === Date) return new Date(obj) // 日期对象直接返回一个新的日期对象
    if (obj.constructor === RegExp) return new RegExp(obj) //正则对象直接返回一个新的正则对象
    //如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj) //每个属性的属性描述符

    //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    //继承原型链， cloneObJ是拷贝的原对象的原型以及属性描述符，但是知识一层
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] =
            isComplexDataType(obj[key]) && typeof obj[key] !== 'function' ? deepClone2(obj[key], hash) : obj[key]
    }
    return cloneObj
}
