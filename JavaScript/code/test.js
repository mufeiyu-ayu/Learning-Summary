let arr = [6, 9, 7, 8, 1, 2, 3, 8, 9, 99]
let quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr
    }
    var pivotIndex = Math.floor(arr.length / 2) // 以数组中中间那个索引 作为基准索引
    var pivot = arr.splice(pivotIndex, 1)[0]

    // 根据基准索引 获取基准值， 把基准值从原数组中删除

    var less = [], // 比基准值小的 新数组
        greatter = [] // 比基准值大的新数组
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= pivot) {
            greatter.push(arr[i])
        } else {
            less.push(arr[i])
        }
    }
    //
    return quickSort(less).concat([pivot], quickSort(greatter)) //？
}

console.log(quickSort(arr))
