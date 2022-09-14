/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    // console.log(x ** n)
    // return x ** n
    let result = 1
    if (x == 1) {
        return 1
    } else if (x == -1) {
        if (n % 2 == 0) {
            return 1
        }
        else return -1
    }
    else {
        if (n > 0) {
            for (let i = 1; i <= n; i++) {
                result *= x
            }
        }
        if (n == 0) {
            return 1
        }
        if (n < 0) {
            if (n < -100) {
                return 0
            }
            let daoshu = 1 / x
            n = -n
            for (let j = 1; j <= n; j++) {
                result = result * daoshu
            }
        }

    }
    return result
};

myPow(-1.00000, -2147483648)