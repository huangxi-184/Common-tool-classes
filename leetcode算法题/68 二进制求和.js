// /**
//  * @param {string} a
//  * @param {string} b
//  * @return {string}
//  */
// 大数会丢精度
// var addBinary = function (a, b) {
//     let result1 = TwoToTen(a)
//     let result2 = TwoToTen(b)
//     let result = (parseInt(result1.replace(/,/g, '')) + parseInt(result2.replace(/,/g, '')))
//     let jieguo = TenToTwo(result)
//     console.log(jieguo)
//     return jieguo
// };

// function TwoToTen(s) {
//     let sum = 0
//     for (let i = 0; i < s.length; ++i) {
//         //其中注意if的判断两个条件相等的符号
//         if (s[i] == '1')
//             sum = sum + 2 ** (s.length - 1 - i)
//     }
//     console.log(sum.toLocaleString())
//     return sum.toLocaleString()
// }

// function TenToTwo(n) {
//     let arr = []
//     let str = ''
//     let i
//     if (n == 0) {
//         return '0'
//     }
//     for (i = 0; n > 0; i++) {
//         arr[i] = n % 2;
//         n = Math.floor(n / 2);
//     }
//     str = arr.reverse().join('')
//     return str
// }

// addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011")




// /**
//  * @param {string} a
//  * @param {string} b
//  * @return {string}
//  */
var addBinary = function (a, b) {
    let str1 = '0b' + a
    let str2 = '0b' + b
    let big1 = BigInt(str1)
    let big2 = BigInt(str2)
    let sum = big1 + big2
    let result = sum.toString(2)
    return result
};



addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011")

