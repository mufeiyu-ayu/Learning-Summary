const arr = [1, 2, 3, 4, 5, 6, 7]
// 不允许用 split splice reverse

// 1.unshift
function reverse1(arr) {
    let newArr = []
    arr.forEach((item) => {
        newArr.unshift(item)
    })
    return newArr
}

function reverse2(arr) {
    let newArr = []
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i])
    }
    return newArr
}
