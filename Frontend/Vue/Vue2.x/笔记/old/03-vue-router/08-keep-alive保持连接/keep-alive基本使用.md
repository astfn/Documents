# keep-alive标签的使用

keep-alive （keep保持、alive活着、 keep-alive（保持连接、活下去））

### 一、作用

---

​		使用`<keep-alive></keep-alive>`标签包裹的`<router-view/>`, 所展示的组件将会被缓存，不会重复的创建和销毁。



### 二、使用

---

  1. `<keep-alive></keep-alive>`包裹`<router-view/>`

  2. 在**所展示的组件中**配置（可选）

      * activated(){ }

        > activated (激活)
        >
        > 当该组件处于激活状态时（展示该组件时）执行该函数。

        

      * deactivated(){ }

        > deactivated (灭活)
        >
        > 当该组件处于失活状态时（不展示该组件时）执行该函数。

​     

     **只有当在父组件使用了`<keep-alive></keep-alive>`包裹`<router-view/>`，**
    
     **所要展示的子组件中的activated、deactivated两个函数才有效**。





### 三、例子

---

**需求：**

>在首页中默认展示的是新闻界面，当点击了message界面以后，跳转到其它界面，再跳转回来的时候，展示的还是message界面。



**默认情况下，不能保存操作结果的原因:**

>在刚接触Vue时，就学习了vue组件的生命周期，为了提高效率，当某组件不使用时（不展示时），会将该组件进行销毁，展示该组件的时候又会创建。
>
>由于再次展示某组件时，该组件已被销毁后重新创建，所以也就不会保存操作的结果。



**问题的解决：**

​		***思路：***

   1. 去除嵌套路由的重定位redirect

      ---

      >不去除嵌套路由的重定位，每次进入首页时，都会展示新闻界面

   2. 在App.vue中使用`<keep-alive></keep-alive>`包裹`<router-view/>`

      ---

      >避免所展示的组件重复创建。
      >
      >并且能够在子组件中配置activated、deactivated函数（本demo实现的重点）

   3. 在Home.vue(首界面）组件对象中配置activated、deactivated函数。

      ---

      >在该组件的data中设置一个属性staticPath，记录默认路径，和下次访问的路径
      >
      >通过activated，每次组件展示时，使用this.$router.replace(this.staticPatch),展示该路径下的组件
      >
      >通过deactivated，组件失活时，使用this.staticPath=this.$route.path保存当前的路径
      >
      >
      >
      >**【但是当组件失活时，即展示其他页面的时候，已经跳转到其他界面，保存的是其他界面的path，当该组件再次激活的时候赋值的是其它界面的path，效果不能实现，所以要在界面跳转前进行当前path的保存（使用路由组件导航守卫）👇】**

   4. 使用路由组件导航守卫beforeRouteLeave() 代替deactivated

      ---

      >由于导航守卫beforeRouteLeave() 是在路由跳转前执行，符合需求，所以使用路由组件导航守卫替代deactivated。





​		***代码实现：***

1. 取消嵌套路由的重定位redirect

```
 {
    path: "/home",
    component: HomeCpn,
    meta: {
      title: "首页"
    },
    children: [
      // { path: "", redirect: "news" },
      { path: "news", component: Home_NewsCpn },
      { path: "message", component: Home_MessageCpn }
    ]
  },
```

2. 在App.vue中使用`<keep-alive></keep-alive>`包裹`<router-view/>`

   ```
    <keep-alive> <router-view /> </keep-alive>
   ```

3. 在Home.vue(首界面）组件对象中配置activated函数和路由组件导航守卫beforeRouteLeave。

   ```
   export default {
     data() {
       return { staticPath: "/home/news" };//存放默认的path，和下次访问的path
     },
       //生命周期
     created() {
       console.log("Home_created");
     },
     destroyed() {
       console.log("Home_destroyed");
     },
       //搭配keep-alive使用的函数
     activated() {
       this.$router.replace(this.staticPath);
     },
     deactivated() {
       console.log(this.$route.path);
      /*
       该步骤不能放在该函数中，因为deactive是在该组件处于不活跃的时候执行，
       即进入其它路由的时候，所以this.$route.path获取的是其他路由的地址
        this.staticPath = this.$route.path;
      */
     },
       
     //运用路由组件守卫替代deactivated
     beforeRouteLeave(to, from, next) {
       console.log(this.$route.path);
       this.staticPath = this.$route.path;
       next();
     }
   };
   /*
       其实还是存在Bug，当连续点击两次首页按钮时，会进入到/user，
       因为在路由的配置中，没有对/user的子路由设置重定位，
       但是如果设置重定位，记录首页操作的效果又不能实现，因为如果设置了重定位，点击一次首页，
       就会重定位到/user/news
   
       【之后的项目中会使用currentIndex来记录选中的组件】
   
   */
   ```



#### BUG，及其以后的运用

 其实还是存在Bug，当连续点击两次首页按钮时，会进入到/user，
    因为在路由的配置中，没有对/user的子路由设置重定位，
    但是如果设置重定位，记录首页操作的效果又不能实现，因为如果设置了重定位，点击一次首页，
    就会重定位到/user/news

    【之后的项目中会使用currentIndex来记录选中的组件】

> 本demo主要学习 keep-alive 以及 activated、deactivated的知识
>
> 