function debounce(fn, delay) {
    let timer = null
    return function (...arg) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}

function throttle(fn, delay) {
    let timer = null
    return function (...arg) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
        }, delay)
    }
}
