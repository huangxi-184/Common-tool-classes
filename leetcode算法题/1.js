/**
 * @param {number[]} arr
 * @return {number}
 */
var trimMean = function (arr) {
    let arrsort = arr.sort((a, b) => {
        return a - b
    })
    console.log(arrsort)
    let first = (arrsort.length / 20)
    let last = arrsort.length - (arrsort.length / 20)
    let count = last - first
    let sum = 0
    for (first; first < last; first++) {
        sum += arrsort[first]
    }
    return sum / count
};

trimMean([6, 0, 7, 0, 7, 5, 7, 8, 3, 4, 0, 7, 8, 1, 6, 8, 1, 1, 2, 4, 8, 1, 9, 5, 4, 3, 8, 5, 10, 8, 6, 6, 1, 0, 6, 10, 8, 2, 3, 4])