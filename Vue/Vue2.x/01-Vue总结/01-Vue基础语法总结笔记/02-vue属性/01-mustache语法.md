# mustache语法

---



### 作用

---

	>用于在html中展示vue中的数据。



### 使用

---

语法： {{ vueData }}

示例：

```html
<div id="app">
    <h1>
        {{name}}
    </h1>
</div>
```

```js
new Vue({
    el:"#app",
    data:{name:"Ashuntefannao"}
})
```

