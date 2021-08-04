# Vue的基本属性

---

>以下记录的vue属性分为两种:
>
>* 可以在原生html中绑定的vue属性
>* 绑定在vue特有标签上的属性。





## 可在原生html标签绑定的vue属性

### 一、v-property

[^ vue数据]:在该笔记中代表：可以是vue.data、vue.method的返回结果、vue.computed返回结果。

#### 1. v-text

>v-text="[^vue数据]"
>
>* 作用
>
> > 将vue数据以普通文本样式展示。
>
>* 示例
>
>>注意：`v-text="data.prop"` 会**直接替换**掉标签的内容。
>>
>>```
>><div id="app">
>>	<span v-text="content"></span>
>></div>
>><script>
>>	new Vue({
>>		el:"#app",
>>		data:{
>>			content:"<h2>Ashun</h2>"
>>		}
>>	})
>></script>
>>```
>>
>>界面结果（普通文本形式）:`<h2>Ashun</h2>`

>v-pre（无属性值）
>
>* 作用
>
>  >vue会跳过该属性标记的标签，不进行vue编译。
>  >
>  >v-pre标记的html标签如果要展示vue数据，则会原样将vue语法展示，而不会展示数据。
>  >
>  >例：
>  >
>  >```html
>  ><h1 v-pre>{{name}}</h1>	 
>  ><!--展示结果:{{name}} 而不是ashun-->
>  >```
>  >
>  >```js
>  >data:{name:"ashun"}
>  >```

#### 3. v-html

>v-html="[^vue数据]"
>
>* 作用
>
> >如果[^vue数据]值为html语法构成的String。则会渲染为html。
> >
> >默认情况下会以普通text输出
>
>* 使用形式与`v-text`相同，只不过会将html语法解析后进行展示

#### 4. v-once

>v-once （无属性值）
>
>* 作用
>
>  >该属性标记的html标签只会被vue渲染一次，若展示的vue数据发生改变，也不会重新渲染。

#### 5. v-cloak

>v-cloak（无属性值）
>
>* 作用
>
>  >解决vue解析前，数据原样展示。
>  >
>  >当项目很大时，vue不会很快解析完，可能会造成界面部分数据展示为vue语法，导致用于体验不佳。
>  >
>  >该属性标记的html标签在被vue解析前，该属性奏效，但是在被vue解析后，该属性就会被vue去掉。
>  >
>  >可以使用css，对[v-cloak]该属性标记的标签进行样式设定，比如设置display:none,这样在被vue解析前，就不会展示该标签了。

#### 6. v-for

>v-for="val in vue.data"
>
>v-for="(key,val) in vue.data"
>
>* 作用
>
>  >遍历Array | Objec类型的vue.data，并将遍历结果展示到界面上。
>  >
>  >```html
>  ><ul>
>  >	<li v-for="item in list">{{item}}</li>
>  ></ul>
>  >```

#### 7. v-if、v-else-if、v-else

>**条件渲染**
>
>v-if="[^vue数据]boolean"
>
>v-else-if="[^vue数据]boolean"
>
>v-else（无属性值）
>
>* 作用
>
>  >条件渲染：根据返回的boolean，决定**是否渲染**该标签。**是一个标签是否存在的问题**，如果为false则该标签就不存在

#### 8. v-show

>**条件展示**
>
>v-show="[^vue数据]boolean"
>
>* 作用
>
>  >条件展示：根据返回的boolean，决定**是否展示**该标签。**标签一直存在**，如果为false则该标签就不展示，实际就是**是否为该元素添加display :none的问题**

#### 9. v-on

>**事件绑定**
>
>v-on:事件="vue.method"			语法糖:（ @事件="vue.method" ）
>
>* 作用
>
>  >进行事件绑定,事件触发时，执行对应的method

##### 事件修饰符

Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`

  - 相当于原生`event.stopPropagation()`

- `.prevent`

  - 相当于原生`event.preventDefault()`

- `.capture`

  - 相当于原生`elem.addEventListener("eventName",func,true/{capture:true})`

- `.once`

  - 相当于原生`elem.addEventListener("eventName",func,{once:true})`

- `.passive`

  - 相当于原生`elem.addEventListener("eventName",func,{passive:true})`

    - >```
      ><!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
      ><!-- 而不会等待对 `event.preventDefault()` 的判断过程，节省了时间 -->
      ><div v-on:scroll.passive="onScroll">...</div>
      >```
      >
      >这个 `.passive` 修饰符尤其能够提升移动端的性能。
      >
      >>不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

- `.self`

  - 当事件只在`currentTarget`触发时执行，无事件冒泡、捕获

---

##### 按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

有一些按键 (`.esc` 以及所有的方向键) 在 IE9 中有不同的 `key` 值, 如果你想支持 IE9，这些内置的别名应该是首选。

你还可以通过全局 `config.keyCodes.keyName` 对象，根据 ASCLL码 自定义按键修饰符别名：

```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

---

##### 系统修饰符

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

> 请注意修饰键与常规按键不同，在和 **`keyup` **事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有**在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`**。而单单释放 `ctrl` 也不会触发事件。
>
> keyup与系统修饰符同时使用，可以产生组合按键触发的效果。
>
> 例如:
>
> 只有在ctrl按下，并且松开了其它按键，才可触发。
>
> ```
> <input type="text" @keyup.ctrl="keymethod" />
> ```
>
> 67为c的ascll码，可以实现 用户复制内容时 执行对应业务
>
> ```
> <input type="text" @keyup.ctrl.67="preventCopy" />
> ```

---

##### `.exact` 修饰符

`.exact` 修饰符允许你控制由**精确的系统修饰符**组合触发的事件。

```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

---

##### 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。



#### 10. v-bind

>**属性绑定**
>
>v-bind:属性="{ } | [ ] "		语法糖:（ :属性="属性值" ）
>
>* 作用
>
>  >进行属性的绑定，使用v-bind绑定的属性，**属性值可以包含 变量Array | Object 和vue变量**。默认情况下，原生的html标签属性值都只接受String，不能包含 { }、[ ]。会将{ }、[ ]识别为普通的String。使用v-bind可以解析 { }、[ ]
>  >
>  >应用场景:
>  >
>  >​	当一些属性(html标签属性、个别vue标签属性)默认只接受String值，而不能包含变量。可以使用v-bind绑定。
>  >
>  >例：
>  >
>  >```html
>  ><div :class="['prp1','prp2']">…………</div>	//Array绑定class
>  ><div :class="{'prp1':isprop1}">…………</div>	//Obj绑定class
>  >```
>  >
>  >```html
>  ><div :style="[staticstyle,{color:'red'}]">…………</div>		//Array绑定style	
>  ><div :style="{fontSize:size+'px',color:'red'}">…………</div>	//Obj绑定style
>  >//样式属性识别驼峰式命名
>  >```
>  >
>  >```js
>  >data: {	  
>  >    	  isprop1:true
>  >          staticstyle: { backgroundColor: "pink", fontSize: "24px" },
>  >          size:15
>  >      },
>  >```

#### 11. v-model

>**表单元素双向绑定**
>
>v-model="vue.data"
>
>* 作用
>
>  >**将表单元素的value，与vue.data变量双向绑定。**
>  >
>  >* radio绑定的vue.data为String，记录选择项的value
>  >* checkbox
>  >  * 单选时，绑定的vue.data为Boolean，记录是否选择了该选项。
>  >  * 多选时，绑定的vue.data为Array，记录选择项的value们
>  >* select
>  >  * 单选时，绑定的vue.data为String，记录选择项的value
>  >  * 多选时(给select标签加上multiple属性)，绑定的vue.data为Array，记录选择项的value们
>  >* text、password、等文本类input，一般都是绑定String。



#### 12. v-slot	（新）

>v-slot 	（应用于template标签上、组件标签【包含单独的、传递prop的默认插槽】）
>
>功能：
>
>* 跟踪具名插槽（替换具名插槽）
>
> v-slot：slotname
>
>* 需要接受prop的插槽（作用域插槽）
>
> * 接收prop的具名插槽
>
>   >v-slot：slotname="自定义变量"
>   >
>   >使用：{{自定义变量. slotname.prop}}
>
> * 接收prop的默认插槽
>
>   >v-slot="自定义变量"	
>   >
>   >使用：{{自定义变量.prop}}
>
>   >使用对象的解构接收
>   >
>   >v-slot="{ x,y }"	
>   >
>   >使用：{{x}}、{{y}}
>
>v-slot替代了之前的slot、scope-slot两个属性。并且vue官方已经对slot、scope-slot进行了废弃。之后都会用v-slot属性，实现这两个功能
>
>```html
><!-- 具名插槽 -->
><base-layout>
>  <template v-slot:header>
>    Header content
>  </template>
>
>  Default slot content
>
>  <template v-slot:footer>
>    Footer content
>  </template>
></base-layout>
>
><!-- 接收 prop 的具名插槽 -->
><infinite-scroll>
>  <template v-slot:item="slotProps">
>    <div class="item">
>      {{ slotProps.item.text }}
>    </div>
>  </template>
></infinite-scroll>
>
><!-- 接收 prop 的默认插槽，使用了解构 -->
><!-- 应用在了组件标签上-->
><mouse-position v-slot="{ x, y }">
>  Mouse position: {{ x }}, {{ y }}
></mouse-position>
>```
>
>

### 二、其它



#### 1. key	

>key属性 相当于一个id，为了区分唯一一个Vue dom。
>
>**作用**：key属性的标记，是为了更高效的更新虚拟dom
>
>Vue在更新虚拟dom时，使用内部的Diff(different不同的)算法
>
>>该算法尽可能的尝试  就地修改、复用相同类型元素。
>>
>>* 如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点，不会再比较这个节点以后的子节点了。
>>* 如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。
>>
>>该方式，在一般情况下是高效的，但是有些情况下  只顾于就地修改、复用相同类型元素  会很低效。
>>
>>这时候就需要使用key来标记某些dom。让Diff算法能够识别这些dom。然后基于这些dom进行改变。
>
>>例如:   A、B、C、D、E  。在BC之间插入F
>>
>>![img](https://upload-images.jianshu.io/upload_images/13201627-c3e12cdb02d59c24.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)
>>
>>Vue中的Diff算法默认执行起来是这样的：把C改为为F，把D改为C，E改为D，再在最后追加E
>>
>>![img](https://upload-images.jianshu.io/upload_images/13201627-9d6226c6268a341b.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)
>>
>>在这种情况下，显然是没有效率的。所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，基于这些节点，找到正确的位置区插入新的节点。
>>
>>![img](https://upload-images.jianshu.io/upload_images/13201627-d0b3a1577860fda9.png?imageMogr2/auto-orient/strip|imageView2/2/w/452/format/webp)
>>
>>
>
>
>
>vue官方推荐，尽可能的在使用v-for时提供key。
>
>当在列表循环中使用`key`时，需要使用`key`来给每个节点做一个**唯一标识**，`diff`算法就可以正确的识别此节点，找到正确的位置直接操作节点，尽可能地进行重用元素，`key`的作用主要是为了高效的更新虚拟`DOM`
>
>>操作后，当key的值与原来的相同，那么才能够进行复用，所以一般不推荐使用index作为key，因为在做增删操作时，index会发生改变，也就不能实现标记了。**要保持key的唯一性**
>
>
>
>在简单列表的情况下，不使用`key`可能会比使用`key`的情况下在更新时的渲染速度更快，官方文档中也是这么说的。要根据不同的情况，决定是否绑定key。







## 在vue特有标签绑定的属性

#### 1. ref

>配合父子组件访问中的：父访问子$refs
>
>* 在对应子组件标签上配置ref="prop"属性,即可在父组件中使用$refs.prop进行访问

