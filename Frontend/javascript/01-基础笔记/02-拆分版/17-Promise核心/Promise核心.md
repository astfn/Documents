---
title: Promise核心
date: 2021-05-16 13:40:21
tags:
categories:
- [Web前端,JavaScript大总结]
---

## Promise核心

本章来自己开发一个Promise实现，提升异步编程的能力。

### 起步构建

首先声明定义类并声明Promise状态与值，有以下几个细节需要注意。

- executor为执行者
- 当执行者出现异常时触发**拒绝**状态，并异步抛出错误
  - 如果直接抛出错误，在打印时，看不到PROMISE本身的状态与值，所以将抛出错误放在异步宏任务中
  - 这个结果和原生Promsie是相同的
- 使用静态属性保存状态值
- 状态只能改变一次，所以在resolve与reject添加条件判断
- 因为 `resolve`或`rejected`方法在executor中调用，作用域也是executor作用域，这会造成在外部确认状态时：this指向window，现在我们使用的是class定义，this为undefined。所以我们要改变this指向

```
      class PROMISE {
        static PENDING = "pending";
        static FULFILLED = "fulfilled";
        static REJECTED = "rejected";
        constructor(executor) {
          this.value = undefined;
          this.status = PROMISE.PENDING;
          try {
            executor(this.resolve.bind(this), this.reject.bind(this));
          } catch (err) {
            this.reject(err);
            setTimeout(() => {
              throw err;
            });
          }
        }
        resolve(result) {
          if (this.status === PROMISE.PENDING) {
            this.status = PROMISE.FULFILLED;
            this.value = result;
          }
        }
        reject(reason) {
          if (this.status === PROMISE.PENDING) {
            this.status = PROMISE.REJECTED;
            this.value = reason;
          }
        }
      }
```

测试状态改变

```
      console.log(new PROMISE(() => {}));
      console.log(
        new PROMISE((resolve, reject) => {
          resolve("fulfilled");
          reject("rejected");
        })
      );
```

测试executor执行异常

```
      console.log(
        new PROMISE((resolve, reject) => {
          console.log(as);
        })
      );
			//对比原生Promise
      console.log(
        new Promise((resolve, reject) => {
          console.log(as);
        })
      );
```



### THEN

现在添加then方法来处理状态的改变，有以下几点说明

1. then可以有两个参数，即成功和错误时的回调函数
2. 若then处理的Promise状态为fulfilled，then的函数参数都不是必须的，如果传入非函数则将被忽略，还需要设置默认值为函数，用于处理没传参，或传入非函数的情况，并将PROMISE的value返回，为后期链式调用then传递值。
3. 若then所处理的Promise状态为rejected且没有使用then的onRejected处理时，将会报错。
4. 当执行then传递的函数发生异常时，统一交给onRejected来处理错误
5. then的执行是异步任务

#### 基础构建

先观察原生Promsie.then的特点

* 能够处理异步确认状态
* then异步执行

```
      new Promise((res, rej) => {
        console.log("Ashun");
        setTimeout(() => {
          console.log("ashun");
          res("as");
        });
      }).then(
        (result) => console.log(result),
        (reason) => console.log(reason)
      );
      console.log("阿顺特烦恼");
```

* 若没有处理拒绝状态的Promise，则会报错

若Promise状态为rejected，且没有被then中的onRejected函数处理，将会报错

```
new Promise((res, rej) => {
        rej("Ashun");
		});
		
//没有传递onRejeted
new Promise((res, rej) => {
        rej("Ashun");
    }).then((result) => console.log(result));
    
//onRejeted不是函数，证明没有处理异常，依旧会报错
new Promise((res, rej) => {
        rej("Ashun");
    }).then((result) => console.log(result), "rejected");
```

即便是空函数，也代表对异常做了处理，便不会报错

```
      new Promise((res, rej) => {
        rej("Ashun");
      }).then(
        (result) => console.log(result),
        () => {}
      );
```

实现基本功能

* 对onResolve设置默认函数，并返回this.value，当PROMISE状态为fulfilled时，不传参，也会将值传递给下一个then

**rejected处理**

实现方法（一）

* 不为onRejected设置默认函数，若设置了默认函数，则会默认处理rejected状态

* 设置一个变量`isfilter`，监听rejected是否被处理
* 由于不确定onRejected是否为函数，也没有为其设置默认函数，所以在后期执行时，要判断其类型，再设置``isfilter``

```
        class PROMISE {
          …
          constructor(executor) {
            ……
            this.isfilter = false;
          }
         	……
          then(onResolve, onReject) {
            if (!(onResolve instanceof Function)) {
              onResolve = () => this.value;
            }

            if (this.status === PROMISE.FULFILLED) {
              try {
                onResolve(this.value);
              } catch (err) {
                onReject(err);
              }
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                try {
                  onReject(this.value);
                } catch (err) {
                  onReject(err);
                }
                this.isfilter = true;
              } else {
                throw new Error("PROMISE status rejected");
              }
            }
          }
        }
```

这种方式有一个弊端，就是一旦抛出错误，后续的同步代码将不再被执行

```
        new PROMISE((res, rej) => {
          rej("Ashun");
        }).then();
        console.log("阿顺特烦恼"); //rejected没有被处理，抛出错误，后续同步代码不会执行
```



**实现方法（二）**

在reject回调函数中，`异步判断isfilter`，因为外部代码自上而下执行，isfilter的初始值为false，若不异步判断，则无论是否被处理，一旦执行reject回调函数，就会报错。

```
//代码自上而下执行，若在reject回调函数中判断isfilter，则要异步判断，等待then处理后，再判断

new PROMISE((res, rej) => {
        rej("Ashun");
      }).then(
        	(result) => console.log(result),
        	(reason) => console.log(reason)
			);
```

```
          reject(reason) {
            if (this.status === PROMISE.PENDING) {
              this.status = PROMISE.REJECTED;
              this.value = reason;
              // 异步判断是否被过滤,等待then执行完毕，判断rejected是否被处理;
              setTimeout(() => {
                if (!this.isfilter) {
                  throw new Error("PROMISE status rejected");
                }
              });
            }
          }

          then(onResolve, onReject) {
            if (!(onResolve instanceof Function)) {
              onResolve = () => this.value;
            }

            if (this.status === PROMISE.FULFILLED) {
              try {
                onResolve(this.value);
              } catch (err) {
                onReject(err);
              }
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                try {
                  onReject(this.value);
                } catch (err) {
                  onReject(err);
                }
                this.isfilter = true;
              }
            }
          }
```

下面来测试then方法，结果正常输出`Ashun`

```
new PROMISE((res, rej) => {
        rej("Ashun");
      }).then(
        	(result) => console.log(result),
        	(reason) => console.log(reason)
			);
console.log("阿顺特烦恼");
```

若没有处理rejected，会报错，并且不会影响后续同步代码的执行

```
new PROMISE((res, rej) => {
        rej("Ashun");
      }).then(result => console.log(result));
console.log("阿顺特烦恼"); 
```



#### 异步任务

但上面的代码并不是异步执行的，使用setTimeout来将onFulfilled与onRejected做为异步宏任务执行

* `isfilter`的改变不使用setTimeout包裹，只要onReject为Function，就立即设置`isfilter=true`，这样才能够让resolve及时监听`isfilter`的改变

```
          then(onResolve, onReject) {
            if (!(onResolve instanceof Function)) {
              onResolve = () => this.value;
            }

            if (this.status === PROMISE.FULFILLED) {
              setTimeout(() => {
                try {
                  onResolve(this.value);
                } catch (err) {
                  onReject(err);
                }
              });
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                setTimeout(() => {
                  try {
                    onReject(this.value);
                  } catch (err) {
                    onReject(err);
                  }
                });
                this.isfilter = true;
              } else {
                throw new Error("PROMISE status rejected");
              }
            }
          }
```

现在再执行代码，已经有异步效果了，先输出了`阿顺特烦恼`

```text
 new PROMISE((res, rej) => {
        // res("Ashun");
        rej("Ashun");
      }).then(
        (result) => console.log(result),
        (reason) => console.log(reason)
      );
console.log("阿顺特烦恼");
```

#### PENDING异步

当在PROMISE中`异步确认状态`时，then处理的是pending状态的PROMISE，所以不会执行对应的处理函数

```
      new PROMISE((res, rej) => {
        setTimeout(() => {
          res("as");
        });
      }).then(
        (result) => console.log(result),
        (reason) => console.log(reason)
      );
# 由于处理的是pending状态的PROMISE，所以不会执行处理函数
```

为了处理以上情况，需要进行几点改动

1. 在构造函数中添加callbacks来保存pending状态时处理函数，当状态改变时，即`resolve/reject`被调用时，再在`resolve/reject`函数体中调用callbacks对应状态的处理函数
2. callbacks中的处理函数也要设置为异步调用
3. 只有在异步确认状态时，才会向callbacks中压入对应处理函数，所以在调用时，要判断处理函数是否存在。

```
        constructor(executor){
        	……
        	this.callbacks={};
        }
        resolve(result) {
          if (this.status === PROMISE.PENDING) {
            this.status = PROMISE.FULFILLED;
            this.value = result;
            this.callbacks.onResolve && this.callbacks.onResolve(this.value);
          }
        }
        reject(reason) {
          if (this.status === PROMISE.PENDING) {
            this.status = PROMISE.REJECTED;
            this.value = reason;
            this.callbacks.onReject && this.callbacks.onReject(this.value);
            setTimeout(() => {
                if (!this.isfilter) throw new Error("PROMISE status rejected");
            });
          }
        }
```

```
then(onResolve, onReject) {
          //设置默认值
          if (!(onResolve instanceof Function)) {
            onResolve = () => this.value;
          }
          //同步确认状态处理，直接执行对应处理函数
          if (this.status === PROMISE.FULFILLED) {
            setTimeout(() => {
              try {
                onResolve(this.value);
              } catch (err) {
                onReject(err);
              }
            });
          }
          if (this.status === PROMISE.REJECTED) {
          	 if (onReject instanceof Function) {
          	 		this.isfilter = true;
            		setTimeout(() => {
              		try {
               		 onReject(this.value);
              		} catch (err) {
               		 onReject(err);
              		}
           		 });
            }
          }
          //异步确认状态处理
          //先将处理函数添加到callbacks中，当状态发生改变时，再在this.resolve/reject中调用
          if (this.status === PROMISE.PENDING) {
            this.callbacks.onResolve = (result) => {
              setTimeout(() => {
                try {
                  onResolve(result);
                } catch (err) {
                  onReject(err);
                }
              });
            };
            this.callbacks.onReject = (reason) => {
            	if (onReject instanceof Function) {
          	 		this.isfilter = true;
              	setTimeout(() => {
                	try {
                  	onReject(reason);
               	 	} catch (err) {
                 	 	onReject(err);
               	 	}
              	});
              }
            };
          }
        }
```







### 链式操作

Promise中的then是链式调用执行的，所以then也要默认返回状态为fulfilled的Promise。

1. then的onReject函数是对前面Promise的rejected的处理
2. 但默认返回的Promise状态要为fulfilled，所以在调用onRejected后，需要改变当前promise为fulfilled状态,并把执行结果传入。让下一个then得以接收

```
        then(onResolve, onReject) {
          //设置默认值
          if (!(onResolve instanceof Function)) {
            onResolve = () => this.value;
          }

          //默认返回一个PROMISE
          return new PROMISE((resolve, reject) => {
            //同步确认状态处理
            if (this.status === PROMISE.FULFILLED) {
              setTimeout(() => {
                try {
                  let preResult = onResolve(this.value);
                  resolve(preResult);			
                } catch (err) {
                  reject(err);
                }
              });
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                this.isfilter = true;
                setTimeout(() => {
                  try {
                    let preReason = onReject(this.value);
                    resolve(preReason);
                  } catch (err) {
                    reject(err);
                  }
                });
              }
            }

            //异步确认状态处理
            if (this.status === PROMISE.PENDING) {
              this.callbacks.onResolve = (result) => {
                setTimeout(() => {
                  try {
                    let preResult = onResolve(result);
                    resolve(preResult);
                  } catch (err) {
                    reject(err);
                  }
                });
              };
              this.callbacks.onReject = (reason) => {
                if (onReject instanceof Function) {
                  this.isfilter = true;
                  setTimeout(() => {
                    try {
                      let preReason = onReject(reason);
                      resolve(preReason);
                    } catch (err) {
                      reject(err);
                    }
                  });
                }
              };
            }
          });
        }
```

下面经过测试后，链式操作已经有效了

```
      new PROMISE((resolve, reject) => {
        console.log("Ashun");
        setTimeout(() => {
          console.log("ashun");
          reject("as");
        });
      })
        .then(
          (result) => result,
          (reason) => reason
        )
        .then()
        .then(
          (result) => console.log(result),
          (reason) => console.log(reason)
        );
      console.log("阿顺特烦恼");
```



### 返回类型

原生Promise.then，若在then中手动返回一个新的Promise并确认状态，这个手动返回的Promise能够改变当前then的状态，并且下一个then就是对返回的Promise的处理。

```
      new Promise((resolve, reject) => {
        resolve("Promise status: fulfilled");
      })
        .then((result) => {
          console.log(result);
          return Promise.reject("then status: rejected");
        })
        .then(null, (err) => console.log(err));
```

#### 基本实现

我们若要实现这个效果，就要判断then返回结果的类型是否为PROMISE，若是PROMISE，我们直接调用 `preRusult.then(resolve,reject)`即可，因为调用then会等待手动返回的PROMISE确认状态后执行。

让手动返回的PROMISE状态改变当前then默认返回的PROMISE的状态

* 使用then处理，若手动返回PROMISE确认状态为fulfilled,就执行默认返回PROMISE的resolve，让其状态也变为fulfilled
* 同理，若手动返回PROMISE确认状态为rejected,就执行默认返回PROMISE的reject，让其状态也变为rejected

```
then(onResolve, onReject) {
          //设置默认值
       		………
          return new PROMISE((resolve, reject) => {
            //同步确认状态处理
            if (this.status === PROMISE.FULFILLED) {
              setTimeout(() => {
                try {
                  let preResult = onResolve(this.value);
                  if (preResult instanceof PROMISE) {
                    preResult.then(resolve, reject);
                  } else {
                    resolve(preResult);
                  }
                } catch (err) {
                  reject(err);
                }
              });
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                this.isfilter = true;
                setTimeout(() => {
                  try {
                    let preReason = onReject(this.value);
                    if (preReason instanceof PROMISE) {
                      preReason.then(resolve, reject);
                    } else {
                      resolve(preReason);
                    }
                  } catch (err) {
                    reject(err);
                  }
                });
              }
            }

            //异步确认状态处理
            if (this.status === PROMISE.PENDING) {
              this.callbacks.onResolve = (result) => {
                setTimeout(() => {
                  try {
                    let preResult = onResolve(result);
                    if (preResult instanceof PROMISE) {
                      preResult.then(resolve, reject);
                    } else {
                      resolve(preResult);
                    }
                  } catch (err) {
                    reject(err);
                  }
                });
              };
              this.callbacks.onReject = (reason) => {
                if (onReject instanceof Function) {
                  this.isfilter = true;
                  setTimeout(() => {
                    try {
                      let preReason = onReject(reason);
                      if (preReason instanceof PROMISE) {
                        preReason.then(resolve, reject);
                      } else {
                        resolve(preReason);
                      }
                    } catch (err) {
                      reject(err);
                    }
                  });
                }
              };
            }
          });
        }
```

测试能够到的正确结果

```
      new PROMISE((res, rej) => {
        console.log("Ashun");
        setTimeout(() => {
          console.log("ashun");
          rej("as");
        });
      })
        .then(
          (result) => result,
          (reason) => reason
        )
        .then((result) => {
          console.log(result);
          return new PROMISE((res, rej) => {
            res("then2 status Fulfilled");
          });
        })
        .then(
          (result) => console.log(`resolve__:${result}`),
          (reason) => console.log(`rejected__:${reason}`)
        );
      console.log("阿顺特烦恼");
```

#### 代码复用

现在发现pendding、fulfilled、rejected 状态的代码非常相似，所以可以提取出方法Parse来复用

```
        then(onResolve, onReject) {
          //设置默认值
         	……
          return new PROMISE((resolve, reject) => {
            //同步确认状态处理
            if (this.status === PROMISE.FULFILLED) {
              setTimeout(() => {
                this.Parse(onResolve(this.value), resolve, reject);
              });
            }
            if (this.status === PROMISE.REJECTED) {
              setTimeout(() => {
                this.Parse(onReject(this.value), resolve, reject);
              });
            }

            //异步确认状态处理
            if (this.status === PROMISE.PENDING) {
              this.callbacks.onResolve = (result) => {
                setTimeout(() => {
                  this.Parse(onResolve(result), resolve, reject);
                });
              };
              this.callbacks.onReject = (reason) => {
                setTimeout(() => {
                  this.Parse(onReject(reason), resolve, reject);
                });
              };
            }
          });
        }
        Parse(Operation, resolve, reject) {
          try {
            let preReason = Operation;
            if (preReason instanceof PROMISE) {
              preReason.then(resolve, reject);
            } else {
              resolve(preReason);
            }
          } catch (err) {
            reject(err);
          }
        }
```

#### 返回约束

then手动返回的promise不能是then默认返回Promise，会产生循环调用，下面是原生Promise的示例将产生错误

```text
let promise = new Promise((res, rej) => {
        res("fulfilled");
      }).then((result) => promise);
```

解决上面的问题来完善代码，添加当前promise做为parse的第一个参数与函数执行结果进行比对

```
        then(onResolve, onReject) {
          //设置默认值
         	……
          let promise = new PROMISE((resolve, reject) => {
            //同步确认状态处理
            if (this.status === PROMISE.FULFILLED) {
              setTimeout(() => {
                this.Parse(promise, onResolve(this.value), resolve, reject);
              });
            }
            if (this.status === PROMISE.REJECTED) {
              if (onReject instanceof Function) {
                this.isfilter = true;
                setTimeout(() => {
                  this.Parse(onReject(this.value), resolve, reject);
                });
              }
            }

            //异步确认状态处理
            if (this.status === PROMISE.PENDING) {
              this.callbacks.onResolve = (result) => {
                setTimeout(() => {
                  this.Parse(promise, onResolve(result), resolve, reject);
                });
              };
              this.callbacks.onReject = (reason) => {
                if (onReject instanceof Function) {
                  this.isfilter = true;
                  setTimeout(() => {
                    this.Parse(onReject(reason), resolve, reject);
                  });
                }
              };
            }
          });
          return promise;
        }

        Parse(promise, Operation, resolve, reject) {
          if (promise === Operation) {
            throw new Error("Chaining cycle detected for promise");
          }
          try {
            let preReason = Operation;
            if (preReason instanceof PROMISE) {
              preReason.then(resolve, reject);
            } else {
              resolve(preReason);
            }
          } catch (err) {
            reject(err);
          }
        }
```

现在进行测试也可以得到原生一样效果了

```
      let promise = new PROMISE((res, rej) => {
        res("fulfilled");
      }).then((result) => promise);
```



### 静态方法

#### RESOLVE

下面来实现原生Promise的静态方法`Promise.resolve`用于快速返回一个状态为resolve的Promise

* 默认返回Promise

* 同样需要注意返回类型，若为PROMISE，则使用then处理的就是返回的PROMISE

```
      Promise.resolve(
        new Promise((res) => res("ashuntefannao"))
      ).then((result) => console.log(result));
```

创建静态方法`static resolve`

```
        static resolve(value) {
          return new PROMISE((resolve, reject) => {
            if (value instanceof PROMISE) {
              value.then(resolve, reject);
            } else {
              resolve(value);
            }
          });
        }
```

测试

```
      PROMISE.resolve(
        new PROMISE((res, rej) => rej("ashuntefannao"))
      ).then(null, (reason) => console.log(`rejected__${reason}`));
      
      PROMISE.resolve("ashun").then((result) => console.log(result));
```



#### REJECT

封装思想和`resolve`静态方法相同

```
        static reject(reason) {
          return new PROMISE((resolve, reject) => {
            if (reason instanceof PROMISE) {
              reason.then(resolve, reject);
            } else {
              reject(reason);
            }
          });
        }
```

测试

```
      PROMISE.reject("rejected").then(null, (err) => {
        console.log(err);
      });
      PROMISE.reject(PROMISE.resolve("阿顺特烦恼")).then((val) => {
        console.log(val);
      });
```



#### ALL

原生Promise的静态方法all

* 接收一个PromiseArray，并按顺序对PromiseArray中的promise进行判断和处理
* 若存在一个promise没有确定状态，则all返回的Promise也为pending状态
* 若存在一个promise状态为rejected，则all返回的Promise也为rejected状态，并且后续的then能够接收到拒绝状态的promise传值。
* 若所有promise状态都为fulfilled，则返回一个有序的、元素为promise结果的数组

由于all是有序处理，所以我们需要通过遍历，按顺序处理业务逻辑

```
        static all(PROMISEarr) {
          let resolveArr = [];
          let test = true;
          return new PROMISE((resolve, reject) => {
            for (let promise of PROMISEarr) {
              let isPending = promise.status === PROMISE.PENDING;
              let isReject = promise.status === PROMISE.REJECTED;

              if (isPending) {
                test = false;
                break;
              } else if (isReject) {
                test = false;
                promise.then(null, (reason) => reject(reason));
                break;
              } else {
                promise.then((res) => resolveArr.push(res));
              }
            }
            test && resolve(resolveArr);
          });
        }
```

下例可自行改变某个promise的状态，来检测不同结果

```
      let p1 = new PROMISE((res, rej) => {
        res("p1 stastus fulfilled");
      });
      let p2 = new PROMISE((res, rej) => {
        res("p2 stastus fulfilled");
      });
      let p3 = new PROMISE((res, rej) => {
        res("p3 stastus fulfilled");
      });
      let arr = [p1, p2, p3];
      let all = PROMISE.all(arr).then(
        (result) => console.log(result),
        (reason) => console.log(reason)
      );

      setTimeout(() => {
        console.log(all);
      }, 100);
```



#### RACE

* `race(PromiseArray)`赛跑，哪个Promise优先确认状态，就返回哪个Promise
* 一开始我们就已经实现了promise状态一经确定，就不可再改变
* 所以在实现的时候，我们只需循环调用每一个promise的then方法，哪个最先确认状态，就会优先执行then，我们可以通过then的两个回调函数，来改变当前默认返回的Promsie的状态。

```
        static race(PROMISEarr) {
          return new PROMISE((resolve, reject) => {
            PROMISEarr.map((promise) => {
              promise.then(resolve, reject);
            });
          });
        }
```

下例可自行改变某个promise确认状态的延迟时间，来检测不同结果

```
      let p1 = new PROMISE((res, rej) => {
        setTimeout(() => {
          res("p1 stastus fulfilled");
        });
      });
      let p2 = new PROMISE((res, rej) => {
        rej("p2 stastus rejected");
      });
      let p3 = new PROMISE((res, rej) => {
        setTimeout(() => {
          res("p3 stastus fulfilled");
        }, 100);
      });

      let arr = [p1, p2, p3];
      let race = PROMISE.race(arr).then(
        (result) => console.log(`result__${result}`),
        (reason) => console.log(`reason__${reason}`)
      );

      setTimeout(() => {
        console.log(race);
      }, 500);
```



#### allSettled

* 不在乎状态拒绝与否，所有的promise确认状态后，将会返回有序结果，且返回的promise状态为fulfilled。
* 若有一个promise没有确认状态，则allSettled默认返回的promise状态也为fulfilled，也就不会执行后续的then

```
        static allSettled(PROMISEarr) {
          let results = [];
          let isPending = true;
          return new Promise((resolve, reject) => {
            for (let promise of PROMISEarr) {
              if (promise.status == PROMISE.PENDING) {
                isPending = true;
                break;
              }
              let status = promise.status;
              let value = promise.value;
              promise.then(
                (result) => {
                  results.push({ status, value });
                  if (results.length == PROMISEarr.length) resolve(results);
                },
                (reason) => {
                  results.push({ status, reason: value });
                  if (results.length == PROMISEarr.length) resolve(results);
                }
              );
            }
          });
        }
```

测试

```
      let p1 = new PROMISE((res, rej) => {
        res("p1 stastus fulfilled");
      });
      let p2 = new PROMISE((res, rej) => {
        rej("p2 stastus rejected");
      });
      let p3 = new PROMISE((res, rej) => {
        res("p3 stastus fulfilled");
      });

      let arr = [p1, p2, p3];
      let allSettled = PROMISE.allSettled(arr).then((result) =>
        console.log(result)
      );

      setTimeout(() => {
        console.log(allSettled);
      }, 500);
```

若有一个promise始终没有确认状态，则allSettled默认返回的promise状态也为pending。

```
……
      let p2 = new PROMISE((res, rej) => {
        //rej("p2 stastus rejected");
      });
……
```
