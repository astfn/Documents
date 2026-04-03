# keep-alive标签的属性



### 介绍：

---

1. include 

   > 值为String或Regexp，只有匹配的组件会被缓存

2. exclude

   > 值为String或Regexp，匹配的组件不会被缓存

   

**include、exclude匹配的是组件的name选项**

>在vue组件的options中还有name，用来标识该组件。
>
>在使用vue-cli创建的项目中可以发现，自动生成的 .vue文件中的组件都有name选项。
>
>当然，也可以给自己创建的组件，添加name选项





### 使用：

---

1. 匹配String

   > 匹配的各个组件的name使用逗号" , "隔开

```
<keep-alive include="Home,User">
	<route-view/>
</keep-alive>
```



匹配Regexp暂不做测试，常用匹配String

