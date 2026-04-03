// interface Colorful {
//   color: string;
// }

// interface Circle extends Colorful {
//   radius: number;
// }

// function draw(circle: Circle) {
//   console.log(`Color was ${circle.color}`);
//   console.log(`Radius was ${circle.radius}`);
// }
// Question: 完善下面的 MyPick，跟 Pick 效果一致

// type MyPick<IProduct> ={
//   name: string
//   price: number
//   description?: string
//   images?: string[]
// }

// // Testcase
// interface IProduct {
//     name: string
//     price: number
//     description: string
//     images: string[]
// }

// // ISimpleProduct 应该只包含 name 和 price 属性
// const simpleProduct: MyPick<IProduct, "name" | "price"> = {
//     name: "苹果",
//     price: 100,
// }

// simpleProduct.name
// simpleProduct.price
// simpleProduct.description // ERROR

interface IConditionObj {
  result: boolean;
}
type IConditionFunc = () => boolean;
type ICondition = IConditionObj | IConditionFunc;

function run(condition: ICondition): void {
  const conditionResult = isConditionFunc(condition)
    ? (condition as IConditionFunc)()
    : (condition as IConditionObj).result;
  console.log(conditionResult);
}

// 实现一个 isConditionFunc
// code here
function isConditionFunc(condition: ICondition): boolean {
  if ((condition as IConditionObj).result === undefined) {
    return false;
  } else {
    return typeof (condition as IConditionObj).result === "boolean";
  }
}
