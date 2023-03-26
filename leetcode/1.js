// 两数之和
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0, len = nums.length; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
};

const nums = [3, 2, 4],
  target = 6;
console.log(twoSum(nums, target))
