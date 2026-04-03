//暴力解法
/*export default function twoSum (nums, target){
	for(let i=0;i<nums.length;i++){
		for(let j=i+1;j<nums.length;j++){
			if(nums[i]+nums[j]===target) return [i,j];	
		}	
	}
}*/

//双指针
/*function twoSum (nums, target){
	let p1=0;
	let p2=1;
	
	while(nums[p1]+nums[p2]!==target){
		if(p2===nums.length-1){
			p2=++p1;	
		}
		p2++
	}
	return [p1,p2];
}*/

//原生方法，去掉第二个 for 循环
// export default function twoSum(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     const find = nums.indexOf(target - nums[i]);
//     if (find !== -1 && find !== i) {
//       return [i, find];
//     }
//   }
// }

export default function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const find = nums.findIndex((v) => v + nums[i] === target);
    if (find !== -1 && find !== i) {
      return [i, find];
    }
  }
}
