通过自动生成的 `tsconfig.json` 文件中，我们可以观察到一些有关 **类型验证( Type Checking )** 的配置项。

```
{
	"compilerOptions": {
		……
    /* Type Checking */
    "strict": true,
    // "noImplicitAny": true,                           
    // "strictNullChecks": true,                         
    // "strictFunctionTypes": true,                      
    // "strictBindCallApply": true,                      
    // "strictPropertyInitialization": true,            
    // "noImplicitThis": true,                           
    // "useUnknownInCatchVariables": true,               
    // "alwaysStrict": true,                             
    // "noUnusedLocals": true,                           
    // "noUnusedParameters": true,                       
    // "exactOptionalPropertyTypes": true,               
    // "noImplicitReturns": true,                        
    // "noFallthroughCasesInSwitch": true,               
    // "noUncheckedIndexedAccess": true,                 
    // "noImplicitOverride": true,                       
    // "noPropertyAccessFromIndexSignature": true,       
    // "allowUnusedLabels": true,                        
    // "allowUnreachableCode": true,     
	}
}
```

### 是否开启严格模式

**项目迁移**

如果想要把原来的 javascript 旧项目，迁移到 typescript 上，则可以配置 `strict: false`，这可以避免大量的报错。从而渐进式地使用 typescript。

**编写新项目**

如果想要使用 ts 去编写新的项目，我们应该打开这些类型验证。如果不使用这些类型验证，那么我们使用 ts 也就失去了意义



### 默认配置

通过查看 `tsconfig.json` 文件可知，有关类型验证的配置，默认只配置了 `strict: true`。

而默认配置，与同时打开以下配置项的结果，是等价的。

也就是说：`strict: true` 涵盖了以下配置项对类型的验证。

```
"noImplicitAny": true,                           
"strictNullChecks": true,		
"strictFunctionTypes": true,                      
"strictBindCallApply": true,                     
"strictPropertyInitialization": true,                                         
"alwaysStrict": true,       
```



### noImplicitAny

在配置`noImplicitAny: true`时：不允许隐式声明 `any` 类别的**函数参数**。

如果没有给函数的参数指定类型，则这些参数会被判断为 `隐式声明的any类型`。若配置了 `noImplicitAny` 选项，则会报错。

```
function test(a, b) {
  console.log(a, b);
}

/*
index.ts:4:20 - error TS7006: Parameter 'b' implicitly has an 'any' type.
function hellow(a, b) {
*/
```

我们需要手动声明参数的类型，即便它是 `any`

```
function test(a: any, b: any) {
  console.log(a, b);
}
```

* 值得注意的是，该配置项仅对 `函数参数` 有效，如果你编写以下代码，并不会报错

  ```
  let a = 1;
  ```

  因为 `a` 的类型，可以由其值进行反推。而 `函数参数` 在真正的被接受前，是不确定的。



### strictNullChecks

在配置`strictNullChecks: true`时：将严格判断 `null`、`undefined` 类型。

在 ts 中，默认情况下：null、undefined 是所有类型的子类，它们可以成功赋值给属于任一类型的变量。

```
let a: string = null;
a = undefined;
```

但如果配置了 `strictNullChecks` ,上述代码将会报错。此时：

* null 只能赋值给类型为 null 的变量
* undefined 只能赋值给类型为 undefined 的变量

```
let a: null = null;
let b: undefined = undefined;
```

`void` 类型变量，此时最多只能赋值为 undefined

```
let unusable: void = undefined;	// OK
unusable = null  // Error: 不能将类型“null”分配给类型“void”。
```

```
function returnVoidFunc(): void {
  console.log("该函数没有任何返回值");
  return undefined;	// OK
  return null // Error: 不能将类型“null”分配给类型“void”。
}
```

