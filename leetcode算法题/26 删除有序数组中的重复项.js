/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let v = new Set(nums)
    let arr = [...v]
    nums.length = 0
    for (let j = 0; j < arr.length; j++) {
        nums.push(arr[j])
    }
    console.log(nums)
    return nums.length
};
removeDuplicates([1, 1, 2])

