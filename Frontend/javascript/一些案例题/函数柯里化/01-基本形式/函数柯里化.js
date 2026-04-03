{
  //函数柯里化
  /*
   * 将函数柯里化
   * @param fn    待柯里化的原函数
   * @param len   所需的参数个数，默认为原函数的形参个数
   */
  // function curry(fn, len = fn.length) {
  //   return _curry.call(this, fn, len);
  //   function _curry(fn, len, ...args) {
  //     return function (...params) {
  //       let _args = [...args, ...params];
  //       //合并的参数是否达到预定长度
  //       if (_args.length >= len) {
  //         return fn.apply(this, _args);
  //       } else {
  //         return _curry.call(this, fn, len, ..._args);
  //       }
  //     };
  //   }
  // }
  /*
   中转函数
   @param fn    待柯里化的原函数
   @param len   所需的参数个数
   @param args  已接收的参数列表
  */
  // function _curry(fn, len, ...args) {
  //   return function (...params) {
  //     let _args = [...args, ...params];
  //     //合并的参数是否达到预定长度
  //     if (_args.length >= len) {
  //       return fn.apply(this, _args);
  //     } else {
  //       return _curry.call(this, fn, len, ..._args);
  //     }
  //   };
  // }
  // let testFunc = curry((a, b, c) => {
  //   console.log(a, b, c);
  // });
  // testFunc(1)(2, 4);
  // testFunc(1)(2)(3);
}
{
  {
    //自己结合上面代码实现，但是不能多次调用,且参数数量不能小于形参数目。
    //原因：_args是一个全局变量，每次调用testFunc应用的都是用一个_args
    //上面代码，在每次执行时，都会重新定义一个_args变量
    function curry(fun) {
      let _args = []; //合并每次传入的参数，利用闭包进行保留
      function _curry(fun, len) {
        return function (...params) {
          _args = _args.concat(params);
          if (_args.length >= len) {
            return fun.apply(this, _args);
          } else {
            return _curry.call(this, fun, len);
          }
        };
      }
      return _curry.call(this, fun, fun.length);
    }
    // let testFunc = curry((a, b, c) => {
    //   console.log(a, b, c);
    // });
    // testFunc(1)(2)(3);
  }

  // let fu = function (a, b, c) {
  //   console.log(arguments.length); //捕捉实参数目
  //   console.log(fu.length); //捕捉形参数目
  // };
  // fu(1, 2);
}
// //默写
// {
//   function curry(fu) {
//     return _curry.call(this, fu, fu.length);
//     //回调函数
//     function _curry(func, length, ...args) {
//       return function (...params) {
//         let _args = args.concat(params);
//         return _args.length >= length
//           ? func.apply(this, _args)
//           : _curry.call(this, func, fu.length, ..._args);
//       };
//     }
//   }

//   let func = curry((reg, txt) => {
//     console.log(txt.match(reg));
//   });
//   // func(1, 2)(3);
//   // func(1)(2, 3);
//   // func(1)(2)(3);
//   let testNumber = func(/\d/g);
//   testNumber("123");
//   testNumber("456");
//   func(/[a-z]/gi)("abcd");
//   func(/[a-z]/gi)("123");
// }
{
  //基本形式
  // function curry(func) {
  //   return function (a) {
  //     let context = this;
  //     return function (b) {
  //       func.call(context, a, b);
  //     };
  //   };
  // }
  // let func = curry((a, b) => {
  //   console.log(a + b);
  // });
  // func(3)(2);
}
