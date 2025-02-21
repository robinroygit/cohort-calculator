// [5,3,2,4,6,7,1]
// 1-n but one missing
function findMissing(nums) {
  let sum = 0;
  nums.forEach(function (num) {
    sum = sum + num;
  });
  const n = nums.length + 1;
  const originalSum = (n * (n + 1)) / 2;
  return originalSum - sum;
}




console.log(findMissing([1,2,3,4,5,7,]));
