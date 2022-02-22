<!--
<template>
  <header><strong>ToDoList</strong></header>
  <main>
    <input id="addBar" type="text" ref="refAddBar" /><button @click="addTodo">
      添加todo
    </button>
    <ul ref="refUl">
      <li v-for="(val, index) in state.todoList" key="val">
        <div class="content">{{ index }}--{{ val }}</div>
        <button @click="deleteTodo(index)">delete</button>
      </li>
    </ul>
  </main>
</template>
<script>
  /*
    关于ref的功能：
    1. 一般用于定义**基本数据类型**的响应式数据
       通过ref函数生产，会对原数据添加一层【壳子】
       通过value属性访问、改变其值，才能够实现响应式。
    2. 访问对应的组件、DOM。
       如果为标签的绑定了ref属性，就能够通过对应的变量名称访问对应的组件、DOM
*/

  //引入ref
  import Vue, {
    defineComponent,
    nextTick,
    onMounted,
    reactive,
    ref,
  } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        todoList: [],
      });

      let refAddBar = ref(null);
      const refUl = ref(null);

      // console.log(addBar)  //需要在挂载后才能够访问对应节点
      onMounted(() => {
        // 直接通过id访问节点
        console.log(`id访问`, window.addBar, addBar);
        console.log(`ref访问`, refAddBar.value);
      });
      const addTodo = () => {
        //ref访问DOM,获取表单值
        if (refAddBar.value.value) {
          state.todoList[state.todoList.length] = refAddBar.value.value;
          refAddBar.value.value = "";
        } else {
          alert("不能为空");
        }
      };
      const deleteTodo = (index) => {
        state.todoList.splice(index, 1);
        //同步获取操作后的DOM
        console.log("sync", refUl.value.childElementCount);
        //nextTick
        nextTick(() => {
          console.log("async", refUl.value.childElementCount);
        });
      };

      return {
        state,
        addTodo,
        deleteTodo,
        refAddBar,
        refUl,
      };
    },
  });
</script>
-->
<template>
  <header><strong>ToDoList</strong></header>
  <main>
    <input id="addBar" type="text" ref="refAddBar" /><button @click="addTodo">
      添加todo
    </button>
    <ul ref="refUl">
      <li v-for="(val, index) in state.todoList" key="val">
        <div class="content">{{ index }}--{{ val }}</div>
        <button @click="deleteTodo(index)">delete</button>
      </li>
    </ul>
  </main>
</template>
<script>
  import Vue, {
    defineComponent,
    nextTick,
    onMounted,
    reactive,
    ref,
  } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        todoList: [],
      });

      let refAddBar = ref(null);
      const refUl = ref(null);

      // console.log(addBar)  //需要在挂载后才能够访问对应节点
      onMounted(() => {
        // 直接通过id访问节点
        // js内部会自动将绑定id的DOM添加到window中
        console.log(`id访问`, window.addBar, addBar);
        console.log(`ref访问`, refAddBar.value);
      });
      const addTodo = () => {
        //ref访问DOM,获取表单值
        if (refAddBar.value.value) {
          state.todoList[state.todoList.length] = refAddBar.value.value;
          refAddBar.value.value = "";
        } else {
          alert("不能为空");
        }
      };
      const deleteTodo = (index) => {
        state.todoList.splice(index, 1);
        //同步获取操作后的DOM
        console.log("sync", refUl.value.childElementCount);
        //nextTick
        nextTick(() => {
          console.log("async", refUl.value.childElementCount);
        });
      };
      return {
        state,
        addTodo,
        deleteTodo,
        refAddBar,
        refUl,
      };
    },
  });
</script>
