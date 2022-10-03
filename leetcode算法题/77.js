/**
 * @param {number[]} nums
 * @return {number[]}
 */
var missingTwo = function (nums) {
  let res = nums.sort((a, b) => {
    return a - b
  })
  let i = 0
  let result = []
  console.log(res)
  do {
    if (res[i] + 1 == res[i + 1]) {
      i++
      continue
    }
    else {
      i++
      result.push(res[i]+1)
    }
  } while (i < nums.length + 2);
  return result
};
missingTwo([2, 3])