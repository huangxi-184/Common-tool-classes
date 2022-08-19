/**
 * @param {number} x
 * @return {number}
 */
// 暴击解法 不推荐
// var mySqrt = function (x) {
//     let i = 1
//     if (x == 0) {
//         return 0
//     }
//     for (i; i < 65, 536; i++) {
//         let mul_max = i * i
//         let mul_min = (i-1) *(i-1)
//         if (mul_max > x){
//             return i-1
//         }
//     }
// };

// 牛顿迭代法
var mySqrt = function (x) {
    if (x == 0) {
        return 0
    }
    let C = x
    let x0 = x
    while (true) {
        let xi = 0.5 * (x0 + C / x0);
        // 误差判别
        if (Math.abs(x0 - xi) < 1e-7) {
            break;
        }
        x0 = xi;
    }
    return Math.trunc(x0)
};



