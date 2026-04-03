## 原生配置

参照 [微信官方 tabBar 配置文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar) 即可

关于样式，只支持配置默认状态和活跃状态的文字颜色与图片，还有背景色和边框色

## 自定义配置

详细参照 [微信官方自定义 tabBar 配置文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html#_3-%E7%BC%96%E5%86%99-tabBar-%E4%BB%A3%E7%A0%81)

但是官方这种配置形式，不能够满足我认为更加方便的开发形式。

我期望全局共用一个 CommonLayout 组件，其中包含三部分：

* top (默认展示 ThemeNavBar 组件)
* main
* footer (默认展示 ThemeTabbar 组件)

这三部分又分别支持插槽。

然后参照官网配置自定义  tabBar 的流程，custom-tab-bar 组件内容我都设置成空，相当于只是一个占位。

所有的 tab page 页面，都用自己封装的 CommonLayout 组件包裹。

但是实现完毕后会存在一个问题👇

### 页面整体闪烁

由于切换页面有资源加载的过程，所以会出现闪烁，但关键在于整个页面都会闪烁，即便 footer 默认展示的 ThemeTabbar 内容是一样的

原因就是因为每个页面都会重新加载一次 CommonLayout 。

如果使用原生配置的 tabbar ，就不会出现这个问题，因为 tabbar 是独立的，切换 tab 页面并不会导致 tabbar 组件的闪烁，他并不会卸载再挂载。

