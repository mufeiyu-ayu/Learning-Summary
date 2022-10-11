let arr = [3, 4, 1, 2, 7, 6]
// [1,4,3,2,7,6]
//
//
for (let i = 0; i < arr.length; i++) {
    let min = arr[i] // 保存当前值
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < min) {
            ;[arr[j], min] = [min, arr[j]]
        }
    }
    arr[i] = min
}
console.log(arr)
