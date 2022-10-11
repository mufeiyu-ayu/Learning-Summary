const arr = [1, 1, 3, 4, 2, 4, 5, 8, 7, 5, 8]
// forEach + includes
function unique1(arr) {
    let newArr = []
    arr.forEach((element) => {
        if (!newArr.includes(element)) newArr.push(element)
    })
    return newArr
}

// reduce + includes
function unique2(arr) {
    return arr.reduce((initialValue, item) => {
        if (!initialValue.includes(item)) initialValue.push(item)
        return initialValue
    }, [])
}

// forEach + indexOf
function unique3(arr) {
    let newArr = []
    for (let item of arr) {
        if (newArr.indexOf(item) == -1) newArr.push(item)
    }
    return newArr
}

// filter 是否返回当前索引
function unique4(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

// sort
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

function unique6(arr) {
    return [...new Set(arr)]
}
console.log(unique5(arr))
