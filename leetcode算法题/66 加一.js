/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
	let len = digits.length
	if (digits[0] == 0) {
		return [1]
	} else {
		for (let i = 1; i < len; i++) {
			if (digits[len - i] + 1 <= 9) {
				digits[len - i] = digits[len - i] + 1
				return digits
			} else {
				if (len - i == 0) {
					digits.unshift(1)
					digits[len + 1 - i] = 0
					return digits
				}
				else {
					digits[len - i - 1] = digits[len - i - 1] + 1
					digits[len - i] = 0
				}
				return digits
			}
		}

	}
}

plusOne([4, 3, 2, 1])