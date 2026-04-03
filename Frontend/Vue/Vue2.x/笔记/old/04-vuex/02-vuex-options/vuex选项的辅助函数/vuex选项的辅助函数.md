# vuex选项的辅助函数

## 介绍

​	vuex为其中的Options提供了辅助函数（除了modules选项），能够让vux中的选项在vue组件中更方便的访问和使用。

​	在映射过程中，可以使用store中默认的名称，也可以另起别名。

* `mapState`、`mapGetters`
  * 由于访问的形式为 prop 形式，所以映射到组件的`computed`选项中
* `mapMutations`、`mapActions`
  * 访问的形式为 method 形式，所以映射到组件的`methods`选项中



## 使用

* 先引入，后映射到组件的对应选项中。

* 参数有两种形式
  * Array,元素为String，对应store中的默认名称
  * Object,属性名为`自起别名`，属性值为String，对应store中的默认名称

### mapState

映射到组件的computed选项

```
import { mapState } from “vuex”

export default {
	name:"fooCPN",
	data(){
		return{}
	},
	computed:{
		//数组形式
		//可在该组件中使用this.count\sum访问this.$store.state.count/sum
		...mapState(["count", "sum"]),
		
		//对象形式
		//可在该组件中使用this.contAlias\sumAlias访问this.$store.state.count/sum
		...mapState({
			contAlias: "count"
			sumAlias: "sum"
		})
	}
}
```



### mapGetters

使用方式与`mapState相同`，都是映射到组件的computed选项中，只不过引入、使用的是mapGetters

### mapMutations

映射到组件的methods选项

```
import { mapMutations } from “vuex”

export default {
	name:"fooCPN",
	data(){
		return{}
	},
	methods:{
		//数组形式
		/*
			可在该组件中使用this.addCount()\updateSum() 相当于使用
			this.$store.commit("addCount"/"updateSum")
		*/
		...mapMutations(["addCount", "updateSum"]),
		
		//对象形式
		/*
			可在该组件中使用this.addCountAlias()\updateSumAlias()	相当于使用
			this.$store.commit("addCount"/"updateSum")
		*/
		...mapMutations({
			addCountAlias: "addCount"
			updateSumAlias: "updateSum"
		})
	}
}
```



### mapActions

使用方式与`mapMutations相同`，都是映射到组件的methods选项中，只不过引入、使用的是mapActions

