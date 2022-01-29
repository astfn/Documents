#### 默认编译版本

我们可以通过 `compilerOptions.targte` 查看 tsc 编译成 js 文件的默认版本为：**es2016** (即 `es5`)

```
{
	"compilerOptions": {
		"targte": "es2016"
	}
}
```

#### 指定编译版本

修改配置项即可，例如期望转化为：`es3`

```
{
	"compilerOptions": {
		"targte": "es3"		//或者配置为 "es2014"
	}
}
```

