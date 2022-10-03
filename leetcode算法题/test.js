var rotatedDigits = function (n) {
    let i = 0
    let count = 0
    while (i <= n) {
        let result = i.toString()
        let resultarr = result.split('')
        let rebool2 = resultarr.some((currentValue) => {
            return currentValue === "3" || currentValue === "4" || currentValue === "7"
        })
        if (rebool2) {
            i++
            continue
        }
        let rebool = resultarr.every((currentValue) => {
            return currentValue === "0" || currentValue === "1" || currentValue === "8"
        })
        if (rebool) {
            i++
            continue
        }
        count++
        i++
    }
    console.log(count)
    return count
};

rotatedDigits(100)

