## 应用场景

默认情况下：

* 路由跳转导致的组件切换，组件的 state 不会被保留。
* 因为组件会被卸载，之后再重新创建。

如果我们希望路由跳转前后，能够保留对应组件的 state ，可以使用 keep-alive

* 使用 `<keep-alive></keep-alive>` 标签包裹的 `<router-view/>`, 所展示的组件将会被缓存，不会重复的创建和销毁。因此能够保留路由组件中的 state 。

## 使用方式

#### 包裹 router-view

使用 `keep-alive` 标签，将 `router-view` 包裹即可。

之后所展示的组件将会被缓存，不会重复的创建和销毁。

因此这些组件只在 **第一次出现时**，会执行：

* `beforeCreate`、 `created` 生命周期钩子

**之后也不会执行**：

* `beforeCreate`、 `created` 
* `beforeDestroy`、`destroyed`

但如果我们希望分别在 `进入`、`离开` 该组件时，进行一些操作，该怎么办呢？

可以使用  `keep-alive` 专享的生命周期钩子👇

#### 新增生命周期钩子

在被使用 `keep-alive` 标签包裹的 `router-view` 所展示的组件中，配置以下钩子即可。

* activated(){ }

  > activated (激活)
  >
  > 当该组件处于激活状态时（展示该组件时）执行该函数。

* deactivated(){ }

  > deactivated (灭活)
  >
  > 当该组件处于失活状态时（不展示该组件时）执行该函数。

#### 标签属性

我们还可以给 `keep-alive` 标签配置一些属性：

1. include="cpnName/Regexp" 

   > 值为String或Regexp，只有匹配的组件会被缓存

2. exclude="cpnName/Regexp" 

   > 值为String或Regexp，匹配的组件不会被缓存

**include、exclude 匹配的是组件的 name 选项**

* 在 vue 组件的 options 中， name 用于标识该组件。