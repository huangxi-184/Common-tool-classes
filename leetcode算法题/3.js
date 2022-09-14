/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function (s, dictionary) {
    let arrstr = dictionary.sort((a, b) => a.length - b.length)
    let resultArr = []
    for (let i = dictionary.length - 1; i >= 0; i--) {
        if (s.indexOf(arrstr[i]) == -1) {
            console.log(arrstr[i], '过')
            continue
        }
        else {
            resultArr.push(arrstr[i])
        }
    }
    if (resultArr.length < 1) {
        console.log('空')
        return ""
    }
    if (resultArr.length >= 1) {
        resultArr.sort((a, b) => a - b)
        console.log(resultArr[0])
        return resultArr[0].toString
    }
};
findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"])