// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
// 为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

/**
 * @param {number[]} nums1
 * @param {number} m
 * 1 2
 * 
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let arr = nums1.slice(0, m).concat(nums2)
    result = arr.sort(function (a, b) {
        return a - b;
    })

    for (let i = 0; i < m + n; i++) {
        nums1.shift(i)
        nums1.push(result[i])
    }

    console.log(nums1)
    return nums1
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)
